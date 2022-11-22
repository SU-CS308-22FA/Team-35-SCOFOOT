import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";

const theme = createTheme();

export default function SignUp() {
	const [name, setName] = useState("");
	const [picMessage, setPicMessage] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profile_pic,setProfile_pic] = useState("");
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
		useState("");
	const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
		useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate("/profile");
		}
	}, [navigate, userInfo]);

	const onConfirmPasswordEnd = (e) => {
		if (password !== confirmPassword) {
			setConfirmPasswordErrorMessage("Does not match with the password.");
			setIsConfirmPasswordInvalid(true);
		} else {
			setConfirmPasswordErrorMessage("");
			setIsConfirmPasswordInvalid(false);
		}
	};

	const onConfirmPasswordFocus = (e) => {
		setConfirmPasswordErrorMessage("");
		setIsConfirmPasswordInvalid(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(register(name, surname, email, password, profile_pic));
	};

	const postDetails = (profile_pic) => {
		if(!profile_pic){
			return setPicMessage("Please Select an Image");
		}
		setPicMessage (null)

		if(profile_pic.type === "image/png" || profile_pic.type === "image/jpeg"){
			const data = new FormData();
			data.append('file',profile_pic)
			data.append("upload_preset","cs308tff")
			data.append("cloud_name","dgmg4b0wl")
			fetch("https://api.cloudinary.com/v1_1/dgmg4b0wl/image/upload", {
				method: "post",
				body: data,
			}).then((res) =>res.json()).then((data)=>{
				console.log();
				setProfile_pic(data.url.toString());
			})
			.catch((err)=>{
				console.log(err);
			});
		}	else {
			return setPicMessage("Please Select an Image")
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>

							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									value={surname}
									onChange={(e) => setSurname(e.target.value)}
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									validate
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									helperText={confirmPasswordErrorMessage}
									value={confirmPassword}
									error={isConfirmPasswordInvalid}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									onBlur={(e) =>
										onConfirmPasswordEnd(e.target)
									}
									onFocus={(e) =>
										onConfirmPasswordFocus(e.target)
									}
								/>
							</Grid>

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
							</Form.Group>
						</Grid>
						<Box
						>
							<Paper>
								<Box 
									textAlign="center"
									color="red"
								>
								{error && error}
								</Box>
							</Paper>

						</Box>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
