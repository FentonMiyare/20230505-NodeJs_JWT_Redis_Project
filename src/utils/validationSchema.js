const Joi = require("joi");


const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required()
            .label("Username"),
    email: Joi.string()
            .email()
            .lowercase()
            .required()
            .label("Email Address"),
    password: Joi.string()
            .min(6)
            .required()
            .strict()
            .label("Password"),
    confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .strict()
            .label("Confirm Password"),
    roles: Joi.array()
            .items(Joi.string())
            .label("Roles"),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    username: Joi.string()
          .strict()
          .min(3)
          .max(20)
          .required()
          .label("Username"),
    password: Joi.string()
          .strict()
          .required()
          .label("Password"),
  });
  return schema.validate(body);
};

const updateBodyValidation = (body) => {
  const schema = Joi.object({
     username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .label("Username"),
    email: Joi.string()
            .strict()
            .email()
            .lowercase()
            .label("Email Address"),
    whatsAppNumber: Joi.string()
            .strict()
            .min(10)
            .max(15)
            .label("WhatsApp Number"),
    roles: Joi.array()
            .items(Joi.string())
            .required(false)
            .label("Roles"),
    bio: Joi.string()
            .required(false)
            .label("Bio"),
    favoriteColor: Joi.array()
            .items(Joi.string())
            .required(false)
            .label("Favorite Color"),
    favoritePet: Joi.array()
            .items(Joi.string())
            .required(false)
            .label("Favorite Pet"),
    course: Joi.string()
            .required(false)
            .label("Course"),
    nationality: Joi.string()
            .required(false)
            .label("Nationality"),
  });

  return schema.validate(body);
}

const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string()
          .required()
          .label("Refresh Token"),
  });
  return schema.validate(body);
};

const orderBodyValidation = (body) => {
  const schema = Joi.object({
    work: Joi.string()
          .required()
          .label("Work"),
    category: Joi.string()
          .required()
          .label("Category"),
    format: Joi.string()
          .required()
          .label("Format"),
    level: Joi.string()
          .required()
          .label("Level"),
    deadline: Joi.string()
          .required()
          .label("Deadline"),
    pages: Joi.string()
          .required()
          .label("Pages"),
    spacing: Joi.string()
          .required()
          .label("Spacing"),
    title: Joi.string()
          .required(false)
          .default("Writer's Choice")
          .label("Title"),
    paperDetails: Joi.string()
          .max(600)
          .required(false)
          .label("Paper Details"),
  });
  return schema.validate(body);
};


module.exports = {
  signUpBodyValidation,
  logInBodyValidation,
  updateBodyValidation,
  orderBodyValidation,
  refreshTokenBodyValidation,
};