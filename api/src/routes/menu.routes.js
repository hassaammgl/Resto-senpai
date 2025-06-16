import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { protect } from "../middlewares/auth.middlewares"
import { addDish, updateDish } from "../validations/menu.validation"
import { addDishToDb, getAllDishes, updateDishToDb } from "../controllers/menu.controller"

const router = Router()

router.post('/add-dish', protect, validateRequest(addDish), addDishToDb);
router.post('/update-dish', protect, validateRequest(updateDish), updateDishToDb);
router.get("/get-all-dishes", protect, getAllDishes);
export default router;