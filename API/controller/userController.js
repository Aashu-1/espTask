import userSchemaModel from "../model/userModel.js";
import "../model/connection.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";
//--------------------------------------------------------------------------------------------------
//FOR ADDING THE USER DATA INTO THE DB
export const save = async (req, res, next) => {
  const user = await userSchemaModel.find().sort({ _id: -1 });
  const id = user.length === 0 ? 1 : user[0]._id + 1;

  const userObj = {
    _id: id,
    info: new Date(),
    role: "user",
    ...req.body,
  };

  try {
    const isUserSaved = await userSchemaModel.create(userObj);
    if (isUserSaved) {
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

//--------------------------------------------------------------------------------------------------
//FOR LOGIN INTO THE APPLICATION USING JWT AUNTHENTICATION

export const login = async (req, res, next) => {
  const condition_obj = { ...req.body };
  const user = await userSchemaModel.find(condition_obj);
  if (user) {
    var payload = { id: user[0]._id };

    var key = rs.generate();

    
    var token = jwt.sign(payload, key);

    res.status(200).json({
      msg: "Logged in successfully...",
      token: token,
      userDetails: user,
    });
  } else {
    res.status(404).json({ msg: "Cannot login..." });
  }
};
