import express, { Express } from "express";
import "dotenv/config";
import notesRouter from "./routes/notes";

const app: Express = express();
const PORT: number = +(process.env.PORT || 3000);

app.use(express.json());
app.use("/api", notesRouter);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
