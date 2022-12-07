import {
  PLAYER_GET_SUCCESS,
  PLAYER_GET_FAIL,
  PLAYER_GET_REQUEST,
} from "../constants/playerConstants";

export const playerGetReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_GET_REQUEST:
      return { loading: true };
    case PLAYER_GET_SUCCESS:
      return { loading: false, playerInfo: action.payload };
    case PLAYER_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
