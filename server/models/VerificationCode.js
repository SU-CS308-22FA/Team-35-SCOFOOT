import mongoose from "mongoose";


const verificationCodeSchema = mongoose.Schema(
	{
		player: {
		    type: mongoose.Schema.Types.ObjectId,
            ref: 'Player', 
            required: true
        },
		team: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team', 
            required: true
        },
		code: { type: String, required: true },
        isUsed: { type: Boolean, default: false},
		
	},
);

const VerificationCode = mongoose.model("VerificationCode", verificationCodeSchema);

export default VerificationCode;