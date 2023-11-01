import express from "express";
import * as sentenceController from "../controller/sentenceController.js";

const route = express.Router();

route.post("/save", sentenceController.save);
route.get("/fetch", sentenceController.fetch);
route.patch("/update", sentenceController.updateSentence);
route.delete("/delete", sentenceController.deleteSentence);

export default route;
