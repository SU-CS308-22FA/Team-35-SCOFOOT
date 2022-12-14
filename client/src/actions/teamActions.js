import axios from "axios";
import {
  ALL_TEAMS_GET_FAIL,
  ALL_TEAMS_GET_SUCCESS,
  ALL_TEAMS_GET_REQUEST,
  TEAM_GET_REQUEST,
  TEAM_GET_SUCCESS,
  TEAM_GET_FAIL
} from "../constants/teamConstants";

export const allTeamsGet = (start, stop) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TEAMS_GET_REQUEST });
    const { data } = await axios.get(`/api/teams/all?start=${start}&stop=${stop}`);
    dispatch({ type: ALL_TEAMS_GET_SUCCESS, payload: data });

    localStorage.setItem("allTeamsInfo", JSON.stringify(data));
  } catch (error) {

    dispatch({
      type: ALL_TEAMS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const teamGet = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_GET_REQUEST });

    const { data } = await axios.get(`/api/teams/teamInfo?id=${id}`);
    dispatch({ type: TEAM_GET_SUCCESS, payload: data });
    console.log(data);
    localStorage.setItem("teamInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: TEAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
