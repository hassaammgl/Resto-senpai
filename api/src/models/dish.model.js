import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
