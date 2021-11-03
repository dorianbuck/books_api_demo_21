const express = require("express");

const cors = require("cors");

const pool = require("./config");

const app = express();

const getBooks = (request, response) => {
  pool.query("SELECT * FROM books;", (error, results) => {
    response.status(200).json({ books: results.rows });
  });
};

const createBook = (request, response) => {
  const { author, title } = request.body;
  pool.query(
    "INSERT INTO books (author, title) VALUES ($1, $2)",
    [author, title],
    () => {
      response.status(201).json({ message: "success" });
    }
  );
};

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors({ credentials: true, origin: ["http://localhost:3473"] }));

app.route("/").get(getBooks).post(createBook);

app.listen(3001, () => console.log("Server is listeing on port 3001"));
