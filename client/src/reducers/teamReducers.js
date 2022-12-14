import {
    ALL_TEAMS_GET_SUCCESS,
    ALL_TEAMS_GET_FAIL,
    ALL_TEAMS_GET_REQUEST,
    TEAM_GET_REQUEST,
    TEAM_GET_FAIL,
    TEAM_GET_SUCCESS
  } from "../constants/teamConstants";
  
  export const allTeamsGetReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_TEAMS_GET_REQUEST:
        return { loading: true };
      case ALL_TEAMS_GET_SUCCESS:
        return { loading: false, teamInfo: action.payload };
      case ALL_TEAMS_GET_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const teamGetReducer = (state = {}, action) => {
    switch (action.type) {
      case TEAM_GET_REQUEST:
        return { loading: true };
      case TEAM_GET_SUCCESS:
        return { loading: false, teamInfo: action.payload };
      case TEAM_GET_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };