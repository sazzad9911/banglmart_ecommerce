import multer from 'multer';

const uploadPdf = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error('Please upload a valid PDF file'));
    }
    cb(undefined, true);
  }
});

export default uploadPdf;
