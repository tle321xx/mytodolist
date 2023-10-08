import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import { List } from "./models/todoModel.js";
import todoRoute from './routes/todoRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use('/lists', todoRoute)

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
