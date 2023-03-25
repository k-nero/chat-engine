const multer = require("multer");
const path = require("path");

class multerInstance {

    constructor()
    {
        this.uploadFile = this.uploadFile.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.uploadVideo = this.uploadVideo.bind(this);
        this.uploadAttachment = this.uploadAttachment.bind(this);
        this.uploadAudio = this.uploadAudio.bind(this);
        this.uploadFileToFolders = this.uploadFileToFolders.bind(this);
    }

    async uploadFile(req, res, next) {
        try {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload/images");
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().getTime() + path.extname(file.originalname));
                }
            });
            const upload = multer({ storage: storage }).single("pic");
            upload(req, res, function (err) {
                if (err)
                {
                    res.status(500).json({ status: "error", message: err.message });
                }
                next();
            });
        } catch (err)
        {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    async uploadAvatar(req, res, next) {
        try
        {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload/avatar");
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().getTime() + path.extname(file.originalname) );
                }
            });
            const upload = multer({ storage: storage }).single("avatar");
            upload(req, res, function (err)
            {
                if (err)
                {
                    res.status(500).json({ status: "error", message: err.message });
                }
                next();
            });
        }
        catch (err)
        {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    async uploadVideo(req, res, next) {
        try
        {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload/videos");
                },
                filename: function (req, file, cb) {
                    cb(null,new Date().getTime() + path.extname(file.originalname));
                }
            });
            const upload = multer({ storage: storage }).single("video");
            upload(req, res, function (err) {
                if (err) {
                    res.status(500).json({ status: "error", message: err.message });
                }
                next();
            });
        }
        catch (err)
        {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    async uploadAudio(req, res, next) {
        try
        {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload/audios");
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().getTime() + path.extname(file.originalname));
                }
            });
            const upload = multer({ storage: storage }).single("audio");
            upload(req, res, function (err) {
                if (err) {
                    res.status(500).json({ status: "error", message: err.message });
                }
                next();
            });
        }
        catch (err)
        {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    async uploadAttachment(req, res, next) {
        try
        {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload/attachments");
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().getTime() + path.extname(file.originalname));
                }
            });
            const upload = multer({ storage: storage }).single("attachment");
            upload(req, res, function (err) {
                if (err) {
                    res.status(500).json({ status: "error", message: err.message });
                }
                next();
            });
        }
        catch (err)
        {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    async uploadFileToFolders(req, res, next) {
        try
        {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload/" + req.body?.folder);
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().getTime() + path.extname(file.originalname));
                }
            });
            const upload = multer({ storage: storage }).single("file");
            upload(req, res, function (err) {
                if (err) {
                    res.status(500).json({ status: "error", message: err.message });
                }
                next();
            });
        }
        catch (err)
        {
            res.status(500).json({ status: "error", message: err.message });
        }
    }
}

module.exports = multerInstance;
