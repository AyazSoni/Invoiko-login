import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';

const VerifyEmailDialog = ({ open, onClose }) => {
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
            <EmailIcon style={{ fontSize: 80, color: '#2196f3' }} />
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Verify Your Email
            </Typography>
            <Typography variant="body1" paragraph>
              A verification email has been sent to your inbox. Please click the
              link to verify your email address.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Gmail
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailDialog;
