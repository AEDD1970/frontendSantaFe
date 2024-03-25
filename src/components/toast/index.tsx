import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  setToast: (data: any) => void
}

const CustomSnackbar = ({open, message, setToast}:CustomSnackbarProps) => {

  const handleClose = (event: any, reason: any) => {
   // this condition will prevent dissapering Snackbar when clicking away
    if (reason === 'clickaway') {
      return; 
    }

    const closeTimeout = setTimeout(() => {
        setToast({open: false});
      }, 2000);
  };

  return (
      <Snackbar 
       open={open} 
       onClose={handleClose} 
       autoHideDuration={2000}
       message={message}
      />
  );
};

export default CustomSnackbar;