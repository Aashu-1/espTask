import storySchemaModel from "../model/storyModel.js";
import "../model/connection.js";
import url from "url";

// /--------------------------------------------------------------------------------------------------
//FOR ADDING THE STORY DATA INTO THE DB
export const save = async (req, res, next) => {
  const story = await storySchemaModel.find().sort({ _id: -1 });
  const id = story.length === 0 ? 1 : story[0]._id + 1;

  const storyObj = {
    _id: id,
    role: "story",
    ...req.body,
  };

  try {
    const isstorySaved = await storySchemaModel.create(storyObj);
    if (isstorySaved) {
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
//FOR FETCHING THE STORY FROM THE DB

export const fetch = async (req, res, next) => {
  const condition = url.parse(req.url, true).query;
  const story = await storySchemaModel.find(condition);

  if (story.length !== 0) {
    res.status(200).json({
      msg: "story has been fetched successfully",
      storyDetails: story,
    });
  } else {
    res.status(200).json({ msg: "story doesn't exists" });
  }
};

// /--------------------------------------------------------------------------------------------------
//FOR UPDATING THE STORY IN THE DB

export const updateStory = async (req, res, next) => {
  const story = await storySchemaModel.find(req.body.condition_obj);
  if (story.length !== 0) {
    const isstoryUpdated = await storySchemaModel.updateOne(
      req.body.condition_obj,
      { $set: req.body.newdata_obj }
    );

    if (isstoryUpdated) {
      res.status(200).json({
        status: true,
        msg: "Details have been updated successfully",
        storyDetails: story,
      });
    } else {
      res.status(400).json({ status: false, msg: "server error......" });
    }
  } else {
    res.status(404).json({
      status: false,
      msg: "No such story exists.",
    });
  }
};
//---------------------------------------------------------------------------------------
//FOR DELETING THE STORY FROM THE DB
export const deleteStory = async (req, res, next) => {
  console.log(req.body);
  const condition_obj = req.body;
  const story = await storySchemaModel.find(condition_obj);
  if (story.length !== 0) {
    const isstoryDeleted = await storySchemaModel.deleteOne(condition_obj);
    if (isstoryDeleted) {
      res.status(200).json({
        status: true,
        msg: "storyDetails have been deleted successfully",
      });
    } else {
      res.status(400).json({ status: false, msg: "server error......" });
    }
  } else {
    res.status(404).json({
      status: false,
      msg: "No such story exists...",
    });
  }
};

//--------------------------------------------------------------------------------------------------
//FOR DELETING ONLY A SINGLE FIELD

export const deleteSentence = async (req, res, next) => {
  const story = await storySchemaModel.findOne(req.body.condition_obj);

  if (story) {
    const deleteSentence = await storySchemaModel.updateOne(
      req.body.condition_obj,
      {
        $unset: req.body.newdata_obj,
      }
    );
    if (deleteSentence) {
      res.status(200).json({
        status: true,
        msg: "sentence has  been deleted successfully",
      });
    } else {
      res.status(400).json({
        msg: "server error.....",
      });
    }
  } else {
    res.status(404).json({
      status: false,
      msg: "No such story exists...",
    });
  }
};
