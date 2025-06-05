import User from "../models/user.model"
import { TokenService } from "../utils/Jwt";
import { AppError } from "../utils/AppError";
import { DTO } from "../utils/Dto";

export class AuthService {
    static async #generateAuthTokens(user) {
        const accessToken = TokenService.generateAccessToken(user._id.toString())
        const refreshToken = TokenService.generateRefreshToken(user._id.toString())
        user.refreshToken = refreshToken;

        await user.save();
        return {
            accessToken, refreshToken
        }

    }


    static async register(data) {
        const { email, role, name, password } = data
        const user = new User({ email, password, name, role })
        if (!user) {
            throw new AppError('Invalid user data', 400);
        }
        const tokens = await this.#generateAuthTokens(user)

        return {
            ...tokens,
            user: DTO.userDto(user)
        }
    }
}