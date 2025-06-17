import Joi from "joi"

export const addDish = Joi.object({
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    quantity: Joi.number().required()
})

export const updateDish = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    quantity: Joi.number().required()
})

export const deleteDish = Joi.object({
    _id: Joi.string().required(),
})

