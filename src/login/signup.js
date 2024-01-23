import React, { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';

import SignUpFeedbackDialog from './Dialogbox.js';
import VerifyEmailDialog from './VerifyEmail';

import image from '../Images/download.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#438A7A',
    },
  },
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [isSignDialog, setSignDialog] = useState(false);

  const [isError, setError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const errorText = isError ? 'Password does not match' : null;

  // Validate Confirm Password
  const ValidatePassword = (event) => {
    if (event.get('password') !== event.get('confirm-password')) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    ValidatePassword(data);

    if (!isError) {
      const signup_information = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        Password: data.get('password'),
      };

      axios
        .post('https://dummyjson.com/auth/login', signup_information)
        .then((response) => {
          // Check the response from the server
          if (response.data.emailExists) {
            // Email already exists, open Signup feedback dialog
            setSignDialog(true);
          } else {
            // Email does not exist, open Verify Email dialog
            setDialogOpen(true);
          }
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    }
  };

  const handleSignDialog = () => {
    setSignDialog(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      component="main"
      direction="row"
      justifyContent="space-evenly"
      sx={{ height: '100vh' }}
    >
      <CssBaseline />
      <Grid
        item
        xs={7}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '50% auto',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        square
        container
        sx={{ alignItems: { md: 'center' } }}
      >
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-required"
              label="First Name"
              name="firstName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-required"
              label="Last Name"
              name="lastName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
            />
            <FormControl sx={{ width: '49%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                margin="normal"
                id="password"
                name="password"
                fullWidth
                required
                inputProps={{ minLength: 6 }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <TextField
              id="confirm-password"
              name="confirm-password"
              fullWidth
              required
              label="Confirm Password"
              error={isError}
              helperText={errorText}
              sx={{ width: '49%', marginLeft: '2%' }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" color="text.secondary">
              <Link href="/Signin" variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <VerifyEmailDialog open={isDialogOpen} onClose={handleDialogOpen} />
      <SignUpFeedbackDialog
        open={isSignDialog}
        onClose={handleSignDialog}
        isSignUp={true}
      />
    </Grid>
        </ThemeProvider>
  );
}
