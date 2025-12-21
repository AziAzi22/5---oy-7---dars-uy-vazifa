const BookSchema = require("../schema/book.schema");

/// get all

const getAllBooks = async (req, res) => {
  try {
    const books = await BookSchema.find()
    .populate("author_id", "-_id");
    // .select("-_id")
    // .select("title genre")
    // .limit(2)
    // .skip(1)

    res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
  }
};

// add author

const addBook = async (req, res) => {
  try {
    const {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id
    } = req.body;

    await BookSchema.create({
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id
    });

    res.status(201).json({
      message: "Added new Book",
    });
  } catch (error) {
    console.log(error.message);
  }
};

/// get one

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
  }
};

// update author

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id
    } = req.body;

    await BookSchema.findByIdAndUpdate(id, {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id
    });

    res.status(200).json({
      message: "Book updated",
    });
  } catch (error) {
    console.log(error.message);
  }
}

// delete

async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await BookSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Book deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getAllBooks,
  addBook,
  getOneBook,
  updateBook,
  deleteBook,
};
