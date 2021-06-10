const express = require("express");

const ResumeUploadController = require("../controllers/resumeUpload");

const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, ResumeUploadController.createResume);

module.exports = router;