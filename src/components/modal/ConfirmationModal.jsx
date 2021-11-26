import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationModal(props) {

    const [open, setOpen] = React.useState(true);
  
    const handleClose = (response) => {
      setOpen(false);
      console.log(response);
      props.deleteConfirmation(response)
    };

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClose(false)}>Disagree</Button>
          <Button onClick={e => handleClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
}
