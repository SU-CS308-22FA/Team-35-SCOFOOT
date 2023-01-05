import mongoose from "mongoose";


const changeRequestSchema = mongoose.Schema(
	{
		player: {
		    type: mongoose.Schema.Types.ObjectId,
            ref: 'Player', 
            required: true
        },
        title: { type: String, required: true },
		request: { type: String, required: true },
		
	},
);

const ChangeRequest = mongoose.model("ChangeRequest", changeRequestSchema);

export default ChangeRequest;