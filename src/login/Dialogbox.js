import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  IconButton,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SignUpFeedbackDialog = ({ open, onClose, isSignUp }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    onClose(); // Close the dialog

    if (isSignUp) {
      // Redirect to sign-up page
      navigate('/signin');
    } else {
      // Redirect to sign-in page
      navigate('/');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <InfoIcon style={{ fontSize: 80, color: '#ff4444' }} />
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {isSignUp ? 'Account Already Exists' : 'Account Not Found'}
            </Typography>
            <Typography variant="body1" paragraph>
              {isSignUp
                ? 'It seems like you already have an account. Please choose a different email address or try signing in.'
                : 'Email is not signed up, please sign up or try using a different account.'}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
            >
              {isSignUp ? 'Sign in' : 'Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

SignUpFeedbackDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isSignUp: PropTypes.bool.isRequired,
};

export default SignUpFeedbackDialog;
