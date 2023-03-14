const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profileimages');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadImage = multer({ storage: multerStorage }).fields([{ name: 'image', maxCount: 1 }]);
module.exports={uploadImage}