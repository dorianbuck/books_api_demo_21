const express = require("express");

const cors = require("cors");
const booksController = require("./booksController");
const app = express();

const cookieParser = require('cookie-parser');
const cookieConfig = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: true, // The cookie only accessible by the web server
  signed: true // Indicates if the cookie should be signed
};
app.use(cookieParser('books_api_secret_12345'));



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
