const fs = require("fs");
const path = require("path");

class MediaController
{
    constructor()
    {
        this.getMedia = this.getMedia.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
    }

    getMedia(req, res)
    {
        try
        {
            res.status(200).sendFile(path.resolve(req.query.path));
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
                if (err) {
                    res.status(500).json({status: 'error', message: err.message});
                }
                res.status(200).json({status: 'success', message: 'File deleted successfully'});
            });
        }
        catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }

}

module.exports = new MediaController();
