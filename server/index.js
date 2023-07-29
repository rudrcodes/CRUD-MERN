import express from "express";
const app = express();
import cors from "cors";
import { connectToDB } from "./database/connect.js";
import userRouter from "./routes/userRoutes.js";

const PORT = 8000;

app.use(
  cors({
    origin: ["https://crud-mern-frontend-rudrcodes.vercel.app/"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/", userRouter);

//Connect to DB
connectToDB();

app.listen(8000, () => {
  console.log(`Server Running at Port : ${PORT} 🍬`);
});
