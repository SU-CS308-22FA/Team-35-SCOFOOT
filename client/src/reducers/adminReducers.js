import { 
  GENERATE_VERIFICATION_CODE_FAIL,
  GENERATE_VERIFICATION_CODE_REQUEST,
  GENERATE_VERIFICATION_CODE_SUCCESS,
  GET_VERIFICATION_CODE_FAIL,
  GET_VERIFICATION_CODE_REQUEST,
  GET_VERIFICATION_CODE_SUCCESS 
} from "../constants/adminConstants";



export const generateVerificationCodeReducer = (state = {}, action) => {
    switch (action.type) {
      case GENERATE_VERIFICATION_CODE_REQUEST:
        return { loading: true };
      case GENERATE_VERIFICATION_CODE_SUCCESS:
        return { loading: false, verificationCodes: action.payload };
      case GENERATE_VERIFICATION_CODE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

export const getVerificationCodesReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_VERIFICATION_CODE_REQUEST:
        return { loading: true };
      case GET_VERIFICATION_CODE_SUCCESS:
        return { loading: false, teamsAndVerificationCodes: action.payload };
      case GET_VERIFICATION_CODE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
};