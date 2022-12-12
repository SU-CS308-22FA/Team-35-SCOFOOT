import axios from "axios";
import {
  PLAYER_GET_FAIL,
  PLAYER_GET_SUCCESS,
  PLAYER_GET_REQUEST,
} from "../constants/playerConstants";

export const playerGet = (start, stop) => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_GET_REQUEST });

    console.log(start, stop);
    const { data } = await axios.get(`/api/players/all?start=${start}&stop=${stop}`);
    dispatch({ type: PLAYER_GET_SUCCESS, payload: data });

    localStorage.setItem("playerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PLAYER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
