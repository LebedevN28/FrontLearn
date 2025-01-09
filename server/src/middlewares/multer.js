const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log('Полученный файл:', file.originalname);
    console.log('Тип файла:', file.mimetype);

    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      console.error('Неверный тип файла:', file.mimetype);
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

module.exports = upload;
