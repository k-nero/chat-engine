const fs = require("fs");
const path = require("path");

class MediaController
{
    constructor()
    {
        this.getMedia = this.getMedia.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
        this.videoStreaming = this.videoStreaming.bind(this);
    }

    getMedia(req, res)
    {
        try
        {
            res.status(200).sendFile(path.resolve(req.query.path), (err) => {});
        }
        catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }

    deleteMedia(req, res)
    {
        try
        {
            fs.unlink(path.resolve(req.query.path), (err) => {
                if (err)
                {
                    res.status(500).json({status: 'error', message: err.message});
                }
                res.status(200).json({status: 'success', message: 'File deleted successfully'});
            });
        } catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }

    videoStreaming(req, res)
    {
        try
        {
            const range = req.headers.range;
            if (!range)
            {
                res.status(400).send("Requires Range header");
                return;
            }
            const videoPath = req.query.path;
            const ext = videoPath.split('.').filter(Boolean).slice(1).join('.');
            let contentType = 'video/mp4';
            switch (ext)
            {
                case 'mp4':
                    contentType = 'video/mp4';
                    break;
                case 'webm':
                    contentType = 'video/webm';
                    break;
                case 'mp3':
                    contentType = 'audio/mp3';
                    break;
                case 'wav':
                    contentType = 'audio/wav';
                    break;
                case 'ogg':
                    contentType = 'audio/ogg';
                    break;
                default:
            }
            fs.stat(path.resolve(videoPath), function (err, stats) {
                if (err)
                {
                    res.status(500).json({status: 'error', message: err.message});
                }
                const CHUNK_SIZE = 10 ** 6;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${stats.size}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": contentType,
                };
                res.writeHead(206, headers);
                const videoStream = fs.createReadStream(videoPath, {start, end});
                videoStream.pipe(res);
            });
        } catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }

    getFiles(req, res)
    {
        try
        {
            res.status(200).download(path.resolve(req.query.path));
        }
        catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }
}

module.exports = new MediaController();
