const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: unknown, file: unknown, cb: any) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req: unknown, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadSingleImg = upload.single("image");

module.exports = { uploadSingleImg };
