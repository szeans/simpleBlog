import "./env.js";

import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "node:path";
import {fileURLToPath} from "node:url";

import blogRouter from "./routes/blog.js";
import indexRouter from "./routes/index.js";

const app = express();
const __dirname = fileURLToPath(new URL(".", import.meta.url));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);

mongoose.connect(
  process.env.KEY, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(
  "/blog",
  (req, res, next) => {
    //
    // check for password soon
    // maybe on wed

    next();
  },
  blogRouter
);

export default app;
