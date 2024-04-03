const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CreatorSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  companyName: { type: String, minLength: 3, maxLength: 100 },
  city: { type: String, required: true, maxLength: 100 },
  province: { type: String, required: true, maxLength: 100 },
  description: { type: String, minLength: 3, maxLength: 140 },
});

// Virtual for creator's full name
CreatorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an creator does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.firstName && this.lastName) {
    fullname = `${this.firstName} ${this.lastName}`;
  }

  return fullname;
});

// Virtual for creator's URL
CreatorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/creator/${this._id}`;
});

//Virtual for location
CreatorSchema.virtual("location").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `${this.city}, ${this.province}`;
});

// Export model
module.exports = mongoose.model("Creator", CreatorSchema);
