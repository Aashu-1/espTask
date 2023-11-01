import sentenceSchemaModel from "../model/sentenceModel.js";
import "../model/connection.js";
import url from "url";

// /--------------------------------------------------------------------------------------------------
//FOR ADDING THE SENTENCE INTO THE DB
export const save = async (req, res, next) => {
  const sentence = await sentenceSchemaModel.find().sort({ _id: -1 });
  const id = sentence.length === 0 ? 1 : sentence[0]._id + 1;

  const sentenceObj = {
    _id: id,
    ...req.body,
  };

  try {
    const issentenceSaved = await sentenceSchemaModel.create(sentenceObj);
    if (issentenceSaved) {
      res.status(200).json({
        status: true,
        msg: "Your details has been added successfully",
      });
    } else {
      res.status(400).json({ status: false, msg: "server error......" });
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "Given data already exists.." });
  }
};

// /--------------------------------------------------------------------------------------------------
//FOR FETCHING THE SEMT FROM THE DB

export const fetch = async (req, res, next) => {
  const condition = url.parse(req.url, true).query;
  const sentence = await sentenceSchemaModel.find(condition);

  if (sentence.length !== 0) {
    res.status(200).json({
      msg: "sentence has been fetched successfully",
      sentenceDetails: sentence,
    });
  } else {
    res.status(200).json({ msg: "sentence doesn't exists" });
  }
};

// /--------------------------------------------------------------------------------------------------
//FOR UPDATING THE sentence IN THE DB

export const updateSentence = async (req, res, next) => {
  const sentence = await sentenceSchemaModel.find(req.body.condition_obj);
  if (sentence.length !== 0) {
    const issentenceUpdated = await sentenceSchemaModel.updateOne(
      req.body.condition_obj,
      { $set: req.body.newdata_obj }
    );

    if (issentenceUpdated) {
      res.status(200).json({
        status: true,
        msg: "Details have been updated successfully",
        sentenceDetails: sentence,
      });
    } else {
      res.status(400).json({ status: false, msg: "server error......" });
    }
  } else {
    res.status(404).json({
      status: false,
      msg: "No such sentence exists.",
    });
  }
};
//---------------------------------------------------------------------------------------
//FOR DELETING THE sentence FROM THE DB
export const deleteSentence = async (req, res, next) => {
  const condition_obj = req.body;
  console.log(condition_obj);
  const sentence = await sentenceSchemaModel.find(condition_obj);
  if (sentence.length !== 0) {
    const issentenceDeleted = await sentenceSchemaModel.deleteOne(
      condition_obj
    );
    if (issentenceDeleted) {
      res.status(200).json({
        status: true,
        msg: "sentenceDetails have been deleted successfully",
      });
    } else {
      res.status(400).json({ status: false, msg: "server error......" });
    }
  } else {
    res.status(404).json({
      status: false,
      msg: "No such sentence exists...",
    });
  }
};
