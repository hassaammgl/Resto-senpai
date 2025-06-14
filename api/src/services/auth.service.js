import User from "../models/user.model";
import { TokenService } from "../utils/Jwt";
import { AppError } from "../utils/AppError";
import { DTO } from "../utils/Dto";
import argon2 from "argon2";

export class AuthService {
    static async #generateAuthTokens(user) {
        const accessToken = TokenService.generateAccessToken(
            user._id.toString()
        );
        const refreshToken = TokenService.generateRefreshToken(
            user._id.toString()
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken,
        };
    }

    static async register(data) {
        const { email, role, name, password, phone } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError("Email already in use", 400);
        }

        const user = new User({ email, password, name, role, phone });
        await user.save();

        const tokens = await this.#generateAuthTokens(user);
        return {
            ...tokens,
            user: DTO.userDto(user),
        };
    }

    static async login(data) {
        const { email, password } = data;

        const user = await User.findOne({ email }).select('+password +refreshToken');

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        if (!user.password || typeof user.password !== 'string') {
            throw new AppError("Authentication error - invalid password storage", 500);
        }

        try {
            const isPasswordValid = await user.verifyPassword(password);
            if (!isPasswordValid) {
                throw new AppError("Invalid email or password", 401);
            }
        } catch (err) {
            if (err.message.includes('pchstr must be a non-empty string')) {
                throw new AppError("Authentication system error - please contact support", 500);
            }
            throw err;
        }

        const tokens = await this.#generateAuthTokens(user);
        console.log(user);

        return {
            ...tokens,
            user: DTO.userDto(user),
        };
    }
    static async logout(_id) {
        await User.findByIdAndUpdate({ _id }, { refreshToken: null })
        return true
    }

    static async getProfile(_id) {
        const user = await User.findById({ _id });
        if (!user) {
            throw new AppError('User not found', 404);
        }
        console.log(user);

        return {
            user
        }
    }
}