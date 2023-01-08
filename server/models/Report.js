import { Int32 } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const reportSchema = new mongoose.Schema(
    {
      postedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      selectedOption: {
        type: String,
        required: false,
      },
  
      text: {
        type: String,
        required: false,
      },
  
    },
    { timestamps: true }
  );
  const Report = mongoose.model("Report", reportSchema);
  
  export default Report;