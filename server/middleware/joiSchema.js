const joi = require("joi")

const email = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .required()
const password = joi.string().required().min(6)
const stringReq = joi.string().required()
const numberReq = joi.number().required()
const arrayReq = joi.array().required()
const objectReq = joi.object().required()
const string = joi.string().allow(null, "")
const number = joi.number().allow(null, "")
const array = joi.string().allow(null, "")
const object = joi.object().allow(null, "")

module.exports = {
  email,
  password,
  stringReq,
  number,
  numberReq,
  string,
  array,
  arrayReq,
  object,
  objectReq,
}
