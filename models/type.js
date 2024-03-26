const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  name: { type: String, minLength: 2, maxLength: 40 },
});

TypeSchema.virtual("url").get(function () {
  return `/catalog/type/${this._id}`;
});

module.exports = mongoose.model("Type", TypeSchema);
