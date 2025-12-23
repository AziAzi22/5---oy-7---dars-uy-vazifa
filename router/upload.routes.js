const {Router} = require("express");
const { singleUpload, multiUpload } = require("../controller/upload.controller");
const uploadRouter = Router();
const upload = require("../utils/multer");

uploadRouter.post("/single_upload", upload.single("file"), singleUpload);
uploadRouter.post("/multi_upload", upload.array("files"), multiUpload);

module.exports = uploadRouter