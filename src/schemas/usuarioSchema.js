const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().trim().min(2).max(50);
const lastName = Joi.string().trim().min(2).max(50);
const email = Joi.string().trim().email().max(100);
const phone = Joi.string().trim().min(10).max(20);
const user = Joi.string().trim().min(2).max(50);
const password = Joi.string().trim().min(8).max(50);
const fotoUrl = Joi.string().trim().uri().max(255);

const getUsuarioSchema = Joi.object({
  id: id.required(),
});

const createUsuarioSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  phone: phone.required(),
  user: user.required(),
  password: password.required(),
  fotoUrl: fotoUrl.required(),
});

const updateUsuarioSchema = Joi.object({
  name,
  lastName,
  email,
  phone,
  user,
  password,
  fotoUrl,
});

module.exports = { getUsuarioSchema, createUsuarioSchema, updateUsuarioSchema };
