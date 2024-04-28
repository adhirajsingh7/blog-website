import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../components/AuthProvider";


const Home = () => {
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });

  const user = useAuth();
  console.log(user)

  // handled in auth context
  // useEffect(() => {
  //   const token = cookies.get("token");
  //   if (!token) {
  //     navigate("/signin");
  //   }
  // }, []);


  const user_by_id = async () => {
    const id = "nothing";
    const { data } = await axios.get(`users/${id}`);
    console.log(data);
  };


  const handleLogout = async()=>{
    const response = await axios.get("users/session/logout");
    console.log(response);
    navigate("/login");
  }

  return (
    <>
      <Button variant="contained" onClick={user_by_id}>
        Get user
      </Button>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="column" gap={2}>
        <Typography variant="h4">Dashboard</Typography>
        <Button onClick={handleLogout} variant="contained">Log out</Button>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
