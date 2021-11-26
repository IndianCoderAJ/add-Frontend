import React,{useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import AddForm from './AddForm';
import {  useSelector } from 'react-redux';
import { Loader } from '../loader';



export default function CustomDialog(props) {

  const [open, setOpen] = React.useState(false);
  const loading = useSelector((state) => state.loading);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(loading.success){
      setOpen(false);
    }
    return () => {
      
    }
  }, [loading])

  return (

    <div>
      <Button color='success' className='m-2' variant='contained' onClick={handleClickOpen}>
       {props.title}
      </Button>
      <Dialog open={open}  onClose={handleClose}>
        <AddForm pageData={props.pageData} title={props.title} />
        <Loader loading={loading} />
        <DialogActions />
      </Dialog>
    </div>
  );
}