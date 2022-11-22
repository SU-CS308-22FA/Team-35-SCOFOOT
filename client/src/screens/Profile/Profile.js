import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MainScreen from "../../components/MainScreen";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, deleteUser } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const Profile = () => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profile_pic, setProfile_pic] = useState("");
	const [picMessage, setPicMessage] = useState();

	const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, error, success } = userUpdate;

	const userDelete = useSelector((state) => state.userDelete);
	const { loadingUserDelete, errorUserDelete, successUserDelete } = userDelete;

	useEffect(() => {
		if (!userInfo) {
			navigate("/");
		} else {
			setName(userInfo.name);
			setSurname(userInfo.surname);
			setEmail(userInfo.email);
			setProfile_pic(userInfo.profile_pic)
		}
	}, [navigate, userInfo]);

	const postDetails = (pics) => {
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
		  const data = new FormData();
		  data.append("file", pics);
		  data.append("upload_preset", "cs308tff");
		  data.append("cloud_name", "dgmg4b0wl");
		  fetch("https://api.cloudinary.com/v1_1/dgmg4b0wl/image/upload", {
			method: "post",
			body: data,
		  })
			.then((res) => res.json())
			.then((data) => {
			  setProfile_pic(data.url.toString());
			  console.log(profile_pic);
			})
			.catch((err) => {
			  console.log(err);
			});
		} else {
		  return setPicMessage("Please Select an Image");
		}
	  };

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateProfile({ name, surname, email, password }));
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

	return (
		<MainScreen title="My Account">
			<div>
				
				<Row className="profileContainer">
					<Col md={6}>My Information</Col>
					<Col
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}>
					</Col>
						
					<Col md={6}>
						<Form onSubmit={submitHandler}>
							{loading && <Loading />}
							{success && (
								<ErrorMessage variant="success">
									Updated Successfully
								</ErrorMessage>
							)}
							{error && (
								<ErrorMessage variant="danger">
									{error}
								</ErrorMessage>
							)}
							{loadingUserDelete && <Loading />}
							{successUserDelete && (
								<ErrorMessage variant="success">
									Updated Successfully
								</ErrorMessage>
							)}
							{errorUserDelete && (
								<ErrorMessage variant="danger">
									{errorUserDelete}
								</ErrorMessage>
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
							<Form.Label>Profile type</Form.Label>
							<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
								
								
								<ToggleButton id="tbg-radio-1" value={1}>
								Player
								</ToggleButton>
								<ToggleButton id="tbg-radio-2" value={2}>
								Scout
								</ToggleButton>
								<ToggleButton id="tbg-radio-3" value={3}>
								Manager
								</ToggleButton>
								
							</ToggleButtonGroup>

							<Form.Group controlId="password">
								<Form.Label>Change Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter New Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId="confirmPassword">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								></Form.Control>
							</Form.Group>{""} 
							{/*
							{picMessage && (
                			<ErrorMessage variant="danger">{picMessage}</ErrorMessage>
             				 )}
							<Form.Group controlId="profile_pic">
								<Form.Label>Change Profile Picture</Form.Label>

								<Form.File
								
									onChange= {(e) =>postDetails(e.target.files[0])}
									id= "custom-file"
									type="image/png"
									label ="Select Your Profile Photo"
									custom
								/>
							<img src={profile_pic} alt={name} className="profilePic" />
							
							</Form.Group>
							*/}
							<Row>
							<Col md={12}>
								<Button sx={{ mt: 2, mb: 2, mr: 2}} variant="contained" color="primary" type="submit" varient="primary">
									Update
								</Button>
								<Button sx={{ mt: 2, mb: 2}} variant="contained" color="error" onClick={handleClickOpen}>
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
