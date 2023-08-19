import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const PostList = ({ posts }) => {
  const [sortType, setSortType] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === "upvotes") {
      return b.upvotes - a.upvotes;
    } else {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    }
  });
  

  const filteredPosts = sortedPosts.filter(
    (post) =>
      post &&
      post.title &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function getHumanReadableDate(createdAt) {
    const postedAt = new Date(Date.parse(createdAt));
    const diffInMilliseconds = new Date() - postedAt;
    const diffInHours = Math.floor(diffInMilliseconds / (3600 * 1000));
    const diffInDays = Math.floor(diffInMilliseconds / (86400 * 1000));
    const diffInWeeks = Math.floor(diffInMilliseconds / (604800 * 1000));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return `${diffInWeeks} weeks ago`;
    }
  }

  return (
    <Paper sx={{ padding: "20px", textAlign: "left" }}>
      <Header />
      <Box sx={{ marginTop: "20px" }}>
        <Button onClick={() => handleSort("created_at")}>
          Sort by Created Time
        </Button>
        <Button onClick={() => handleSort("upvotes")}>Sort by Upvotes</Button>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          label="Search by Title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        {filteredPosts.map((post) => (
          <Paper
            key={post.id}
            elevation={3}
            sx={{
              padding: "10px",
              marginTop: "10px",
              borderLeft: "5px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="body2">
              Posted {getHumanReadableDate(post.created_at)}
            </Typography>
            {post && (
              <Link
                style={{
                  color: "black",
                  fontWeight: "bolder",
                  fontSize: "20px",
                }}
                to={`/post/${post.id}`}
              >
                {post.title}
              </Link>
            )}
            <Typography variant="body1">
              👍 {post.upvotes} {post.upvotes < 2 ? "Upvote" : "Upvotes"}
            </Typography>
            <hr />
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default PostList;
