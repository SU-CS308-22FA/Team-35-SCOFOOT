import React, {useEffect, useState} from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import UserAccountInfo from "../../screens/UserProfilePage/account-info-user";
import UserAboutMe from "../../screens/UserProfilePage/about-user";
import UserPosts from "../../screens/UserProfilePage/posts-user";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUserById } from "../../actions/userActions";

function UserProfilePage() {
 const location = useLocation();

 const {_id} = location.state ;
 console.log(_id);
 
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const otherUser = useSelector((state)=> state.otherUser);
 const {userData} = otherUser;
 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;
 
 const [user, setUser] = useState({});


 useEffect(()=> {
    dispatch(getUserById(_id));
  }, [_id]);

  useEffect(()=> {
    dispatch(getCurrentUser(userInfo._id));
    dispatch(getUserById(_id));
  }, []);

 
  useEffect(() => {
    setUser(userData);
  }, [userData])

  

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ mb: 3 }} variant="h4">
            User Profile
          </Typography>
          
           
        {user ?
        <Grid container spacing={1}> <Grid item lg={4} md={10} xs={12}>
              <UserAccountInfo data = {user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <UserAboutMe data = {user} />
            </Grid>
           
            <Grid item lg={8} md={6} xs={12}>
              <UserPosts data = {user} />
            </Grid>
            
          </Grid>:
            <p> Loading</p>
            }

            
        </Container>
      </Box>
    </>
  );
}

export default UserProfilePage;
