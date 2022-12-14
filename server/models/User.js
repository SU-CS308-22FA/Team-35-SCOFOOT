import { Int32 } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		surname: { type: String, required: true },
    aboutme: {
      type: String,
      required: true,
      default: "This is about me!",
    },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		profile_type: {type: String, required: true, default: 'Player'},
		isVerified: {type: Boolean, required: true, default: false},
		isRequestSent : {type: Boolean, required: true, default: false},
		favorites_list : {type : Array , required:true, default: []}
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
