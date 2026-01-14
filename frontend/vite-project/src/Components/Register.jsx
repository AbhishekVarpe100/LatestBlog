import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Stack
} from "@mui/material";

function Register() {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [err, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      const res = await axios.post("http://localhost:3000/register", user);

      if (res.data.errors) {
        const formatted = {};
        res.data.errors.forEach(err => {
          formatted[err.path] = err.msg;
        });
        setFieldErrors(formatted);
        return;
      }

      if (res.data === "failed") {
        setError("Username or email already exists");
        setTimeout(() => {
          setError("");
          setUser({ username: "", password: "", email: "" });
        }, 3000);
      } 
      else if (res.data === "success") {
        setSuccess("Registered successfully");
        setTimeout(() => {
          setSuccess("");
          setUser({ username: "", password: "", email: "" });
          setTimeout(() => navigate('/login'), 2000);
        }, 3000);
      }
    } catch (error) {
      setError("Server error! Try again");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <Box  
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Stack spacing={2} mb={2}>
          {err && <Alert severity="error">{err}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(fieldErrors.username)}
              helperText={fieldErrors.username}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              Register
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
