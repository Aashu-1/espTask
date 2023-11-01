import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const sentenceSchema = mongoose.Schema({
  _id: Number,
  userID: {
    type: Number,
    required: true,
  },
  storyID: {
    type: Number,
    required: true,
  },
  sentences: {
    type: String,
    required: true,
  },
});

sentenceSchema.plugin(mongooseUniqueValidator);
const sentenceSchemaModel = mongoose.model("sentence_details", sentenceSchema);
export default sentenceSchemaModel;
