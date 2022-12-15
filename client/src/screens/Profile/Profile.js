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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
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
import axios from "axios";
import { Typography } from "@mui/material";

const Profile = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      setImage(userInfo.image);
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
        image,
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

  // const handleImage = async (e) => {
  //   const file = e.target.files[0];
  //   let formData = new FormData();
  //   formData.append("image", file);
  //   // console.log;([...formData]);
  //   setUploading(true);
  //   try {
  //     const { data } = await axios.post("/upload-image", formData);
  //     //console.log("Image Upload",data);
  //     setUploading(false);
  //     setImage({
  //       url: data.url,
  //       public_id: data.public_id,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
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
          <Col md={6}>My Information</Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Col>

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
              <Form.Group controlId="pic">
                <Form.Label>Pic</Form.Label>
                <Form.Control
                  type="pic"
                  placeholder="Enter Pic"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="profile_type">
                <Form.Label>Account Type</Form.Label>
                <Form.Control
                  disabled
                  type="profile_type"
                  placeholder="Please Select Account Type"
                  value={profile_type}
                  onChange={(e) => setProfile_type(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <ToggleButtonGroup type="radio" name="options">
                <ToggleButton
                  style={{ mt: 10 }}
                  id="Player"
                  name="Player"
                  value={"Player"}
                  onChange={(e) => setProfile_type(e.target.value)}
                  checked
                >
                  Player
                </ToggleButton>
                <ToggleButton
                  style={{ mt: 10 }}
                  id="Scout"
                  name="Scout"
                  value={"Scout"}
                  onChange={(e) => setProfile_type(e.target.value)}
                >
                  Scout
                </ToggleButton>
                <ToggleButton
                  style={{ mt: 10 }}
                  id="Manager"
                  name="Manager"
                  value={"Manager"}
                  onChange={(e) => setProfile_type(e.target.value)}
                >
                  Manager
                </ToggleButton>
              </ToggleButtonGroup>

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

              {/* <Form.Group controlId="image">
                <Form.Label>Change Image</Form.Label>
              </Form.Group> */}
              {/* {selectedImage && (
                <div>
                  <img
                    alt="not fount"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                  <button
                    onClick={() => setPic(URL.createObjectURL(selectedImage))}
                  >
                    Save
                  </button>
                </div>
              )}
              <br />

              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              /> */}

              <img src={pic} className="profilePic" />

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
