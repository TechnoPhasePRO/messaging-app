const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).single('file');

function uploadProfilePicture(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      return next(err);
    }
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${req.user.userId}/${Date.now()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };
    s3.upload(params, function(err, data) {
      if (err) {
        return next(err);
      }
      req.file.location = data.Location; 
      next();
    });
  });
}

module.exports = { uploadProfilePicture };
