require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

let varSchema = new Schema({
    name: { type: String, required: true },
    vars: { type: [String], required: true },
});

let varModel = mongoose.model("varModel", varSchema);

module.exports = varModel;