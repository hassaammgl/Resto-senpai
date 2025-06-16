import { v2 as cloudinary } from "cloudinary";
import { AppError } from "./AppError";
import fs from "fs/promises";
import path from "path";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export class Upload {
    static async uploadImg(base64Img) {
        try {
            if (!base64Img) {
                throw new AppError("Image data is missing.");
            }

            if (!base64Img.startsWith("data:image/")) {
                throw new AppError("Invalid base64 image format.");
            }

            const { filePath, cleanup } = await this.#saveBase64Locally(base64Img);
            const result = await this.uploadImage(filePath);

            await cleanup();

            return result.secure_url;
        } catch (error) {
            console.error("🔥 Upload Error:", error);

            const errMsg =
                error instanceof AppError
                    ? error.message
                    : "Failed to upload image.";

            throw new AppError(errMsg);
        }
    }

    static async uploadImage(imagePath, folder = "resto-senpai") {
        try {
            if (!imagePath) {
                throw new AppError("Image path is missing.");
            }

            const options = {
                folder,
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                timestamp: Math.floor(Date.now() / 1000), // Add current timestamp
            };

            // Verify Cloudinary configuration
            if (!cloudinary.config().cloud_name ||
                !cloudinary.config().api_key ||
                !cloudinary.config().api_secret) {
                throw new Error("Cloudinary configuration is incomplete");
            }

            const result = await cloudinary.uploader.upload(imagePath, options);
            return result;
        } catch (error) {
            console.error("🔥 Upload Error Details:", {
                message: error.message,
                http_code: error.http_code,
                name: error.name,
                stack: error.stack
            });

            throw new AppError("Failed to upload image file. Please check Cloudinary configuration.");
        }
    }

    static async #saveBase64Locally(base64Img) {
        const uploadsDir = path.join(__dirname, "..", "uploads");
        const fileName = `img-${Date.now()}.${this.#getImageExtension(base64Img)}`;
        const filePath = path.join(uploadsDir, fileName);

        try {
            await fs.mkdir(uploadsDir, { recursive: true });

            const base64Data = base64Img.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

            await fs.writeFile(filePath, buffer);

            return {
                filePath,
                cleanup: () => fs.unlink(filePath).catch(() => { }),
            };
        } catch (error) {
            throw new AppError("Failed to save image locally.");
        }
    }

    static #getImageExtension(base64Img) {
        const match = base64Img.match(/^data:image\/(\w+);/);
        return match?.[1] || "png";
    }
}