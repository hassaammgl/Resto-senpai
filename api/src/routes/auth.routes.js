import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { register, login, updateUserDetails } from "../validations/auth.validation"
import { registerUser, loginUser, logoutUser, userProfile, updateUserData } from "../controllers/auth.controller"
import { protect } from "../middlewares/auth.middlewares"

const router = Router()

router.post('/register', validateRequest(register), registerUser)
router.post('/login', validateRequest(login), loginUser)
router.post('/logout', protect, logoutUser)
router.get('/profile', protect, userProfile)
router.post("/update-address", protect, validateRequest(updateUserData), updateUserData)


export default router;