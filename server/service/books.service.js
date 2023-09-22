const book_store = require("../model/books.model");

const createBook = async (data) => {
  try {
    const books = new book_store(data);
    await books.save();
    return books;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
const updatebook = async (id, obj) => {
  try {
    const Id = id.replace(":", "");
    const data = await book_store.findByIdAndUpdate(
      { _id: Id },
      { $set: obj },
      { new: true }
    );
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const getallbook = async () => {
  try {
    const data = await book_store.find({});

    return data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
const getById = async (id) => {
  try {
    const data = await book_store.findById({ _id: id });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const removebook = async (id) => {
  try {
    const Id = id.replace(":", "");

    const data = await book_store.findByIdAndDelete(Id);

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  createBook,
  updatebook,
  getallbook,
  getById,
  removebook,
};
