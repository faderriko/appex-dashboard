import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, LinearProgress } from "@mui/joy";

import { useAtom } from 'jotai';
import { userObject, userLoggedIn } from "../../state";

const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Register() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useAtom(userLoggedIn)
  const [user, setUser] = useAtom(userObject)

  const randomStr = (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
      ans +=
        arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans
  }

  if (loggedIn) {
    navigate("/home")
  }
  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showProgressDialog, setProgressDialog] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (data.get('firstName').length < 1) {
      setNameError(true);
      return
    } else {
      setNameError(false);
    }

    if (data.get('lastName').length < 1) {
      setLastNameError(true);
      return
    } else {
      setLastNameError(false);
    }

    if (!data.get('email').match(isValidEmail)) {
      setEmailError(true);
      return
    } else {
      setEmailError(false);
    }

    if (data.get('password') < 6) {
      setPasswordError(true);
      return
    } else {
      setPasswordError(false);
    }

    setProgressDialog(true)
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        referralCode: randomStr(10, '12345ABCDE')
      }))
      setLoggedIn(true)
      setProgressDialog(false)
      navigate("/home")
    }, 5000);
  };

  return (

    <Container component="main" maxWidth="xs">

      <Card
        variant="soft"
        size="lg"
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography fontWeight={"bold"} component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            error={nameError}
            helperText={nameError ? "Please enter your first name" : ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            error={lastnameError}
            helperText={lastnameError ? "Please enter your last name" : ""}
            autoComplete="family-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={passwordError}
            helperText={passwordError ? "Password too short" : ""}
          />
          {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              
            </Grid>
            <Grid item xs={12} sm={6}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid> */}
          {
            showProgressDialog ? <LinearProgress /> : <div></div>
          }

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>

    </Container>

  );
}