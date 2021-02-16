require("dotenv").config();
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let meetingSchema = new Schema({
    number: { type: Number },
    date: { type: Date },
});

meetingSchema.plugin(AutoIncrement, {inc_field: 'number', start_seq: 66});

let meetingModel = mongoose.model("meetingModel", meetingSchema);

module.exports = meetingModel;

