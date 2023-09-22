const { Schema, model } = require("mongoose");

const books = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, " title is not required!"],
    },
    author: {
      type: String,
      trim: true,
      required: [true, " author name is not required!"],
    },
    publicationYear : {
      type: Number,
      
    },
    isbn: {
      type: String,
      
    },
    description: {
      type: String,
    },
  
  },
  { timestamps: true }
);
const Books = model("books", books);
module.exports = Books;

