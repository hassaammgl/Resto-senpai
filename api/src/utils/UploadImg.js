import cloudinary from "../config/cloudinary";
import { AppError } from "./AppError"

export class Upload {
    constructor() {
        this.cloudinary = cloudinary;
    }
    static async uploadImg(img) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(img, {
                folder: 'resto-senpai',
            });
            return uploadResponse.secure_url
        } catch (error) {
            throw new AppError(error)
        }
    }
}