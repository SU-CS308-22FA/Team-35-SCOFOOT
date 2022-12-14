import axios from "axios";
import {
  ALL_PLAYERS_GET_FAIL,
  ALL_PLAYERS_GET_SUCCESS,
  ALL_PLAYERS_GET_REQUEST,
  PLAYER_GET_REQUEST,
  PLAYER_GET_SUCCESS,
  PLAYER_GET_FAIL
} from "../constants/playerConstants";

export const allPlayersGet = (start, stop) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PLAYERS_GET_REQUEST });
    const { data } = await axios.get(`/api/players/all?start=${start}&stop=${stop}`);
    dispatch({ type: ALL_PLAYERS_GET_SUCCESS, payload: data });

    localStorage.setItem("allPlayersInfo", JSON.stringify(data));
  } catch (error) {

    dispatch({
      type: ALL_PLAYERS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const playerGet = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_GET_REQUEST });

    const { data } = await axios.get(`/api/players/playerInfo?id=${id}`);
    dispatch({ type: PLAYER_GET_SUCCESS, payload: data });
    console.log(data);
    localStorage.setItem("playerInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: PLAYER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
