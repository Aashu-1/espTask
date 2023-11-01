import express from "express";
import * as userController from "../controller/userController.js";

const route = express.Router();

route.post("/save", userController.save);
route.post("/login", userController.login);
// route.get("/fetch", userController.fetch);

export default route;
