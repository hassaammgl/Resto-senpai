import { AppError } from "../utils/AppError";
import { Upload } from "../utils/UploadImg";
import Dish from "../models/dish.model";

export class MenuService {
    static async addDishItem(data) {
        const { name, description, price, category, image } = data;
        try {
            const imgUrl = await Upload.uploadImg(image);
            console.log(name, description, price, category, imgUrl);
            const newDish = new Dish({
                name,
                description,
                price,
                category,
                image: imgUrl
            })
            await newDish.save();
            return {
                newDish
            }
        } catch (error) {
            throw new AppError(error)
        }
    }
    static async getAllDishes() {
        try {
            const allDishes = await Dish.find()
            return {
                allDishes
            }
        } catch (error) {
            throw new AppError(error)
        }
    }
}