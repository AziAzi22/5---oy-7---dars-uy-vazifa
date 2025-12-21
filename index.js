const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
require("dotenv").config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


connectDB();

// routes
app.use(authorRouter);
app.use(bookRouter)

const PORT = +process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server going on", PORT);
});
