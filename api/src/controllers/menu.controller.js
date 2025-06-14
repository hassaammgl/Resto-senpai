import asyncHandler from "express-async-handler"
import { ApiResponse } from "../utils/ApiResponse"

export const addDishToDb = asyncHandler(async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.price);
    console.log(req.body.category);

})