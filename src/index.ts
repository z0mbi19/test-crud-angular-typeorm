import "reflect-metadata"
import express from "express";
import cors from "cors"

import './database/connect'
import routes from "./routes";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:4200"
    ], credentials: true
}));

app.use(express.json());

app.use(routes)

app.listen(5000, () => console.log("🚀 Server started as port 5000"))