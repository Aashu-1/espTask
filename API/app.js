import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import storyRouter from "./routes/storyRouter.js";
import sentenceRouter from "./routes/sentenceRouter.js";
import cors from "cors";

//initialising the app using express module--------------------------
const app = express();

//ENCODING DATA IN THE BODY SECURELY
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ADDED TO SOLVE THE PROBLEM OF CROSS ORIGIN
app.use(cors());

//REDIRECTING TO THE USER ROUTE
app.use("/user", userRouter);
app.use("/story", storyRouter);
app.use("/sentence", sentenceRouter);

app.listen(3001);
console.log("server is activated at http://localhost:3001");
