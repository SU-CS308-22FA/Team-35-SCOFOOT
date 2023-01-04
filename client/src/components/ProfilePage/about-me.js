import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { Form, Row, Col, Container } from "react-bootstrap";
import {
  updateProfile,
  deleteUser,
  sendRequest,
  changeIsSent,
} from "../../actions/userActions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import {
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Card } from "react-bootstrap";
import green from "@material-ui/core/colors/green";
import EditIcon from "@mui/icons-material/Edit";

function AboutMe() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [EditAboutme, setEditAboutMe] = useState(false);

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
      setAboutMe(userInfo.aboutme);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        surname,
        email,
        aboutme,
        password,
        profile_type,
        pic,
      })
    );
    setEditAboutMe(!EditAboutme);
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
  const editcomponent = () => {
    setEditAboutMe(!EditAboutme);
  };

  const handleSaveButton = () => {
    setEditAboutMe(!EditAboutme);
    submitHandler();
  };

  return (
    <div>
      <Card>
        <CardHeader style={{ display: "flex" }} title={"About Me"} />

        <Divider />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col md={12}>
            {!EditAboutme && <Typography>{aboutme}</Typography>}

            {EditAboutme && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="aboutme">
                  <Form.Control
                    type="text"
                    placeholder="No About Me Info"
                    value={aboutme}
                    onChange={(e) => setAboutMe(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col md={12}>
                    <Button
                      sx={{ mt: 2, mb: 2, mr: 2 }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      varient="primary"
                    >
                      SAVE
                    </Button>
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 10.7,
                      }}
                    ></Box> */}
                  </Col>
                </Row>
              </Form>
            )}
          </Col>
        </CardContent>
        {/* {!EditAboutme && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 21,
            }}
          ></Box>
        )} */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!EditAboutme && (
            <Button
              size="large"
              onClick={() => setEditAboutMe(!EditAboutme)}
              startIcon={<EditIcon />}
            ></Button>
          )}
        </Box>
      </Card>
    </div>
  );
}

export default AboutMe;
