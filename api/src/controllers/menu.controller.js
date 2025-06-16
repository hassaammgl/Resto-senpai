import asyncHandler from "express-async-handler"
import { ApiResponse } from "../utils/ApiResponse"
import { MenuService } from "../services/menu.service";

export const addDishToDb = asyncHandler(async (req, res) => {
    const { newDish } = await MenuService.addDishItem(req.body);
    console.log(newDish);
    return ApiResponse.success(res, {
        statusCode: 201,
        message: "Dish Created Succesfully",
        data: newDish
    })
})

export const updateDishToDb = asyncHandler(async (req, res) => {
    const { newDish } = await MenuService.updateDishItem(req.body);
    console.log(newDish);
    return ApiResponse.success(res, {
        statusCode: 201,
        message: "Dish Updated Succesfully",
        data: newDish
    })
})

export const getAllDishes = asyncHandler(async (req, res) => {
    const { allDishes } = await MenuService.getAllDishes()
    console.log(allDishes);
    return ApiResponse.success(res, {
        statusCode: 200,
        message: "All dishes found successfully",
        data: allDishes
    })
})