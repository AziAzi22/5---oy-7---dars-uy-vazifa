const Joi = require("joi");

exports.AuthorValidator = async function (data) {
  try {
    const schema = Joi.object({
      full_name: Joi.string()
        .trim()
        .min(4)
        .max(40)
        .pattern(/^[A-Za-z\s-]+$/)
        .required(),
      birt_year: Joi.number().integer().required(),
      death_year: Joi.string().required(),
      image_url: Joi.string().min(15).required(),
      bio: Joi.string().max(10000).required(),
      genre: Joi.string()
        .lowercase()
        .valid(
          "romance",
          "detective",
          "horror",
          "crime",
          "fantasy",
          "science fiction",
          "biography",
          "adventure",
          "drama",
          "thriller",
          "mystery",
          "humor",
          "poetry",
          "autobiography",
          "philosophy",
          "medical",
          "history",
          "novel",
          "satire",
          "melodrama",
          "action",
          "epic",
          "travel",
          "education",
          "dystopian",
          "childrens literature",
          "young adult"
        )
        .required(),
      period: Joi.string()
        .lowercase()
        .valid(
          "temuriylar davri",
          "jadid adabiyoti",
          "sovet davri",
          "mustaqillik davri"
        )
        .required(),
      creativity: Joi.string().max(1000).required(),
      region: Joi.string().max(50).required(),
    });

    return schema.validate(data);
  } catch (error) {
    console.log(error.message);
  }
};
