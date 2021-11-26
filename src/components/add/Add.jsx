import React, { useEffect } from 'react'
import ReactPlayer from "react-player"
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { actionAdd } from '../../redux/_actions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CustomDialog from '../modal/CustomDialog';
import {Loader} from '../loader'
import { addConstants } from '../../redux/_constants';


export default function Add() {
  let { id } = useParams();

  let { singleAdd } = useSelector((state) => state.add)
  const loading = useSelector((state) => state.loading);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionAdd.getAddById({_id:id}))
    return () => {
       dispatch({type:addConstants.RESET_SINGLE_ADD})
    }
  }, [id,dispatch])
   
  return (
        <div>
          
           <Loader 
           loading={loading} 
           />
           <Card sx={{ maxWidth: 645,mx: '200px',my: '50px' }}>
          {singleAdd.type === 'VIDEO_AD' &&
            <ReactPlayer
                controls
                url={singleAdd.content_url}
                className='react-player'
            />
          }
          {singleAdd.type === 'IMAGE_AD' &&
              <CardMedia
              component="img"
              height="140"
              image={singleAdd.content_url}
              alt={singleAdd.name}
              />
          }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {singleAdd.heading}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: '4px' }}>
          <b>Name:-</b> {singleAdd.name.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: '4px' }}>
          <b>Type:-</b> {singleAdd.type}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: '4px' }}>
          <b>Primary text:-</b> {singleAdd.primary_text}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: '4px' }}>
          <b>Content URL:-</b> {singleAdd.content_url}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: '4px' }}>
          <b>Destination URL:-</b> {singleAdd.destination_url}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" sx={{ my: '4px' }}>
          <b>Meta Data:-</b> {singleAdd.metadata}
          </Typography> */}
        </CardContent>
        <CardActions>
          {/* <Button size="small" onClick={updateAdd}>update</Button> */}
            <CustomDialog  title='UPDATE ADD' />
        </CardActions>
        </Card>
        </div>
       
  )
}
