const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
  name: Joi.string().min(1).max(12).required(),
});

const schemaEmail = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateBodyReg = (schema, res, req, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }
  next();
};

const validateBodyLog = (schemaEmail, res, req, next) => {
  const validationResult = schemaEmail.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }
  next();
};

module.exports = {
  validatedBodyReg: (req, res, next) => {
    return validateBodyReg(schema, res, req, next);
  },
  validatedBodyLog: (req, res, next) => {
    return validateBodyLog(schemaEmail, res, req, next);
  },
};
