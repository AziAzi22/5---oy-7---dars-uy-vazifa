const { Router } = require("express");
const {
  getAllAuthor,
  addAuthor,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
  search,
} = require("../controller/author.controller");
const authorization = require("../middleware/authorization");
const authorValidationMiddleware = require("../middleware/author-validation.middleware");

const authorRouter = Router();

authorRouter.get("/get_all_authors", getAllAuthor);
authorRouter.get("/get_one_author/:id", getOneAuthor);
authorRouter.post("/add_author", authorization, authorValidationMiddleware, addAuthor);
authorRouter.put("/update_author/:id", authorization, updateAuthor);
authorRouter.delete("/delete_author/:id", authorization, deleteAuthor);
authorRouter.get("/search", search);

module.exports = authorRouter;
