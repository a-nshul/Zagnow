const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const { createListing, getListing, updateListing, deleteListing } = require('../controllers/listingController');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb('Error: Only image files (jpeg/jpg/png) are allowed!');
  },
});

router.use(authMiddleware.authenticateUser);

router.post('/', upload.array('images', 5), createListing);
router.get('/', getListing);
router.put('/:id', upload.array('images', 5), updateListing);
router.delete('/:id', deleteListing);

module.exports = router;
