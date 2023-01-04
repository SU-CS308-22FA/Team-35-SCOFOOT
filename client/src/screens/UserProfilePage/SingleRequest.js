import React from 'react';
import {  useSelector } from "react-redux";


const FRequest = ({ _id, name, surname, email, removeRequest , approveRequest }) => {
  console.log(name);
  let nameAndsurname = name.concat(" ");
  nameAndsurname = nameAndsurname.concat(surname);
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  return (
    <article className="single-tour">
      <footer>
        <div className="tour-info">
          <h4>{nameAndsurname}</h4>
        </div>
        <p> {email} </p>
         
         <button className="approve-btn" onClick={() => approveRequest(userInfo._id,_id)}>
          Approve
        </button>

        <button className="delete-btn" onClick={() => removeRequest(userInfo._id, _id)}>
          Decline
        </button>
         
        
      </footer>
    </article>
  );
};

export default FRequest;