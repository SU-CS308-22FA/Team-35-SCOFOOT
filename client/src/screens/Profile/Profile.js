import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MainScreen from "../../components/MainScreen";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  deleteUser,
  sendRequest,
  changeIsSent,
} from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "../../screens/VerificationRequests/verification.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aboutme, setAboutMe] = useState("");

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
        password,
        aboutme,
        profile_type,
        pic,
      })
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

  return (
    <MainScreen title="ACCOUNT SETTINGS">
      {verified && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <VerifiedUserIcon />
        </div>
      )}
      {!verified && !isSent && (
        <button
          className="request-btn"
          onClick={() => sendVerificationRequest(userInfo.email)}
        >
          Send Verification Request
        </button>
      )}

      {!verified && isSent && <p> Verification Request Is Sent</p>}

      <div>
        <Row className="profileContainer">

          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {loadingUserDelete && <Loading />}
              {successUserDelete && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {errorUserDelete && (
                <ErrorMessage variant="danger">{errorUserDelete}</ErrorMessage>
              )}

              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="surname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/*
							{picMessage && (
								<ErrorMessage variant="danger">{picMessage}</ErrorMessage>
							)}
							<Form.Group controlId="pic">
								<Form.Label>Profile Picture</Form.Label>
								<Form.File
								onChange={(e) => postDetails(e.target.files[0])}
								id="custom-file"
								type="image/png"
								label="Upload Profile Picture"
								custom
								/>
							</Form.Group>*/}

              <Form.Group controlId="password">
                <Form.Label>Change Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Update
                  </Button>
                  <Button
                    sx={{ mt: 2, mb: 2 }}
                    variant="contained"
                    color="error"
                    onClick={handleClickOpen}
                  >
                    Delete Account
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Delete account?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the account?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={deleteUserHandler} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Profile;
