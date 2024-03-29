const express = require("express");
const router = express.Router();
const boardDecisionModel = require("../models/boardDecision");
const meetingModel = require("../models/meeting");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
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
  console.log(req.body);

  let newDecision = new boardDecisionModel({
    subject: req.body.subject,
    department: req.body.department,
    image: req.file.originalname,
    meeting: req.body.meeting,
    date: req.body.date,
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

//New meeting route
router.post("/new-meeting", async (req, res) => {
  console.log(req.body);

  let newMeeting = new meetingModel({
    date: req.body.date,
  });

  newMeeting.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Meeting saved",
      });
    }
  });
});

//Update decision route
router.post("/update", async (req, res) => {
  console.log(req);


  let newDecision = await boardDecisionModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      subject: req.body.subject,
      department: req.body.department,
      date: req.body.date,
      meeting: req.body.meeting
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "Decision updated",
        });
      }
    }
  );
});

//Update meeting route
router.post("/update-meeting", async (req, res) => {
  console.log(req);


  let newMeeting = await meetingModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      date: req.body.date,
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "Meeting updated",
        });
      }
    }
  );
});

//Update meeting route
router.post("/subject-decision", async (req, res) => {
  console.log(req.body);
  
  let newDecision = await boardDecisionModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      decision: req.body.decision,
      status: req.body.status
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "Meeting updated",
        });
      }
    }
  );
});

//Delete decision route
router.post("/delete", async (req, res) => {
  boardDecisionModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
    else {
      res.status(200).json({
        message: "Deleted",
      });
    }
  });
});

//Delete meeting route
router.post("/delete-meeting", async (req, res) => {
  meetingModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
    else {
      res.status(200).json({
        message: "Deleted",
      });
    }
  });
});

module.exports = router;
