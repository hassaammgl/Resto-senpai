import asyncHandler from "express-async-handler"
import { TokenService } from "../utils/Jwt"
import { AuthService } from "../services/auth.service"
import { ApiResponse } from "../utils/ApiResponse"

export const registerUser = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthService.register(req.body)
    TokenService.setTokens(res, { accessToken, refreshToken })
    return ApiResponse.success(res, {
        statusCode: 201,
        message: "User Created Succesfully",
        data: user
    })
})

export const loginUser = asyncHandler(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body)
    TokenService.setTokens(res, { accessToken, refreshToken })
    return ApiResponse.success(res, {
        message: "User login Succesfully",
        data: user
    })
})

export const logoutUser = asyncHandler(async (req, res, next) => {
    const isClear = await AuthService.logout(req.user.id)
    if (isClear) {
        TokenService.clearTokens(res)
        return ApiResponse.success(res, {
            message: "Logged out successfully"
        })
    }
})