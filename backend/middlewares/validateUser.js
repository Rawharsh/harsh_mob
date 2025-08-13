import Joi from "joi";

const signupSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  profilePhoto: Joi.string().allow(null, "")
});

export function validateSignup(req, res, next) {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map(err => err.message)
    });
  }
  
  next();
}
