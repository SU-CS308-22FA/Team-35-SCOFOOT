import React, { useState, useEffect } from "react";
import Request from '../../screens/VerificationRequests/Verification'
import '../../screens/VerificationRequests/verification.css'
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { deleteVerificationRequest } from "../../actions/userActions";

const Verifications = () => {


  const verificationInbox = useSelector((state) => state.seeVerification);
	const { error, RequestInfo } = verificationInbox; // requestInfo butun mesajlar
  


  
  
  const dispatch = useDispatch();

  const removeRequest = (_id) => {
    //console.log(_id);
    dispatch(deleteVerificationRequest(_id));
    
  }


  
    return (
        <section>
          <div className="title">
            <h2>Verification Requests</h2>
            <div className="underline"></div>
          </div>
          <div>
            {(RequestInfo?.map((single) => {
              return <Request key = {single._id}{...single} removeRequest={removeRequest} />;
            }))}

            
          </div>
        </section>
      );
   
};
export default Verifications;

    


