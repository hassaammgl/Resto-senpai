import User from "../models/user.model";
import { TokenService } from "../utils/Jwt"
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const protect = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError("Access token is required", 401);
        }
        const decoded = TokenService.verifyAccessToken(accessToken);

        const user = await User.findById(decoded.id).select('-password -refreshToken')
        if (!user) {
            throw new AppError('User not found', 404);
        }

        req.user = user;
        next()

    } catch (error) {
        if (error.message.includes('expired')) {
            return ApiResponse.error(res, {
                message: 'Access token expired',
                statusCode: 401
            })
        }
        next(error);
    }
}