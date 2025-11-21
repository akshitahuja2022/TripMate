import Joi from "joi";

const registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    destination: Joi.string().required(),

    travelType: Joi.string()
      .valid("solo", "couple", "group")
      .required(),

    age: Joi.number().min(1).max(120).required(),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),

    startDate: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message,
    });
  }

  next();
};

export default registerValidation;
