import React, { useState, useEffect } from "react";
import CoinInfo from "./coinInfo";
import { Container, Typography, TextField, CircularProgress } from "@mui/material";
import "../App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY_CRYPTO;

function CryptoTracker() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCoinData().catch(console.error);
  }, []);

  const fetchAllCoinData = async () => {
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?api_key=" + API_KEY
      );
      const json = await response.json();
      setList(json);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((coin) =>
        list.Data[coin].FullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (

    
    <Container maxWidth="md" style={{ paddingTop: "100px" }} className="whole-page">
      <Typography variant="h4" gutterBottom>
        Crypto List
      </Typography>
      <TextField
        type="text"
        label="Search"
        variant="outlined"
        placeholder="Search..."
        fullWidth
        onChange={(event) => searchItems(event.target.value)}
        style={{ marginBottom: "20px" }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((coin) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={coin}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )
            : list &&
              Object.keys(list.Data).map((coin) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={coin}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )}
        </ul>
      )}
    </Container>
  );
}

export default CryptoTracker;
