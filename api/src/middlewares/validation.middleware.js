import { AppError } from "../utils/AppError";

export const validateRequest = (schema) => (req, res, next) => {
    console.log(req.body);
    console.log(schema.validate);

    const { error } = schema.validate(req.body)
    if (error) {
        throw new AppError(error.details[0].message, 400)
    }
    next()
}
