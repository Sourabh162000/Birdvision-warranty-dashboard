import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("brand@birdvision.com");
  const [password, setPassword] = useState("secure123");
  /* const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); */
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔒 Hardcoded credentials
    const validUsername = "brand@birdvision.com";
    const validPassword = "secure123";

    if (username === validUsername && password === validPassword) {
      // ✅ Mock JWT token
      const mockToken = "mock_jwt_token_12345";
      localStorage.setItem("token", mockToken);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
            Warranty Login
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Emaild ID"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
