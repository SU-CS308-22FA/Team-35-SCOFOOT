import {
  ALL_PLAYERS_GET_SUCCESS,
  ALL_PLAYERS_GET_FAIL,
  ALL_PLAYERS_GET_REQUEST,
  PLAYER_GET_REQUEST,
  PLAYER_GET_FAIL,
  PLAYER_GET_SUCCESS
} from "../constants/playerConstants";

export const allPlayersGetReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PLAYERS_GET_REQUEST:
      return { loading: true };
    case ALL_PLAYERS_GET_SUCCESS:
      return { loading: false, playerInfo: action.payload };
    case ALL_PLAYERS_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

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
