import Joi from "joi"

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  description: Joi.string()
})

export const updateProductSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  category_id: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
  description: Joi.string(),
  updatedAt: Joi.string().required()
})

export const updateStockProductSchema = Joi.object({
  stock: Joi.number().required()
})