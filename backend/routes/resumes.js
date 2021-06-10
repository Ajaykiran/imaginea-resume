const express = require("express");

const ResumeController = require("../controllers/resumes");

const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, ResumeController.createResume);

router.put("/:id", extractFile, ResumeController.updateResume);

router.get("", ResumeController.getResumes);

router.get("/:id", ResumeController.getResume);

router.delete("/:id", ResumeController.deleteResume);

module.exports = router;
