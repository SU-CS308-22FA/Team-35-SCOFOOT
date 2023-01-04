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
	allUsersReducer,
	getFavoritesReducer,
	getUserReducer,
	seeRequestsReducer
	
} from "./reducers/userReducers";
import { allPlayersGetReducer, playerGetReducer, playerSearchReducer } from "./reducers/playerReducers";
import { allTeamsGetReducer, teamGetReducer } from "./reducers/teamReducers";
const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	seeVerification : seeVerificationReducer,
	allUsers: allUsersReducer,
  	allPlayersGet: allPlayersGetReducer,
	playerGet: playerGetReducer,
	allTeamsGet: allTeamsGetReducer,
	teamGet: teamGetReducer,
	favoritePlayers : getFavoritesReducer,
	playerSearch: playerSearchReducer,
	otherUser : getUserReducer,
	seeFollowingRequests: seeRequestsReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const connectionInfo = localStorage.getItem("followingRequestsInfo")
  ? JSON.parse(localStorage.getItem("followingRequestsInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  seeFollowingRequests: { followingRequestsInfo: connectionInfo}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
