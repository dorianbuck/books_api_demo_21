const pool = require("./config");
// const cookieParser = require('cookie-parser');
// const cookieConfig = {
//   maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//   httpOnly: true, // The cookie only accessible by the web server
//   signed: true // Indicates if the cookie should be signed
// };
// cookieConfig.use(cookieParser('books_api_secret_12345'));

const booksController = {
  async index(request, response) {
    const { rows, cookieConfig } = await pool.query(
      "SELECT books.id, books.title, authors.name FROM books INNER JOIN authors ON authors.id = books.author_id;"
    );
    response.status(200).json({ books: rows }).cookie("uid", "1", cookieConfig);
  },

  async create(request, response) {
    const { author, title } = request.body;
    await pool.query("INSERT INTO books (author, title) VALUES ($1, $2)", [
      author,
      title,
    ]);
    response.status(201).json({ message: "Book was added to the db..." });
  },

  async show(request, response) {
    const { id } = request.params;
    const { rows } = await pool.query(
      "SELECT * FROM books WHERE id = $1 LIMIT 1",
      [id]
    );
    response.status(200).json({ book: rows[0] });
  },

  async delete(request, response) {
    const { id } = request.params;
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    response.status(202).json({ message: "Your wish is my command!" });
  },

  async update(request, response) {
    const { author, title } = request.body;
    const { id } = request.params;
    const { rows } = await pool.query(
      `UPDATE books
      SET author = $1, title = $2
      WHERE id = $3
      RETURNING *
      `,
      [author, title, id]
    );
    response
      .status(201)
      .json({ message: "The book was updated in the db...", book: rows[0] });
  },
};

module.exports = booksController;
