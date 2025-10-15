import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection.js";
import routes from "./routes/route.js";

const app = express()

dotenv.config({ quiet: true });

app.use(cors());
app.use(express.urlencoded())
app.use(express.json());

connectDB(process.env.MONGODB_URL);

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server started successfully at http://localhost:${process.env.PORT}`)
})
