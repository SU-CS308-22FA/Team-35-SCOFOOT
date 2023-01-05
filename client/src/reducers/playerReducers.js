import {
  ALL_PLAYERS_GET_SUCCESS,
  ALL_PLAYERS_GET_FAIL,
  ALL_PLAYERS_GET_REQUEST,
  PLAYER_GET_REQUEST,
  PLAYER_GET_FAIL,
  PLAYER_GET_SUCCESS,
  PLAYER_SEARCH_REQUEST,
  PLAYER_SEARCH_FAIL,
  PLAYER_SEARCH_SUCCESS,
  CHANGE_REQUEST_REQUEST,
  CHANGE_REQUEST_SUCCESS,
  CHANGE_REQUEST_FAIL,
  GET_CHANGE_REQUESTS_REQUEST,
  GET_CHANGE_REQUESTS_SUCCESS,
  GET_CHANGE_REQUESTS_FAIL,
  REMOVE_CHANGE_REQUEST_REQUEST,
  REMOVE_CHANGE_REQUEST_SUCCESS,
  REMOVE_CHANGE_REQUEST_FAIL
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

export const playerSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_SEARCH_REQUEST:
      return { loading: true };
    case PLAYER_SEARCH_SUCCESS:
      return { loading: false, playerSearchResult: action.payload };
    case PLAYER_SEARCH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const changeRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_REQUEST_REQUEST:
      return { loading: true };
    case CHANGE_REQUEST_SUCCESS:
      return { loading: false };
    case CHANGE_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getChangeRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CHANGE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_CHANGE_REQUESTS_SUCCESS:
      return { loading: false, changeRequests: action.payload};
    case GET_CHANGE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const removeChangeRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_CHANGE_REQUEST_REQUEST:
      return { loading: true };
    case REMOVE_CHANGE_REQUEST_SUCCESS:
      return { loading: false };
    case REMOVE_CHANGE_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

