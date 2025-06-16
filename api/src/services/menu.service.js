import { AppError } from "../utils/AppError";
import { Upload } from "../utils/UploadImg";
import Dish from "../models/dish.model";

export class MenuService {
    static async addDishItem(data) {
        const { name, description, price, category, image, quantity } = data;
        try {
            const imgUrl = await Upload.uploadImg(image);
            console.log(name, description, price, category, imgUrl, quantity);
            const newDish = new Dish({
                name,
                description,
                price,
                category,
                image: imgUrl,
                quantity
            })
            await newDish.save();
            return {
                newDish
            }
        } catch (error) {
            throw new AppError(error)
        }
    }
    static async updateDishItem(data) {
        const { _id, name, description, price, category, image, quantity } = data;
        try {
            const imgUrl = await Upload.uploadImg(image);
            console.log(name, description, price, category, imgUrl, quantity, _id);
            const updatedDish = await Dish.findByIdAndUpdate({ _id }, { name, description, price, category, imgUrl, quantity })
            updatedDish.save();
            console.log(updatedDish);
            return {
                updatedDish
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