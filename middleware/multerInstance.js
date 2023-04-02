const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, './uploads/' + req.body.type);
    },
    filename: function(req, file, cb)
    {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

exports.uploadMedia = multer({storage: storage});
