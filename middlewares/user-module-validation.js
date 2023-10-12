const Joi = require("joi");

function signupvalidation(req, res, next) {
  const userSignupSchema = Joi.object({
    name: Joi.string().required().min(2).max(30).trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(8).max(16),
  });
  const { error, value } = userSignupSchema.validate(req.body);

  if (error) {
    res.send("Invalid Request: " + JSON.stringify(error.message));
  }
  next();
}

function loginvalidation(req, res, next) {
    const userLoginSchema = Joi.object({ 
      email: Joi.string().email().required().lowercase().trim(),
      password: Joi.string().required().min(8).max(16),
    });
    const { error, value } = userLoginSchema.validate(req.body);
  
    if (error) {
      res.send("Invalid Request: " + JSON.stringify(error.message));
    }
    next();
  }

module.exports = {signupvalidation,loginvalidation};
