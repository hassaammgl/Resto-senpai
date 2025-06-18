import { Router } from "express"
import { validateRequest } from "../middlewares/validation.middleware"
import { protect } from "../middlewares/auth.middlewares"
import { addDish, updateDish, deleteDish } from "../validations/menu.validation"
import { addDishToDb, getAllDishes, updateDishToDb, deleteDishfromDb } from "../controllers/menu.controller"

const router = Router()

router.get("/get-all-dishes", protect, getAllDishes);

router.post('/add-dish', protect, validateRequest(addDish), addDishToDb);
router.post('/update-dish', protect, validateRequest(updateDish), updateDishToDb);
router.delete('/delete-dish/:_id', protect, validateRequest(deleteDish, true), deleteDishfromDb);

export default router;