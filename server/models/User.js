import { Int32 } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    aboutme: {
      type: String,
      required: false,
      default: "This is about me!",
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    profile_type: { type: String, required: true, default: "Player" },
    isVerified: { type: Boolean, required: true, default: false },
    isRequestSent: { type: Boolean, required: true, default: false },
    favorites_list: { type: Array, required: true, default: [] },
    following_sent: { type: Array, required: true, default: [] }, // bu kisinin takip istegi attigi
    following_approved: { type: Array, required: true, default: [] }, // bu kisinin takip ettikleri
    following_request_waiting: { type: Array, required: true, default: [] }, // bu kisiye gelen takip istekleri
    image: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
