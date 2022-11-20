import React, { useState } from 'react';

const Request = ({ _id, name, surname, email, removeRequest }) => {
  
  let nameAndsurname = name.concat(" ");
  nameAndsurname = nameAndsurname.concat(surname);
  console.log(name);
  return (
    <article className="single-tour">
      <footer>
        <div className="tour-info">
          <h4>{nameAndsurname}</h4>
        </div>
        <p> {email} </p>

        <button className="delete-btn" onClick={() => removeRequest(_id)}>
          Decline
        </button>
      </footer>
    </article>
  );
};

export default Request;