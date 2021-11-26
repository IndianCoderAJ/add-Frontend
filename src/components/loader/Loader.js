
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export  function Loader(props) {
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading.status}
       >
       <CircularProgress color="inherit" />
       </Backdrop>
    )
}
