import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	userDeleteReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
	seeVerificationReducer,
	
} from "./reducers/userReducers";
import { playerGetReducer } from "./reducers/playerReducers";
const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	seeVerification : seeVerificationReducer,
  	playerGet: playerGetReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
