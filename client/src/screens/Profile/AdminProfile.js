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
import { updateProfile, deleteUser, seeVerificationRequest } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import InboxIcon from '@mui/icons-material/Inbox';
import IconButton from '@mui/material/IconButton';


const Profile = () => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin; // userlogin.userInfo

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
		}
	}, [navigate, userInfo]);

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


    const handleInputClick = () => {
        dispatch(seeVerificationRequest());
        navigate("/verification", {replace:true}) ;
    }


	return (
		<MainScreen title="EDIT PROFILE">
            

            <div style={{ display: "flex", justifyContent: 'flex-end'}}>

            <IconButton aria-label="input" onClick={handleInputClick}>
                 <InboxIcon />
            </IconButton>

            </div>
			<div>
				<Row className="profileContainer">
					<Col md={12}>
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
							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter Password"
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
							</Form.Group>
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
