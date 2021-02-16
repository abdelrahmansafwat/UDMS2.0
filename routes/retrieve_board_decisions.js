const express = require('express');
const router = express.Router();
const boardDecisionModel = require("../models/boardDecision");
const meetingModel = require("../models/meeting");
const path = require("path");

//All decisions route
router.get('/all', async (req, res) => {
    boardDecisionModel.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved all decisions",
            decisions: data,
        });
    })
});

//All decisions route
router.get('/all-meetings', async (req, res) => {
    console.log("Getting all meetings...")
    meetingModel.find({}, (err, data) => {
        console.log(data)
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved all meetings",
            meetings: data,
        });
    })
});

//Specific decision route
router.post('/specific', async (req, res) => {
    boardDecision.find({_id: req.body._id}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved specific decision",
            data
        });
    })
});

module.exports = router;