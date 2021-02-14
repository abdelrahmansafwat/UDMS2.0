const express = require("express");
const router = express.Router();
const boardDecisionModel = require("../models/boardDecision");
const path = require("path");

//New decision route
router.post("/new", async (req, res) => {
  console.log(req.body);

  let newDecision = new boardDecisionModel({
    subject: req.body.subject,
    status: req.body.status,
    department: req.body.department,
    decision: req.body.decision,
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

module.exports = router;
