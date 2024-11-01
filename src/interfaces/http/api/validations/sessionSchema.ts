

import Joi from "joi";

export const sessionSchema = Joi.object({
  user_id: Joi.string().required(),
  refresh_token: Joi.string().required()
})