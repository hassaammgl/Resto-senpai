import { v2 as cloudinary } from 'cloudinary';
import { ENVS } from "./constants"

cloudinary.config({
    cloud_name: ENVS.CLOUDINARY_CLOUD_NAME,
    api_key: ENVS.CLOUDINARY_API_KEY,
    api_secret: ENVS.CLOUDINARY_API_KEY
});

export default cloudinary;
