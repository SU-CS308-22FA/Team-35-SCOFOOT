import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createpost } from "../../actions/postActions";
import { set } from "mongoose";
import ErrorMessage from "../../components/ErrorMessage";

const PostShare = () => {
  const [postText, setPostText] = useState("");
  const [postPic, setPostPic] = useState("");
  const [sharedPost, setSharedPost] = useState(false);
  const [photoWanted, setPhotoWanted] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profile_type, setProfile_type] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const [postedById, setPostedById] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, postInfo, error } = postCreate;

  useEffect(() => {
    if (postInfo) {
      setText("");
      setPhoto("");
    }
  }, [navigate, postInfo]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setProfile_type(userInfo.profile_type);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  //handle and convert to base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFiletoBase(file);
    console.log(file);
  };
  const setFiletoBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("here1");
    reader.onloadend = () => {
      setPostedById(userInfo._id);
      setPostPic(reader.result);
      setPhoto(reader.result);
      console.log("here2");
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createpost(postedById, text, photo));
    setSharedPost(!sharedPost);
  };

  return (
    <Card>
      <Form onSubmit={submitHandler}>
        {success && <ErrorMessage variant="success">Post Shared!</ErrorMessage>}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              py: 1.5,
            }}
          ></Box>
          <Grid container spacing={0}>
            <Grid item xs={0.5}></Grid>

            <Grid item xs={1}>
              <Avatar
                sx={{
                  height: 45,
                  width: 45,
                }}
                src={pic}
              />
            </Grid>
            <Grid item xs={9}>
              {" "}
              <Form.Group controlId="postshare">
                <Form.Control
                  type="text"
                  placeholder="What's happening?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              py: 1,
            }}
          ></Box>
          <Grid container spacing={0}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={9}>
              <Typography color="textSecondary" variant="body2">
                Add Image:
              </Typography>
              <Form.Group>
                <input type="file" name="postPic" onChange={handleImage} />
              </Form.Group>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}></Grid>

            <Grid item xs={2}>
              <Button
                sx={{ mt: 2, mb: 2, mr: 2 }}
                variant="contained"
                color="primary"
                type="submit"
                varient="primary"
              >
                SHARE
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Row>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={9}>
            {<Typography>{text}</Typography>}
            {/* {<Typography>{postedById}</Typography>} */}
          </Grid>
        </Row>
        <Grid>
          <Box
            sx={{
              flexGrow: 1,
              py: 1,
            }}
          ></Box>
        </Grid>
        <Row>
          <Grid item xs={1.5}>
            {sharedPost && console.log({ postPic })}
            {sharedPost && console.log({ postText })}
          </Grid>
          <Grid item xs={9}>
            {<img src={photo} className="postPic" />}
          </Grid>
          <Box></Box>
        </Row>
      </Form>
    </Card>
  );
};

export default PostShare;
