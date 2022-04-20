import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

const app = express();

app.use(json());
app.use(cors());

app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("listening on " + port)
});