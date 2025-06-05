import asyncHandler from "express-async-handler"
import { TokenService } from "../utils/Jwt"
import { AuthService } from "../services/auth.service"
import { ApiResponse } from "../utils/ApiResponse"

export const registerUser = asyncHandler(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await AuthService.register(req.body)
    TokenService.setTokens(res, { accessToken, refreshToken })
    return ApiResponse.success(res, {
        statusCode: 201,
        message: "User Created Succesfully",
        data: user
    })
})