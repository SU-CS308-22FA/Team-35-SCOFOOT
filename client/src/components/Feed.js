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
import { seeAllPosts } from "../actions/postActions";
import { set } from "mongoose";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);

  const getPosts = useSelector((state) => state.getFeedPosts);
  const { loading, error, allPosts } = getPosts;

  // useEffect(() => {
  //   setPosts(seeAllPosts(allPosts));
  // }, [allPosts]);

  // useEffect(() => {
  //   if (allPosts) {
  //     setPosts(allPosts);
  //   }
  // }, [allPosts]);

  // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
              src={
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
            />
          </Grid>
          <Grid item xs={9}>
            <Typography color="textPrimary" gutterBottom>
              {/* {`${name} ${surname}`} */}
              name surname
            </Typography>
            {/* <Typography color="textSecondary" variant="body2">
              {profile_type}
            </Typography> */}
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
            <Typography color="textPrimary">
              post text here!!!!!!!!!!
            </Typography>
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
          <img src="" />
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
            12
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
            5
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
  );
};

export default Feed;
