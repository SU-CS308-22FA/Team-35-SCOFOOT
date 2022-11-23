
import mongoose from "mongoose";


const requestSchema = mongoose.Schema(
	{
		
		name: { type: String, required: true },
		surname: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		
	},

	
);



const Requests = mongoose.model("Requests", requestSchema);

export default Requests;
