const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

/* ------------ MONGOOSE ------------ */

const contatcSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contatcSchema.post("save", handleMongooseError);

/* --------------- JOI -------------- */

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

/* ---------------------------------- */

const Contact = model("contact", contatcSchema);

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
