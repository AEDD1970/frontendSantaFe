import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity: string;
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, severity }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(open);

  useEffect(() => {
    if (open) {
      const openTimeout = setTimeout(() => {
        setSnackbarOpen(true);
      }, 1000);
      const closeTimeout = setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return () => {
        clearTimeout(openTimeout);
        clearTimeout(closeTimeout);
      };
    }
  }, [open]);

  return (
    <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
