import axios from "axios";
import {
  POST_CREATE_REQUEST,
  POST_CREATE_FAIL,
  POST_CREATE_SUCCESS,
  POST_GET_SUCCESS,
  POST_GET_REQUEST,
  POST_GET_FAIL,
  ALL_POSTS_GET_SUCCESS,
  ALL_POSTS_GET_REQUEST,
  ALL_POSTS_GET_FAIL,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
} from "../constants/postConstants";

export const createpost = (postedById, text, photo) => async (dispatch) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });
    console.log("hiiiii");
    const { data } = await axios.post("/api/posts/createpost", {
      postedById,
      text,
      photo,
    });
    console.log(data);
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });

    localStorage.setItem("postInfo", JSON.stringify(data));
  } catch (error) {
    console.log("error");
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allPostsGet = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_POSTS_GET_REQUEST });
    const { data } = await axios.get(`/api/posts/feed`);

    dispatch({ type: ALL_POSTS_GET_SUCCESS, payload: data });

    localStorage.setItem("allPosts", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ALL_POSTS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postGet = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_GET_REQUEST });
    const { data } = await axios.get(`/api/posts/userposts?id=${id}`);
    dispatch({ type: POST_GET_SUCCESS, payload: data });
    localStorage.setItem("postInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const seeAllPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/allPosts");
    dispatch({ type: ALL_POSTS_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ALL_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
