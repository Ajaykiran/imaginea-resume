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
    filePath: url + "/images/" + req.file.filename
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

exports.updateResume = (req, res, next) => {
  let filePath = req.body.filePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    filePath = url + "/images/" + req.file.filename;
  }
  const resume = new Resume({
    _id: req.body.id,
    filename: req.body.filename,
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    linkedin: req.body.linkedin,
    education: req.body.education,
    skills: req.body.skills,
    languages: req.body.languages,
    filePath: filePath
  });
  Resume.updateOne({ _id: req.params.id }, resume)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.getResumes = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Resume.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Resume.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getResume = (req, res, next) => {
  Resume.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.deleteResume = (req, res, next) => {
  Resume.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};
