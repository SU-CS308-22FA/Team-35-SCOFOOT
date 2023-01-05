
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentUser, removeFollowedUser } from '../../actions/userActions';

import '../../components/ProfilePage/connections.module.css';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function List() {
     const location = useLocation();
     const dispatch = useDispatch();
     const {_id} = location.state ;
     const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [user, setUser] = useState({});

    useEffect(()=> {
        dispatch(getCurrentUser(userInfo._id));
      }, []);

      useEffect(() => {
        setUser(userInfo);
      }, [userInfo])

      const deleteFromFollowing = (user_id, data_id) => {
        dispatch(removeFollowedUser(user_id, data_id));
      }

 
    
  return (
    <>
    <section className='container'>
      {user?.following_approved?.map((person) => {
        const { _id, name, surname,email, pic } = person;
        return (
          <article key={_id} className='person'>
            <img src={pic} alt={name} />
            <div>
              <h4>{name.concat(" ", surname)}</h4>
              
              <p>{email} </p>
            </div>
            <Button onClick={() => deleteFromFollowing(user._id, _id)}> <PersonRemoveIcon/> </Button>
          </article>
        );
      })}
      </section>
    </>
  );
};

export default List;

