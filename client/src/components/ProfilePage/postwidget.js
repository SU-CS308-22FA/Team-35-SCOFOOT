import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { allPostsGet } from "../../actions/postActions";
const PostWidget = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profile_type, setProfile_type] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [posts, setPosts] = useState(null);
  const [success, setSuccess] = useState(false);

  const getPosts = useSelector((state) => state.allPostsGet);
  const { loading, error, postsInfo } = getPosts;

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

  useEffect(() => {
    if (!postsInfo) {
      console.log("FEED1");
      dispatch(allPostsGet());
    }
  }, [navigate]);

  useEffect(() => {
    if (postsInfo) {
      setPosts(postsInfo);
      console.log("SET");
      console.log(postsInfo);
    }
  }, [postsInfo]);

  useEffect(() => {
    dispatch(allPostsGet());
  }, []);

  //handle and convert to base 64

  return (
    <Card>
      {posts && (
        <Card>
          {posts.reverse().map((post) => (
            <Card>
              {post.postedById == userInfo._id && (
                <Card>
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
                        <Typography color="textPrimary" gutterBottom>
                          {`${name} ${surname}`}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {profile_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        py: 1.5,
                      }}
                    ></Box>

                    <Grid container spacing={0}>
                      <Grid item xs={0.55}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Typography color="textPrimary">{post.text}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Grid>
                    <Box
                      sx={{
                        flexGrow: 1,
                        py: 1,
                      }}
                    ></Box>
                  </Grid>
                  <Row>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={9}>
                      <img src={post.photo} />
                    </Grid>
                    <Box></Box>
                  </Row>
                  <Grid>
                    <Box
                      sx={{
                        flexGrow: 1,
                        py: 1,
                      }}
                    ></Box>
                  </Grid>

                  <Grid container spacing={0}>
                    <Grid item xs={1.55}></Grid>
                    <Grid item xs={0.3}>
                      <FavoriteBorderIcon></FavoriteBorderIcon>
                    </Grid>
                    <Grid item xs={0.2}>
                      <Box
                        sx={{
                          flexGrow: 1,
                          py: 0.17,
                        }}
                      ></Box>
                      <Typography color="textSecondary" variant="body2">
                        0
                      </Typography>
                    </Grid>
                    <Grid item xs={0.2}></Grid>
                    <Grid item xs={0.3}>
                      <CommentIcon></CommentIcon>
                    </Grid>
                    <Grid item xs={0.2}>
                      <Box
                        sx={{
                          flexGrow: 1,
                          py: 0.17,
                        }}
                      ></Box>
                      <Typography color="textSecondary" variant="body2">
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        flexGrow: 1,
                        py: 1,
                      }}
                    ></Box>
                  </Grid>
                </Card>
              )}
            </Card>
          ))}
        </Card>
      )}
    </Card>
  );
};

export default PostWidget;
