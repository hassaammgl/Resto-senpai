import mongoose from "mongoose"
import colors from "colors"
import { ENVS } from "./constants.js"

const connectDb = async () => {
    console.time("connected Db")
    console.time("connected Db")
    try {
        const conn = await mongoose.connect(ENVS.MONGO_URI)
        console.log(colors.cyan(`MongoDB Connected: ${conn?.connection?.db?.databaseName}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.timeEnd("connected Db")
}

export default connectDb;