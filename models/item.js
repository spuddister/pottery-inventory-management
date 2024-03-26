const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "Creator", required: true },
  description: { type: String, required: true },
  price: { type: Number },
  stock: { type: Number },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  type: [{ type: Schema.Types.ObjectId, ref: "Type" }],
  dimensions: {
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number },
  },
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
