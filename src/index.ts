import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("listening on " + port)
});