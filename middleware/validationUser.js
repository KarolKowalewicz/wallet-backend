const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(1).max(12).required(),
});

const schemaEmail = Joi.object({
  email: Joi.string().email().required()
});

const validate = (schema, res, req, next) => {
  const validationResult = schema.validate(req.body);
  
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message})
  }
  next()
};


module.exports = {
  userValidation: (req, res, next) => {
    return validate(schema, res, req, next)
  },
  validationEmail: (req, res, next) => {
    return validate(schemaEmail, res, req, next)
  }
}