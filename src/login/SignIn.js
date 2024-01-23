import React, { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Twitter, Google, Facebook } from '@mui/icons-material';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

import SignUpFeedbackDialog from './Dialogbox.js';

import image from '../Images/download.png';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




export default function SignIn() {
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const [isSignDialog, setSignDialog] = useState(false);
  const handleSignDialog = () => {
    setSignDialog(false);
  };

  const [wrongPassword, setwrongPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios
      .post('https://dummyjson.com/auth/login', signInfo)
      .then((response) => {
        if (response.data.EmailNotExists) {
          // if user had not signup
          setSignDialog(true);
        } else if (response.data.wrongPassword) {
          // if user enter wrong password
          setwrongPassword(true);
        } else {
          // if successfully sign in go to home page
          // redirect to homepage
        }
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

 const theme = createTheme({
  palette: {
    primary: {
      main: '#438A7A',
    },
  },
});
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

            <Typography variant="h6" fontWeight="bold"
             color="text.secondary"
            >
              Welcome Back !
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb : 3 }} >
              Sign in to continue to Invoika.
            </Typography>            
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <FormControl
                sx={{
                  width: '100%',
                }}
                variant="outlined"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{
                    'color': wrongPassword ? 'red' : 'default',
                    '&.Mui-focused': {
                      color: wrongPassword ? 'red' : 'default',
                    },
                  }}
                >
                  Password *
                </InputLabel>
                <OutlinedInput
                  margin="normal"
                  name="password"
                  id="outlined-adornment-password"
                  fullWidth
                  error={wrongPassword}
                  required
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ minLength: 6 }}
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

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                
                label="Remember me"
              />
              {wrongPassword && (
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    backgroundColor: 'lightcoral',
                    color: 'white',
                    p: 1.5,
                    m: 0,
                    width: '100%',
                    mt: 1,
                    border: '3px solid red',
                  }}
                >
                  Your Password is invalid , please try again
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              <Box sx={{ 
                  mx : 5,
                  display : 'flex',
                  flexDirection: 'column',
                  alignItems :'center'
              }}>
                 <Typography 
                   variant="h6" 
                   fontWeight="bold"
                   color="text.secondary" 
                   sx ={{mt : 1}}
                  >
                 Sign in with
                </Typography> 
                <Grid container sx={{
                  mb : 3,
                  mt : 1,
                  display : "flex",
                  alignItems : "center",
                  justifyContent:"center",
                }}
                  >
                 <Grid item>
                 <Twitter sx={{
                   backgroundColor : "#50B0F4",
                   p : 2,
                   borderRadius : 4,
                   color : "white",
                   
                 }} />
                 </Grid>
                 <Grid item> 
                 <Google sx={{
                   backgroundColor : "#ED4343",
                   p : 2,
                   borderRadius : 4,
                   color : "white",
                   mx : 2
                 }} 
                   />                
                 </Grid>
                 <Grid item> 
                 <Facebook sx={{
                   color : "#428A7A",
                   p : 2,
                 }} 
                   />                 
                 </Grid>
                </Grid>
                
             </Box>
             
              <Grid container>
                <Grid item>
                  
                  <Typography  variant="body2" display="inline" color="text.secondary" fontWeight="bold">
                   Don't have an account ? 
                   </Typography>
                  <Link href="/" variant="body2" display="inline" fontWeight="bold" >
                    {" Sign Up Now"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          
        </Grid>
      </Grid>
      <SignUpFeedbackDialog
        open={isSignDialog}
        onClose={handleSignDialog}
        isSignUp={false}
      />
    </ThemeProvider>
  );
}
