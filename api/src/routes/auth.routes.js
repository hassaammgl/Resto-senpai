import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { register, login } from "../validations/auth.validation"
import { registerUser, loginUser } from "../controllers/auth.controller"

const router = Router()

router.post('/register', validateRequest(register), registerUser)
router.post('/login', validateRequest(login), loginUser)

export default router;