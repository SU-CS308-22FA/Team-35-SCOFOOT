import axios from "axios";
import {
  ALL_PLAYERS_GET_FAIL,
  ALL_PLAYERS_GET_SUCCESS,
  ALL_PLAYERS_GET_REQUEST,
  PLAYER_GET_REQUEST,
  PLAYER_GET_SUCCESS,
  PLAYER_GET_FAIL,
  FAVORITES_GET_SUCCESS,
  PLAYER_SEARCH_REQUEST,
  PLAYER_SEARCH_SUCCESS,
  PLAYER_SEARCH_FAIL,
  CHANGE_REQUEST_REQUEST,
  CHANGE_REQUEST_SUCCESS,
  CHANGE_REQUEST_FAIL,
  GET_CHANGE_REQUESTS_REQUEST,
  GET_CHANGE_REQUESTS_SUCCESS,
  GET_CHANGE_REQUESTS_FAIL,
  REMOVE_CHANGE_REQUEST_REQUEST,
  REMOVE_CHANGE_REQUEST_SUCCESS,
  REMOVE_CHANGE_REQUEST_FAIL,
} from "../constants/playerConstants";

/**
 * Retrieves information for all players.
 *
 * @param start the start index for the player results
 * @param stop the stop index for the player results
 * @param dispatch the dispatch function to use for dispatching the results of the search
 * @throws Exception if any error occurs while retrieving the player information through dispatching ALL_PLAYERS_GET_FAILED state
 */
export const allPlayersGet = (start, stop) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PLAYERS_GET_REQUEST });
    const { data } = await axios.get(`/api/players/all?start=${start}&stop=${stop}`);
    dispatch({ type: ALL_PLAYERS_GET_SUCCESS, payload: data });

    
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

/**
 * Retrieves player information for the specified player ID.
 *
 * @param id the ID of the player to retrieve information for
 * @param dispatch the dispatch function to use for dispatching the results of the search
 * @throws Exception if any error occurs while retrieving the player information through dispatching PLAYER_GET_FAILED state
 */
export const playerGet = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_GET_REQUEST });

    const { data } = await axios.get(`/api/players/playerInfo?id=${id}`);
    dispatch({ type: PLAYER_GET_SUCCESS, payload: data });

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

/**
 * Performs a search for players using the specified search key.
 *
 * @param searchKey the search key to use for the search
 * @param start the start index for the search results
 * @param stop the stop index for the search results
 * @param dispatch the dispatch function to use for dispatching the results of the search
 * @throws Exception if any error occurs while performing the search through dispatching PLAYER_SEARCH_FAIL
 */

export const playerSearch = (searchKey, start, stop) => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_SEARCH_REQUEST });
    const { data } = await axios.get(`/api/players/playerSearch?start=${start}&stop=${stop}&searchKey=${searchKey}`);
    if (searchKey === data.currentSearchKey) {
      dispatch({ type: PLAYER_SEARCH_SUCCESS, payload: data });
    }
    
  } catch (error) {
    console.log(error);
    dispatch({
      type: PLAYER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeRequest = (player, title, request) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_REQUEST_REQUEST });
    const { data } = await axios.post(`/api/players/changeRequest`, {
      player,
      title,
      request
    });

    dispatch({ type: CHANGE_REQUEST_SUCCESS});
    
    
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANGE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChangeRequests = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CHANGE_REQUESTS_REQUEST });
    const { data } = await axios.get(`/api/players/allChangeRequests`);
    dispatch({ type: GET_CHANGE_REQUESTS_SUCCESS, payload: data });
    
    
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CHANGE_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeChangeRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CHANGE_REQUEST_REQUEST });
    const { data } = await axios.post(`/api/players/removeChangeRequest`, {
      id
    });
    dispatch({ type: REMOVE_CHANGE_REQUEST_SUCCESS });
    
    
  } catch (error) {
    console.log(error);
    dispatch({
      type: REMOVE_CHANGE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


