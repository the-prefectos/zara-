import express, {  Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { register, login } from "./routes/user";
import clothesRoutes from "./routes/clothes";
import menRoutes from "./routes/men";
import womenRoutes from "./routes/women";
import kidsRoutes from "./routes/kids"
import cors from 'cors';


const app  = express();
app.use(cors());
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.post("/register", register);
app.post("/login", login);
app.use("/clothes", clothesRoutes);
app.use("/men", menRoutes);
app.use("/women", womenRoutes);
app.use("/kids", kidsRoutes);

mongoose
  .connect("mongodb+srv://messud:azerty123@seniordata.sg77wxf.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
