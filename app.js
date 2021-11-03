const express = require("express");

const cors = require("cors");
const booksController = require("./booksController");
const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors({ credentials: true, origin: ["http://localhost:3473"] }));

app
  .route("/")
  .get(booksController.index)
  .post(booksController.create)
  .put(booksController.update)
  .delete(booksController.delete);

app.listen(3001, () => console.log("Server is listeing on port 3001"));
