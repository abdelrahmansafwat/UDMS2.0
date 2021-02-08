const express = require("express");
const router = express.Router();
const varModel = require("../models/variable");
const path = require("path");

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
