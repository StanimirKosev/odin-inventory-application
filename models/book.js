var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
  isbn: { type: String },
  price: { type: String },
  numInStock: { type: Number },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }], //reference to genre
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  return "book/" + this._id;
});

module.exports = mongoose.model("Book", BookSchema);
