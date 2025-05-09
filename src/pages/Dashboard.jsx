import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    Container,
    AppBar,
    Toolbar,
  } from "@mui/material";
import WarrantyTable from "../components/WarrantyTable";

const Dashboard = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    return (
        <>
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Warranty Dashboard</Typography>
            <Button color="inherit" onClick={handleLogout}>
                Logout
            </Button>
            </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom align="center">
            Welcome to the Warranty Dashboard
            </Typography>
            <WarrantyTable />
        </Container>
        </>
    );
  };
  export default Dashboard;