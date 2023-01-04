import { 
	GENERATE_VERIFICATION_CODE_FAIL,
	GENERATE_VERIFICATION_CODE_REQUEST,
	GENERATE_VERIFICATION_CODE_SUCCESS,
	GET_VERIFICATION_CODE_FAIL,
	GET_VERIFICATION_CODE_REQUEST,
	GET_VERIFICATION_CODE_SUCCESS 
} from "../constants/adminConstants";
import axios from "axios";

export const generateVerificationCode = (teamId) => async (dispatch) => {
	try {
		dispatch({ type: GENERATE_VERIFICATION_CODE_REQUEST });

		const { data } = await axios.post("/api/admin/generateVerificationCode", {
			teamId
		});

		dispatch({ type: GENERATE_VERIFICATION_CODE_SUCCESS, payload: data });

	} catch (error) {
		dispatch({
			type: GENERATE_VERIFICATION_CODE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getVerificationCodes = () => async (dispatch) => {
	try {
		dispatch({ type: GET_VERIFICATION_CODE_REQUEST });

		const { data } = await axios.get("/api/admin/getVerificationCodes");

		dispatch({ type: GET_VERIFICATION_CODE_SUCCESS, payload: data });

	} catch (error) {
		dispatch({
			type: GET_VERIFICATION_CODE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};