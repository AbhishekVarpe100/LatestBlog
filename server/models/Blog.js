const mongoose=require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String ,
      required: true,
      unique: true,
      trim: true
    },

    file: {
      type: String,
      required: true,
      trim :true
    }
  },
  { timestamps: true }
);

module.exports= mongoose.model("Blog", blogSchema);
