const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs");
const decisionModel = require("../models/decision");
const path = require("path");

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "eu-central-1",
});

const s3 = new aws.S3();

var storage = multerS3({
  acl: "public-read",
  s3,
  bucket: "govdas",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: "TESTING_METADATA" });
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var uploadDisk = multer({ storage: storage });

//New decision route
router.post("/new", uploadDisk.single("file"), async (req, res) => {
  console.log("file uploaded");
  console.log(req.body);

  //console.log(req);

  let newDecision = new decisionModel({
    title: req.body.title,
    issuedby: req.body.issuedby,
    summary: req.body.summary,
    image: req.file.originalname,
    tags: req.body.tags.split(","),
  });

  newDecision.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Decision saved",
      });
    }
  });
});

//Update decision route
router.post("/update", uploadDisk.single("file"), async (req, res) => {
  console.log(req);
  fs.unlink(path.join(__dirname, "files", req.body.oldimage), (err) => {
    res.status(500).json({
      message: err.message,
    });
  });

  let newDecision = await decisionModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      issuedby: req.body.issuedby,
      summary: req.body.summary,
      image: req.body.image,
      tags: req.body.tags.split(","),
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      }
      else {
        res.status(200).json({
          message: "Var saved",
        });
      }
    }
  );
});

//Delete decision route
router.post("/delete", async (req, res) => {
  fs.unlink(path.join(__dirname, "..", "files", req.body.oldimage), (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });

  decisionModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
});

module.exports = router;
