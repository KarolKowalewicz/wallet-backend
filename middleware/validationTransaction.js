const Joi = require("joi");

const schemaPostTransaction = Joi.object({
  amount: Joi.number().required(),
  category: Joi.string()
    .valid(
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
      "Entertainment"
    )
    .optional(),
  income: Joi.boolean().optional().required(),
  comment: Joi.string().required(),
  date: Joi.string().isoDate().required(),
});

const schemaPutTransaction = Joi.object({
  amount: Joi.number(),
  category: Joi.string().valid(
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
    "Entertainment"
  ),
  income: Joi.boolean(),
  comment: Joi.string(),
  date: Joi.string().isoDate(),
});

const validateBodyPost = (schema, res, req, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.message, code: 400 });
  }
  next();
};

const validateBodyPut = (schema, res, req, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.message, code: 400 });
  }
  next();
};

module.exports = {
  validatedBodyPost: (req, res, next) => {
    return validateBodyPost(schemaPostTransaction, res, req, next);
  },
  validatedBodyPut: (req, res, next) => {
    return validateBodyPut(schemaPutTransaction, res, req, next);
  },
};
