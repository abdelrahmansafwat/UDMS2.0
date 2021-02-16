require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let boardDecisionSchema = new Schema({
    subject: { type: String, required: true },
    department: { type: String, required: true },
    decision: { type: String },
    status: { type: String, required: true },
    meeting: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

let boardDecisionModel = mongoose.model("boardDecisionModel", boardDecisionSchema);

module.exports = boardDecisionModel;