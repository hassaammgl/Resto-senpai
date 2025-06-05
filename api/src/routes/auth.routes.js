import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { register } from "../validations/auth.validation"
import { registerUser } from "../controllers/auth.controller"

const router = Router()

router.post('/register', validateRequest(register), registerUser)

export default router;