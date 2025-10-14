import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

const app = express()


dotenv.config({ quiet: true });

connectDB(process.env.MONGODB_URL);





app.listen(process.env.PORT, () => {
    console.log(`Server started successfully at http://localhost:${process.env.PORT}`)
})
