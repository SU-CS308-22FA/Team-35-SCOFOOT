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
  ALL_USERS_SUCCESS,
  FAVORITES_GET_SUCCESS,
  GET_USER_BY_ID_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post("/api/users/login", {
      // userin butun verileri geldi isVerified dahil
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

export const register = (name, surname, email, password, pic, accountType, verificationCode) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const { data } = await axios.post("/api/users/signup", {
				name,
				surname,
				email,
				password,
				pic,
				accountType,
				verificationCode
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
  try {
    const { data } = await axios.get("/api/users/requests");
    //console.log(data);
    dispatch({ type: ADMIN_VERIFICATION_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_VERIFICATION_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const seeAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/allUsers");
    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
  } catch (error) {}
};

export const deleteVerificationRequest = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.post("api/users/deleteRequest", { _id });
    //console.log(data);
    dispatch({ type: INBOX_AFTER_DELETION_SUCCESS, payload: data }); // burada delete yaptiktan sonra geri kalan datayi dondur
  } catch (error) {}
};

export const approveVerificationRequest = (_id, email) => async (dispatch) => {
  try {
    console.log("111222");

    const { data } = await axios.post("api/users/approveRequest", { _id });

    dispatch({ type: INBOX_AFTER_DELETION_SUCCESS, payload: data }); // burada delete yaptiktan sonra geri kalan datayi dondur
    console.log("abbbbbbbbbbb");

    //const user = await axios.post("api/users/getUser", {email});
    //const x = user.data ;
    //dispatch({type: USER_LOGIN_SUCCESS, payload: x});
  } catch (error) {}
};

export const sendRequest = (email) => async (dispatch) => {
  try {
    console.log(email);
    const { data } = await axios.post("api/users/sendRequest", { email });
    //console.log(data);

    dispatch({ type: INBOX_AFTER_DELETION_SUCCESS, payload: data });
  } catch (error) {}
};

export const changeIsSent = (email) => async (dispatch) => {
  const { data } = await axios.post("/api/users/isSent", { email });
  dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
};

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

    const { data } = await axios.post(
      "/api/users/profile/delete",
      user,
      config
    );

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

export const addToFavorites =
  (goalkeeper_id, user_id) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/api/users/addFavorites", {
        goalkeeper_id,
        user_id,
      });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {}
  };

export const deleteFromFavorites =
  (goalkeeper_id, user_id) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/api/users/deleteFavorites", {
        goalkeeper_id,
        user_id,
      });
      console.log(data);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {}
  };

export const getFavorites = (start, stop, _id) => async (dispatch) => {
  try {
    console.log(_id);
    console.log(start);
    console.log(stop);
    const { data } = await axios.get(
      `/api/users/favorites/?start=${start}&stop=${stop}`,
      { params: { _id } }
    );
    console.log(data);
    dispatch({ type: FAVORITES_GET_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/userInfo", { _id });
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {}
};

export const sendFollowingRequest = (user_id, data_id) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/sendFollowingRequest", {
      user_id,
      data_id,
    }); // user dondur

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {}
};

export const seeAllFollowingRequests = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/seeFollowingRequests", {
      _id,
    });
    //dispatch ( {type: WAITING_FOLLOWING_REQUESTS, payload: data});
    //localStorage.setItem("followingRequestsInfo", JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {}
};

export const deleteFollowingRequest =
  (user_id, data_id) => async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/deleteFollowingRequest", {
        user_id,
        data_id,
      });
      //dispatch ({type: WAITING_FOLLOWING_REQUESTS, payload: data});
      //localStorage.setItem("followingRequestsInfo", JSON.stringify(data));

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      //dispatch( {type: GET_USER_BY_ID_SUCCESS, payload: data});
      localStorage.setItem("userInfo", JSON.stringify(data));

      console.log(data);
    } catch (error) {}
  };

export const approveFollowingRequest =
  (user_id, data_id) => async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/approveFollowingRequest", {
        user_id,
        data_id,
      });

      //dispatch ({type: WAITING_FOLLOWING_REQUESTS, payload: data});
      //localStorage.setItem("followingRequestsInfo", JSON.stringify(data));

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      //dispatch( {type: GET_USER_BY_ID_SUCCESS, payload: data});
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
    } catch (error) {}
  };

export const getCurrentUser = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/currentUserInfo", { _id });
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {}
};

export const removeFollowedUser = (user_id, data_id) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/removeFollowedUser", {
      user_id,
      data_id,
    });
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {}
};
