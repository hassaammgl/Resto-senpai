import Joi from "joi"

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/;
export const register = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
        .pattern(new RegExp(passwordRegex))
        .message('Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character (_@$!%*?&)'),
    role: Joi.string().valid("admin", "user").required(),
    phone: Joi.string().required()
})

export const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
        .pattern(new RegExp(passwordRegex))
        .message('Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character (_@$!%*?&)'),
})

export const updateUserDetails = Joi.object({
    city: Joi.string().required(),
    phone: Joi.string().required(),
    restorantName: Joi.string().required(),
    state: Joi.string().required(),
    street: Joi.string().required(),
    zipCode: Joi.number().required(),
})
