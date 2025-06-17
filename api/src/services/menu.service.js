import { AppError } from "../utils/AppError";
import { Upload } from "../utils/UploadImg";
import Dish from "../models/dish.model";

export class MenuService {

    static #isValidUrl(str, options = {}) {
        const { requireProtocol = true, allowRelative = false } = options;

        try {
            const url = new URL(str);

            if (requireProtocol && !url.protocol) return false;
            if (!allowRelative && !url.hostname) return false;

            return true;
        } catch (err) {
            if (allowRelative) {
                // Check for relative URLs
                try {
                    new URL(str, 'http://example.com');
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
    }

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

            if (this.#isValidUrl(image)) {
                console.log(name, description, price, category, image, quantity, _id);
                const updatedDish = await Dish.findByIdAndUpdate({ _id }, { name, description, price, category, image, quantity })
                updatedDish.save();
                console.log(updatedDish);
                return {
                    updatedDish
                }
            }
            else {
                const imgUrl = await Upload.uploadImg(image);
                console.log(name, description, price, category, imgUrl, quantity, _id);
                const updatedDish = await Dish.findByIdAndUpdate({ _id }, { name, description, price, category, imgUrl, quantity })
                updatedDish.save();
                console.log(updatedDish);
                return {
                    updatedDish
                }
            }
        } catch (error) {
            throw new AppError(error)
        }
    }

    static async deleteDish(_id) {
        try {
            const dish = await Dish.findByIdAndDelete({ _id })
            console.log("dish is deleted ", dish);
            if (dish === null) {
                throw new AppError("Error while deleting dish..")
            } else {
                let allDishes = await Dish.find()
                allDishes = allDishes.reverse()
                return {
                    allDishes
                }
            }
        } catch (error) {
            throw new AppError(error)
        }
    }

    static async getAllDishes() {
        try {
            let allDishes = await Dish.find()
            allDishes = allDishes.reverse()
            return {
                allDishes
            }
        } catch (error) {
            throw new AppError(error)
        }
    }
}