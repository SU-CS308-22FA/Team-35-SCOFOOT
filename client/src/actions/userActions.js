import axios from "axios";
import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	ADMIN_VERIFICATION_REQUEST_FAIL,
	ADMIN_VERIFICATION_REQUEST_SUCCESS,
	INBOX_AFTER_DELETION_SUCCESS,
	VERIFICATION_STATUS_UPDATE,
	ALL_USERS_SUCCESS
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const { data } = await axios.post("/api/users/login", { // userin butun verileri geldi isVerified dahil
			email,
			password,
		});

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
};

export const register =
	(name, surname, email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const { data } = await axios.post("/api/users/signup", {
				name,
				surname,
				email,
				password,
			});

			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const updateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post("/api/users/profile", user, config);

		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const seeVerificationRequest = () => async (dispatch) => {
	try{
		const { data } = await axios.get("/api/users/requests"); 
		console.log(data);
		dispatch({ type: ADMIN_VERIFICATION_REQUEST_SUCCESS , payload: data});
	}
	catch (error) {
		dispatch({
			type: ADMIN_VERIFICATION_REQUEST_FAIL, 
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const seeAllUsers = () => async(dispatch) => {
	try{
		const {data} = await axios.get("/api/users/allUsers");
		dispatch({ type: ALL_USERS_SUCCESS , payload: data});
	}
	catch(error){

	}
}


export const deleteVerificationRequest = (_id) => async(dispatch) =>{
	try{
		
		
		const {data} = await axios.post("api/users/deleteRequest",  {_id});
		console.log(data);
		dispatch({type: INBOX_AFTER_DELETION_SUCCESS , payload: data}); // burada delete yaptiktan sonra geri kalan datayi dondur
		

	}
	catch (error) {
		
	}

};


export const approveVerificationRequest = (_id) => async(dispatch) =>{
	try{
		
		
		const {data} = await axios.post("api/users/approveRequest",  {_id});
		console.log(data);
		dispatch({type: INBOX_AFTER_DELETION_SUCCESS , payload: data}); // burada delete yaptiktan sonra geri kalan datayi dondur
	}
	catch (error) {
		
	}

};


export const sendRequest = (email) => async(dispatch) =>{
	try{
		
		console.log(email);
		const {data} = await axios.post("api/users/sendRequest",  {email});
		console.log(data);
		dispatch({type: INBOX_AFTER_DELETION_SUCCESS, payload: data});
		
		

	}
	catch (error) {
		
	}

};


export const changeIsSent = (email) => async(dispatch) => {
		const {data} = await axios.post("/api/users/isSent", {email});
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });		

}


export const deleteUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post("/api/users/profile/delete", user, config);

		dispatch({ type: USER_DELETE_SUCCESS, payload: data });

		localStorage.removeItem("userInfo");
		dispatch({ type: USER_LOGOUT });

	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};


