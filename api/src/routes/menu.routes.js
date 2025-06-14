import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { protect } from "../middlewares/auth.middlewares"
import { addDish } from "../validations/menu.validation"
import { addDishToDb } from "../controllers/menu.controller"

const router = Router()

router.post('/add-dish', protect, validateRequest(addDish), addDishToDb);

export default router;