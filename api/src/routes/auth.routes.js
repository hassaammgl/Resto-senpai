import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { register, login } from "../validations/auth.validation"
import { registerUser, loginUser, logoutUser, userProfile } from "../controllers/auth.controller"
import { protect } from "../middlewares/auth.middlewares"

const router = Router()

router.post('/register', validateRequest(register), registerUser)
router.post('/login', validateRequest(login), loginUser)
router.post('/logout', protect, logoutUser)
router.get('/profile', protect, userProfile)

export default router;