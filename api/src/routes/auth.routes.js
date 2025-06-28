import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import {
    register,
    login,
    updateUserDetails,
    updateCustomerAdd,
    updateCustomerDet
} from "../validations/auth.validation"
import {
    registerUser,
    loginUser,
    logoutUser,
    userProfile,
    updateUserData,
    updateCustomerAddress,
    updateCustomerDetails
} from "../controllers/auth.controller"
import { protect } from "../middlewares/auth.middlewares"

const router = Router()

router.post('/register', validateRequest(register), registerUser)
router.post('/login', validateRequest(login), loginUser)
router.post('/logout', protect, logoutUser)
router.get('/profile', protect, userProfile)
router.post("/update-address", protect, validateRequest(updateUserDetails), updateUserData)
router.post("/update-customer-address", protect, validateRequest(updateCustomerAdd), updateCustomerAddress)
router.post("/update-customer-details", protect, validateRequest(updateCustomerDet), updateCustomerDetails)


export default router;