import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
} from "@mui/material";


import { Link } from "react-router-dom";

const Post = ({ posts, updatePost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ comments: [] });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comment, setComment] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      const currentPost = posts.find((post) => post.id === parseInt(id));

      if (currentPost) {
        setPost(currentPost);
        setTitle(currentPost.title);
        setContent(currentPost.content);
        setImageUrl(currentPost.image_url);
      } else {
        navigate("/");
      }
    }
  }, [id, posts, navigate]);

  const handleUpvote = () => {
    const updatedPost = { ...post, upvotes: post.upvotes + 1 };
    updatePost(updatedPost);
    setPost(updatedPost);
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/");
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedPost = {
      ...post,
      title,
      content,
      image_url: imageUrl,
    };
    updatePost(updatedPost);
    setPost(updatedPost);
    setShowEditForm(false);
  };

  const handleComment = (event) => {
    event.preventDefault();
    if (!comment) return;
    const updatedComments = [...(post.comments || []), { text: comment }];
    const updatedPost = { ...post, comments: updatedComments };
    setComment("");
    updatePost(updatedPost);
    setPost(updatedPost);
    window.location.reload(); 
  };

  return (
    <Paper sx={{ padding: "20px" }}>
      <Typography variant="subtitle1">
        Posted on: {new Date(post.created_at).toLocaleString()}
      </Typography>
      <Typography variant="h2">{post.title}</Typography>
      <Typography variant="body1">{post.content}</Typography>
      <Typography variant="body2">
        👍 {post.upvotes} Upvotes
      </Typography>
      {post.image_url && (
        <img src={post.image_url} width={400} alt={post.title} />
      )}
      <hr />
      <Button variant="outlined" onClick={handleUpvote}>
        Upvote
      </Button>
      <Button variant="outlined" onClick={() => setShowEditForm(true)}>
        Edit Post
      </Button>
      <Button variant="outlined" onClick={handleDelete}>
        Delete Post
      </Button>
      <hr />
      {showEditForm && (
        <>
          <h3>Edit Post</h3>
          <Box
            onSubmit={handleUpdate}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" }, // Modify the width as per your preference
            }}
            noValidate
            autoComplete="off"
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <br />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              style={{ width: "100%", height: "200px" }} // Modify the width and height as per your preference
            />{" "}
            <br />
            <label htmlFor="image-url">Image URL:</label>
            <input
              type="url"
              id="image-url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              style={{ width: "100%" }} // Modify the width as per your preference
            />{" "}
            <br />
            <button type="submit">Update Post</button>
            <button onClick={() => setShowEditForm(false)}>Cancel</button>
          </Box>
          <hr />
        </>
      )}

<hr />
      <Box sx={{ backgroundColor: "#fcfcfc", padding: "10px", marginTop: "20px" }}>
        <Typography variant="h5">Comments</Typography>
        <ul>
          {post.comments &&
            post.comments.map((comment, index) => {
              const jsonString = comment;
              const commentObj = JSON.parse(jsonString);
              return (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{ padding: "10px", marginBottom: "10px" }}
                >
                  <Typography variant="body1">{commentObj.text}</Typography>
                </Paper>
              );
            })}
        </ul>
      </Box>
      <form onSubmit={handleComment}>
        <TextField
          type="text"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          fullWidth
          label="Add Comment"
        />
        <Button type="submit" variant="outlined" sx={{ marginTop: "10px" }}>
          Add Comment
        </Button>
      </form>
      <hr />
      <Link to="/">Back to Home</Link>
    </Paper>
  );
};

export default Post;
