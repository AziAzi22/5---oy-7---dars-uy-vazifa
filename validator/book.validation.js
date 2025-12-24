exports.BookValidator = async function (data) {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      pages: Joi.number().required(),
      published_year: Joi.number().required(),
      image_url: Joi.string().required(),
      description: Joi.string().required(),
      genre: Joi.string().required(),
      period: Joi.string().required(),
      published_home: Joi.string().required(),
      publishers_phone_number: Joi.string().required(),
      author_id: Joi.string().required(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
