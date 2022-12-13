import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import {
  updateProfile,
  deleteUser,
  sendRequest,
  changeIsSent,
} from "../../actions/userActions";
import green from "@material-ui/core/colors/green";
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

function AccountInfo() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const [picMessage, setPicMessage] = useState("");
  const [profile_type, setProfile_type] = useState("");
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const { loadingUserDelete, errorUserDelete, successUserDelete } = userDelete;

  const verified = userInfo.isVerified;
  const isSent = userInfo.isRequestSent;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setEmail(userInfo.email);
      setProfile_type(userInfo.profile_type);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({ name, surname, email, password, profile_type, pic })
    );
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendVerificationRequest = (email) => {
    console.log(email);
    dispatch(sendRequest(email));
    dispatch(changeIsSent(email));
  };

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

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            verified && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <VerifiedUserIcon style={{ color: "green" }} />
              </div>
            )
          }
        />
        <CardContent>
          {!verified && (
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
              {...stringAvatar(`${name} ${surname}`)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            ></Box>
            <Typography color="textPrimary" gutterBottom variant="h5">
              {`${name} ${surname}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {profile_type}
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
        <CardActions>
          <Button color="primary" fullWidth variant="text" href="/profile">
            Account Settings
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default AccountInfo;
