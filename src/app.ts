import express, { Express } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import notesRouter from "./routes/notes";

const app: Express = express();
const PORT: number = +(process.env.PORT || 3000);
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/";

app.use(express.json());
app.use("/api", notesRouter);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Database connected :)");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting database :(");
        console.error(error);
    });
