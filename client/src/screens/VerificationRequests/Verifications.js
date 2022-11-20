import React, { useState, useEffect } from "react";
import Request from '../../screens/VerificationRequests/Verification'
import '../../screens/VerificationRequests/verification.css'
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { deleteVerificationRequest } from "../../actions/userActions";

const Verifications = () => {


  const verificationInbox = useSelector((state) => state.seeVerification);
	const { error, RequestInfo } = verificationInbox; // requestInfo butun mesajlar
  const [requests, setRequests] = useState(RequestInfo);
  const [isEmpty, setEmpty ] = useState(false);

  useEffect(() => {
		setRequests(RequestInfo);
    if(requests?.length === 0){
      setEmpty(true);
    }
	}, [RequestInfo]);
  
  const dispatch = useDispatch();

  const removeRequest = (id) => {
    dispatch(deleteVerificationRequest({id}));
  }

  console.log(requests);
  
    return (
        <section>
          <div className="title">
            <h2>Verification Requests</h2>
            <div className="underline"></div>
          </div>
          <div>
            {isEmpty? (<p> no request</p>) : (requests?.map((single) => {
              return <Request key = {single._id}{...single} removeRequest={removeRequest} />;
            }))}

            
          </div>
        </section>
      );
   
};
export default Verifications;

    


