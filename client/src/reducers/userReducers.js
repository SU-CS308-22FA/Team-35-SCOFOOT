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
	ALL_USERS_SUCCESS,
	GET_USER_SUCCESS,
	FAVORITES_GET_SUCCESS
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: true, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case USER_UPDATE_FAIL:
			return { loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { loading: true };
		case USER_DELETE_SUCCESS:
			return { loading: false};
		case USER_DELETE_FAIL:
			return { loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const seeVerificationReducer = (state = {}, action) => {  // all verification requests are here
	switch (action.type) {
		case  ADMIN_VERIFICATION_REQUEST_SUCCESS:
			return { RequestInfo: action.payload };
		
		case ADMIN_VERIFICATION_REQUEST_FAIL:
			return { error: action.payload };


		case INBOX_AFTER_DELETION_SUCCESS:
			return { RequestInfo: action.payload};

		
		default:
			return state;
	}
};

export const allUsersReducer = (state = {}, action) => {
	switch(action.type) {
		case ALL_USERS_SUCCESS:
			return {usersData : action.payload};
		default:
			return state;
	}
}


export const getFavoritesReducer = (state={}, action) => {
	switch(action.type){
		case FAVORITES_GET_SUCCESS:
			return {favoritesData: action.payload};

		default:
			return state;
	}
}




