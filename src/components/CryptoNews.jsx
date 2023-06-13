import React, { useState, useEffect } from "react";
import axios from "axios";

import "../App.css";

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
  

  // return (
  //   <div className="whole-page">
  //     <h1>Crypto News</h1>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <ul className="news-list">
  //         {newsList.map((news, index) => (
  //           news.urlToImage && (
  //             <li key={index} className="news-item">
  //               <div className="news-content">
  //                 <img src={news.urlToImage} alt={news.title} />
  //                 <div className="news-details">
  //                   <h3>
  //                     <a href={news.url} target="_blank" rel="noopener noreferrer">
  //                       {news.title}
  //                     </a>
  //                   </h3>
  //                   <p>{news.content}</p>
  //                 </div>
  //               </div>
  //             </li>
  //           )
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );

  return (
    <div>
      <h1>Crypto News</h1>
      <ul>
        {newsList.map((news) => (
          <li key={news.id}>
            <h3>{news.title}</h3>
            <p>{news.body}</p>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default CryptoNews;
