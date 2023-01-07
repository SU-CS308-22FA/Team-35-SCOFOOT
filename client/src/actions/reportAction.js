import axios from "axios";
import {
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_SUCCESS,
  REPORT_GET_SUCCESS,
  REPORT_GET_REQUEST,
  REPORT_GET_FAIL,
  ALL_REPORTS_GET_SUCCESS,
  ALL_REPORTS_GET_REQUEST,
  ALL_REPORTS_GET_FAIL,
  ALL_REPORTS_SUCCESS,
  ALL_REPORTS_FAIL,
  ALL_REPORTS_REQUEST,
} from "../constants/reportConstants";

export const createreport = (postedById, text, selectedOption) => async (dispatch) => {
    try {
      
      dispatch({ type: REPORT_CREATE_REQUEST });
      console.log("hiiiii");
      const { data } = await axios.post("/api/reports/createreport", {
        postedById,
        text,
        selectedOption,
      });
      
      console.log(data);
      dispatch({ type: REPORT_CREATE_SUCCESS, payload: data });
      
      localStorage.setItem("reportInfo", JSON.stringify(data));
    } catch (error) {
      console.log("error");
      dispatch({
        type: REPORT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const reportGet = (id) => async (dispatch) => {
    try {
      dispatch({ type: REPORT_GET_REQUEST });
      const { data } = await axios.get(`/api/report/userreports?`);
      dispatch({ type: REPORT_GET_SUCCESS, payload: data });
      localStorage.setItem("reportInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: REPORT_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const allReportsGet = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_REPORTS_REQUEST });
  
      console.log("ACTIONS");
      const { data } = await axios.get("/api/report/feed"); //feed'i değiştir
      console.log("ACTION POSTS HERE!1");
      console.log(data);
      console.log("ACTION POSTS HERE!2");
  
      dispatch({ type: ALL_REPORTS_SUCCESS, payload: data });
      localStorage.setItem("allReportsInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: ALL_REPORTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  