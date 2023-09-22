let express = require('express');
let router = express.Router();
const Bookscontroller = require('../controller/books.controller');

router.post("/createbook",Bookscontroller.createBook );
router.get("/getallbook", Bookscontroller.getAllBook);
router.put("/updatebook/:id", Bookscontroller.UpadteBook);
router.post("/getbookById", Bookscontroller.getBookById);

router.delete("/deletebook/:id", Bookscontroller.deleteBook);

module.exports = router;