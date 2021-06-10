const Resume = require("../models/resume");
const docParse = require("../middleware/docParse");

exports.createResume = async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const data = await docParse.parseDoc(req);

    const resume = new Resume({
        filename: req.file.filename,
        name: data.name,
        email: data.email,
        phonenumber: data.pno,
        linkedin: data.linked,
        education: data.education,
        skills: data.skills,
        languages: data.languages,
        filePath: url + "/images/" + req.file.filename,
    });
    resume
        .save()
        .then(createdPost => {
            res.status(201).json({
                message: "Post added successfully",
                post: {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a post failed!"
            });
        });
};

