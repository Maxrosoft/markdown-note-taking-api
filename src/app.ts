import express, { Express } from "express";
import "dotenv/config";

const app: Express = express();
const PORT: number = +(process.env.PORT || 3000);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
