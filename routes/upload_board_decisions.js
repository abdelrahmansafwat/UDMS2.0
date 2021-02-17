const express = require("express");
const router = express.Router();
const boardDecisionModel = require("../models/boardDecision");
const meetingModel = require("../models/meeting");
const path = require("path");

//New decision route
router.post("/new", async (req, res) => {
  console.log(req.body);

  let newDecision = new boardDecisionModel({
    subject: req.body.subject,
    status: req.body.status,
    department: req.body.department,
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
      decision: req.body.decision,
      status: req.body.status,
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

//Delete decision route
router.post("/delete", async (req, res) => {
  boardDecisionModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
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
  });
});

module.exports = router;
