import Joi from "joi";
import { createItemSchema } from "./itemSchema";

export const createTransactionSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().valid('sale', 'purchase').required(),
  date: Joi.date().required(),
  details: Joi.array().items(createItemSchema).min(1).required()
})