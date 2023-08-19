import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
} from "@mui/material";

const API_KEY = import.meta.env.VITE_APP_API_KEY_CRYPTO;

function CryptoNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoNews();
  }, []);

  const fetchCryptoNews = async () => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
      );
      const data = response.data.Data;
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching crypto news:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Container maxWidth="xl" style={{ paddingTop: "100px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Crypto News
      </Typography>
      <Grid container spacing={2}>
        {newsList.map((news) => (
          <Grid key={news.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={news.imageurl}
                alt={news.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {truncateText(news.body, 200)} {/* Limit to 200 characters */}
                </Typography>
                <Link
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CryptoNews;
