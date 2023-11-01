import express from "express";
import * as storyController from "../controller/storyController.js";

const route = express.Router();

route.post("/save", storyController.save);
route.get("/fetch", storyController.fetch);
route.patch("/update", storyController.updateStory);
route.patch("/deletesentence", storyController.deleteSentence);
route.delete("/delete", storyController.deleteStory);

export default route;
