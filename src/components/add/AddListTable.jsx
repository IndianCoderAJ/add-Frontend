
import React,{ useState,useEffect } from 'react'
import { actionAdd } from '../../redux/_actions'
import CustomDialog from '../modal/CustomDialog';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { DataGrid,GridValueGetterParams,GridToolbarFilterButton } from '@mui/x-data-grid';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import ConfirmationModal from '../modal/ConfirmationModal';
import { Loader } from '../loader';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export  function AddListTable() {
  const { list } = useSelector((state) => state.add);
  const loading = useSelector((state) => state.loading);
  const [deleteDialogOpen, deleteDialogOpenstate] = useState({
    status:false,
    _id:null
  })
  let history = useHistory();

  const [pageData, setpageData] = useState({
    perPage:5,
    page:0,
    sort:{},
    filter:[]
  })
  const [state] = useState({
    columns:[
              { field: '_id', 
                headerName: 'ID',
                filterable: false,
                sortable: false,
                width:70,
                valueGetter: (params: GridValueGetterParams) => {
                  return params.value.substr(params.value.length - 5);
                } 
              },
              { field: 'name', headerName: 'Name', filterable: true,sortable: false },
              { field: 'type', headerName: 'Add Type',  filterable: true,sortable: false},
              {
                field: 'content_url',
                headerName: 'URL',
                filterable: false,
                sortable: false
               
              },
              {
                field: 'heading',
                headerName: 'Headline',
                filterable: false,
                sortable: false,
                width:150 
               
              },
              {
                field: 'primary_text',
                headerName: 'Primary text',
                filterable: false,
                sortable: false,
                width:130 
              
              },
              {
                field: 'destination_url',
                headerName: 'Destination text',
                filterable: false,
                sortable: false,
                width:130 
                
              },
              {
                field: 'metadata',
                headerName: 'Meta Data',
                filterable: false,
                sortable: false
               
              },
              {
                field: 'created_at',
                headerName: 'Created At',
                sortable: true,
                filterable: false,
                valueGetter: (params: GridValueGetterParams) => {
                  return moment(params.value).format('l');
                }
              },
              {
                field: 'updated_at',
                headerName: 'Updated At',
                sortable: true,
                filterable: false,
                valueGetter: (params: GridValueGetterParams) => {
                  return moment(params.value).format('l');
                }
              },
              {
                field: "action",
                headerName: "Action",
                sortable: false,
                filterable: true,
                renderCell: (params) => {
                  const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    deleteDialogOpenstate({
                      status:true,
                      _id:params.id
                    })
                  };
                  return <DeleteIcon onClick={onClick} />;
                }
              },  
              {
                field: "action",
                headerName: "Action",
                sortable: false,
                filterable: false,
                renderCell: (params) => {
                  const deleteHandler = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    console.log(params.id);
                    deleteDialogOpenstate({
                      status:true,
                      _id:params.id
                    })
                  };
                  const viewHandler = (e) => {
                    e.stopPropagation();
                    history.push(`/adds/${params.id}`)
                  }
                  return (
                   <> 
                     <DeleteIcon onClick={deleteHandler} />
                     <PreviewIcon onClick={viewHandler} />
                  </>
                  );
                }
              },
            
            ],
  })
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actionAdd.getAdd(pageData));
    return () => {  
      return null
    }
  }, [pageData,dispatch])

  function handlePageChange(newPage){
    setpageData((state) => ({
         ...state,
         page:newPage
       }))
  } 
  
  function handlefilter(data){
   console.log(data);
   setpageData((state) => ({
    ...state,
    filter:data.items
  }))
  }

  function handleSort(data){
    console.log(data);
    setpageData((state) => ({
      ...state,
      sort:data.length > 0?data[0]:{}
    }))
  }
  let deleteConfirmationParent =  (response) => {
    if(response === true){
      dispatch(actionAdd.deletAdds( deleteDialogOpen._id,pageData))  
    }
    deleteDialogOpenstate({
      status:false,
      _id:null
    })
  }

  return (

    <Container fixed>
     <Box sx={{ bgcolor: '', height: '150vh' }}>
     <Typography variant="h3" component="div" gutterBottom>
        List Add's
      </Typography>
       <div style={{ height: 450, width: '100%' }}>
          <CustomDialog pageData={pageData} title='CREATE ADD' />
         <Loader 
           loading={loading} 
        />
        <DataGrid
          components={{ Toolbar: GridToolbarFilterButton }}
          getRowId={(e) => e._id}
          rows={list.rows? list.rows:[]}
          // loading={loading}
          columns={state.columns}
          pageSize={pageData.perPage}
          paginationMode="server"
          disableSelectionOnClick={false}
          rowCount={list.totalItems? list.totalItems:0}
          onPageChange={handlePageChange}
          //rowsPerPageOptions={[5]}
          filterMode='server'
         // onCellClick={handleCellClick}
          onFilterModelChange={handlefilter}
          FilterPanel={null}
          onSortModelChange={handleSort}
          // filterModel={{
          //   items: [{ columnField: 'name', operatorValue: '', value: '' }],
          // }}
          sortingMode='server'
        />
        { deleteDialogOpen.status &&
            <ConfirmationModal 
              message="Are you sure, you want to permanently remove this item?" 
              deleteConfirmation={deleteConfirmationParent}
            />
        }
        
       </div>
    </Box>
    </Container>
       
  )
}

