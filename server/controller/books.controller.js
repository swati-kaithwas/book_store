const sendResponse = require("../helper/responseSender");
const booksservice = require("../service/books.service");

const createBook = async (req, res) => {
  /*
    1. create a book
    2. title ,author, description, publicationYear, isbn all are required field.
    */
  try {
    let { title, author, description, publicationYear, isbn } = req.body;

    if (!title || !author || !publicationYear || !description)
      return sendResponse(res, 400, {
        status: false,
        message: "title,author,publicationYear and description is required!",
      });
    const obj = {
      publicationYear: publicationYear,
      title: title,
      author: author,
      isbn: isbn,
      description: description,
    };

    const createbooks = await booksservice.createBook(obj);
    if (!createbooks)
      return sendResponse(res, 400, {
        status: false,
        message: "error!",
      });
    return sendResponse(res, 200, {
      status: true,
      data: createbooks,
      message: "created successfully",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};

const UpadteBook = async (req, res) => {
  try {
    /*
        1. id is required
        2. upadte title ,author, description, publicationYear, isbn
        */
    let id = req.params.id;
    let { title ,author, description, publicationYear, isbn} = req.body;
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: " Id is required !",
      });
    let obj = {
      title ,
      author,
       description, 
       publicationYear, 
       isbn
    };
    let content = await booksservice.updatebook(id, obj);
    console.log("content", content);
    if (!content)
      return sendResponse(400, res, {
        status: false,
        message: "book not update !",
      });
    return res.send({
      status: true,
      data: content,
      message: "sucessfully update !",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};

const getAllBook = async(req,res)=>{
  try{
    const data = await booksservice.getallbook();
    if(!data) return sendResponse(res, 400, {
      status: false,
      message: "Not Found!",
    });
    return sendResponse(res, 200, {
      status:true,
      data:data,
      message: "Success!",
    });
  }catch(error){
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
}

const getBookById = async (req, res) => {
  /*
    1.id is required
    2. using id find book
    */
  try {
    const { id } = req.body;
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: "id is required !",
      });

    const data = await booksservice.getById(id);
    if (!data)
      return sendResponse(res, 400, {
        status: false,
        message: "data not found",
      });
    return sendResponse(res, 200, {
      status: true,
      data: data,
      message: "successfully",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};

const deleteBook = async (req, res) => {
  /*
    1. delete by id
    2. id is required
    */
  try {
    const id = req.params.id;
    console.log("id", id);
    //    console.log("idff",req)
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: "id is required !",
      });

    const data = await booksservice.removebook(id);
   
    if (!data)
      return sendResponse(res, 400, {
        status: false,
        message: "data not found",
      });
    return sendResponse(res, 200, {
      status: true,

      message: "successfully deleted !",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};

module.exports = {
  createBook,
  UpadteBook,
  getAllBook,
  getBookById,
  deleteBook,
};
