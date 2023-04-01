const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, './uploads/images');
    },
    filename: function(req, file, cb)
    {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const videoStorage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, './uploads/videos');
    },
    filename: function(req, file, cb)
    {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, './uploads/files');
    },
    filename: function(req, file, cb)
    {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

exports.uploadVideo = multer({storage: videoStorage});
exports.uploadImage = multer({storage: imageStorage});
exports.uploadVideo = multer({storage: fileStorage});
