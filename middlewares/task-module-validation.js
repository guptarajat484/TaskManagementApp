const Joi = require("joi");

function addvalidation(req,res,next) {
    const addTaskSchema = Joi.object({
        taskName: Joi.string().required().min(2).trim(),
        taskDescription: Joi.string().trim(),
        priority:Joi.string().valid('high', 'medium','low'),
        email: Joi.string().email().required(),
        userId:Joi.string().required()
      });
      const { error, value } = addTaskSchema.validate(req.body);
    
      if (error) {
        res.send("Invalid Request: " + JSON.stringify(error.message));
      }
      next();
}
function updatevalidation(req,res,next) {
    const updateTaskSchema = Joi.object({
        taskName: Joi.string().min(2).trim(),
        taskDescription: Joi.string().trim(),
        priority:Joi.string().valid('high', 'medium','low'),
        email: Joi.string().email().required(),
        userId:Joi.string().required()
      });
      const { error, value } = updateTaskSchema.validate(req.body);
    
      if (error) {
        res.send("Invalid Request: " + JSON.stringify(error.message));
      }
      next();
}


module.exports = {
  addvalidation,
  updatevalidation,
};
