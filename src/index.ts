import "reflect-metadata"
import express from "express";
import cors from "cors"

import './database/connect'
import routes from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes)

app.listen("https://crud-produtos-test.herokuapp.com/", () => console.log("🚀 Server started as port 5000"))