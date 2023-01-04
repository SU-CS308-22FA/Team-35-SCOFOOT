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

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, postInfo: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postGetReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_GET_REQUEST:
      return { loading: true };
    case POST_GET_SUCCESS:
      return { loading: false, postInfo: action.payload };
    case POST_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const allPostsGetReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_POSTS_GET_REQUEST:
      return { loading: true };
    case ALL_POSTS_GET_SUCCESS:
      return { loading: false, post: action.payload };
    case ALL_POSTS_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const allPostssReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_POSTS_SUCCESS:
      return { postsData: action.payload };
    case ALL_POSTS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
