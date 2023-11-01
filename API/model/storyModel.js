import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const storySchema = mongoose.Schema({
  _id: Number,
  role: String,
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
  },
  sentences: {
    type: String,
    required: true,
  },

  //WE STORE ID OF THE USER INSIDE
  owner: {
    type: Number,
  },
});

storySchema.plugin(mongooseUniqueValidator);
const storySchemaModel = mongoose.model("story_details", storySchema);
export default storySchemaModel;
