import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const userSchema = mongoose.Schema({
  _id: Number,
  info: String,
  role: String,
  name: {
    type: String,
    lowercase: true,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    lowercase: true,
    required: [true, "password is required"],
  },
});
userSchema.plugin(mongooseUniqueValidator);
const userSchemaModel = mongoose.model("user_details", userSchema);
export default userSchemaModel;
