import React, { useState, useEffect } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "../../screens/VerificationRequests/verification.css";
import {
  Typography,
  Card,
  Box,
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
} from "@mui/material";
import { sendFollowingRequest } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function AccountInfoUser({data}) {
  console.log(data);
  const dispatch = useDispatch();
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    var splittedName = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        splittedName.length >= 2
          ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
          : name[0],
    };
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userInfo);
    
  }, [userInfo]);

  

  /* function deleteRequest(){
     dispatch(deleteFollowingRequest(user._id, data._id));

  } */

  const sendRequest = () =>  {
    //console.log(_id);
    dispatch(sendFollowingRequest(user._id, data._id));
    
  }
  

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            data.isVerified && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <VerifiedUserIcon style={{ color: "green" }} />
              </div>
            )
          }
        />
        <CardContent>
          {!data.isVerified && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            ></Box>
          )}

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                height: 100,
                width: 100,
              }}
              {...stringAvatar(`${data.name} ${data.surname}`)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            ></Box>
            <Typography color="textPrimary" gutterBottom variant="h5">
              {`${data.name} ${data.surname}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {data.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {data.profile_type}
            </Typography>

            <Typography color="textSecondary" variant="body2">
              {user && !(user?.following_sent?.includes(data._id)) && !(user?.following_approved?.includes(data._id)) && 
              <Button onClick={() => sendRequest()}>
                  <PersonAddIcon/> 
              </Button> }
              {user && (user?.following_sent?.includes(data._id)) && !(user?.following_approved?.includes(data._id)) && <p> Following Request Already Sent</p> }

              {user && (user?.following_approved?.includes(data._id)) && <p> You follow the user</p>}


              
               
              
              
            </Typography>

          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 5,
          }}
        ></Box>
        <Divider />
        
      </Card>
    </div>
  );
}

export default AccountInfoUser;
