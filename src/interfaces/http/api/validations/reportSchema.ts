import Joi from "joi";


export const reportSchema = Joi.object({
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  type: Joi.string().required()
})