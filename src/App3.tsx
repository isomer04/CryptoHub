import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import PostList from "./components/PostList";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import CryptoTracker from "./components/CryptoTracker";
import DetailView from "./routes/DetailView";
import NotFound from "./routes/NotFound";
import About from "./routes/About";
import Contact from "./routes/Contact";
import CryptoNews from "./components/CryptoNews";

import "./App.css";

// Define type for post
interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  comments: { text: string }[];
}

const supabaseUrl = import.meta.env.VITE_APP_SUPABASEURL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASEKEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  // Use generic type for state
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (): Promise<void> => {
    try {
      const { data, error } = await supabase.from("sportshub").select("*");
      if (error) {
        console.log("Error fetching posts:", error);
      } else {
        setPosts(Array.isArray(data) ? (data as Post[]) : []);

      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreate = async (newPost: Post) => {
    try {
      const { data: post, error } = await supabase
        .from("sportshub")
        .insert(newPost);
  
      if (error) {
        console.log("Error creating post:", error);
      } else if (post) {
        setPosts((prevPosts) => [...prevPosts, post]);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  const updatePost = async (updatedPost: Post) => {
    try {
        const { data, error } = await supabase
            .from("sportshub")
            .update(updatedPost)
            .match({ id: updatedPost.id });

        if (error) {
            console.log("Error updating post:", error);
        } else {
            if (data && data.length > 0) {
                const updatedData = data[0];
                setPosts((prevPosts) =>
                    prevPosts.map((p) => (p.id === updatedData.id ? updatedData : p))
                );
            } else {
                console.error("Error updating post: No data returned");
            }
        }
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

  
  
  

  const deletePost = async (postId: string) => {
    await supabase.from("sportshub").delete().match({ id: postId });
    setPosts(posts.filter((p) => p.id !== postId));
  };

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route
          path="/post/:id"
          element={
            <Post
              posts={posts}
              updatePost={updatePost}
              deletePost={deletePost}
            />
          }
        />
        <Route
          path="/create"
          element={<PostForm handleCreate={handleCreate} />}
        />

        <Route path="/cryptotracker" element={<CryptoTracker />} />
        <Route
          index={false}
          path="/coinDetails/:symbol"
          element={<DetailView />}
        />

        <Route path="/cryptonews" element={<CryptoNews />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
