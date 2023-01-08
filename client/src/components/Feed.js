import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { allPostsGet } from "../actions/postActions";
import { set } from "mongoose";


const Feed = () => {
  const posts2 = [
    { name: "John ", surname: "Doe", text: "post text", photo: "" },
    { name: "Victor ", surname: "Wayne", text: "post text", photo: "" },
    { name: "Jane ", surname: "Doe", text: "post text", photo: "" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [success, setSuccess] = useState(false);

  const getPosts = useSelector((state) => state.allPostsGet);
  const { loading, error, postsInfo } = getPosts;



  // useEffect(() => {
  //   setPosts(getFeedPosts(allPosts));
  // }, [allPosts]);

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const connections = []
  const [user, setUser] = useState({});
  <>
      {user?.following_approved?.map((person) => {
        const { _id, name, surname,email, pic } = person;
        return (
          <article key={_id} className='person'>  
            <div> 
              connections.push({name});
            </div>
          </article>
        );
      })}
  </>
const checkConnect = "g";
const checkConnec = "ruya"; 
function checkConnection(connections, post) {
  const exists = connections.some((connection) => connection.name === post.name);
  if (exists) {return true;} else {return false;}
}

  


return (
  <Card>
    {posts && (
      <Card>
        {posts.reverse().map((post) => (
          <Card>
            {/* Ternary statement goes here */}
            {checkConnect == post.name || checkConnec == post.name ? (
              <Grid>
                <Box
                  sx={{
                    flexGrow: 1,
                    py: 1,
                  }}
                ></Box>
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
                      src={
                        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      }
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography color="textSecondary">
                      {`${post.name} ${post.surname}`}
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

              <Grid container spacing={0}>
                <Grid item xs={0.55}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={9}>
                  <img src={post.photo} />
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
              </Grid>
            ) : null}
          </Card>
        ))}
      </Card>
    )}
  </Card>
);}

export default Feed;
