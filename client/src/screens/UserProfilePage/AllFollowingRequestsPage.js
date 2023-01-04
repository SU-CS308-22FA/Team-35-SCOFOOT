import React, { useState, useEffect } from "react";
import FRequest from '../../screens/UserProfilePage/SingleRequest'
import '../../screens/VerificationRequests/verification.css'
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { approveFollowingRequest, deleteFollowingRequest, seeAllFollowingRequests } from "../../actions/userActions";


const Requests = () => {


  //const requestsInbox = useSelector((state) => state.seeFollowingRequests);
  //const { followingRequestsInfo } = requestsInbox; // all requests of the user

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [requests, setRequest] = useState(null);
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeRequest = (user_id, data_id) => {
    //console.log(_id);
    dispatch(deleteFollowingRequest(user_id, data_id));
    
  }

  const approveRequest = (user_id, data_id) => {
    //console.log(_id);
    dispatch(approveFollowingRequest(user_id, data_id));
    
  }

  useEffect(() => {
    console.log(userInfo._id);
    dispatch(seeAllFollowingRequests(userInfo._id));
    setRequest(userInfo.following_request_waiting);
  }, [userInfo, navigate])


  
    return (
        <section>
          <div className="title">
            <h2>Following Requests</h2>
            <div className="underline"></div>
          </div>
          <div>
            { requests && (requests?.map((single) => {
              return <FRequest key = {single._id}{...single} removeRequest={removeRequest} approveRequest = {approveRequest} />;
            }))}

            
          </div>
        </section>
      );
   
};
export default Requests;

    


