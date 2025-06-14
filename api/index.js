import app from "./src/app";
import colors from "colors"
import connectDb from "./src/config/db"
import { checkEnvs } from "./src/config/constants";

checkEnvs()
connectDb()

const server = app.listen(5000, () => {
    console.log("listening on port 5000");
})

process.on("unhandledRejection", (err) => {
    console.log(colors.red(`Error: ${err.message}`));
    server.close(() => process.exit(1))
})
