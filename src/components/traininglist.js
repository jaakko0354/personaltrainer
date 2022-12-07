import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import daysjs from 'dayjs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export default function Traininglist(){
    const [trainings, setTrainings] = useState([]);
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState();
    const gridRef = React.useRef(); 

    useEffect(()=> fetchData(),[]);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    const handleClickOpen = (params) => {
        setValue(params)
        setOpen(true);
    }
    const CustomerName = (params) => {
        if(!params.data.customer){
            return "";
        }
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }
    const DateFormat = (params) => {
        return daysjs(params.value).format('DD/MM/YYYY HH:mm');
    }

    const deleteTraining = (customerid) => {
        setOpen(false);
        fetch('https://customerrest.herokuapp.com/api/trainings/' + customerid, {method: 'DELETE'})
        .then(response => fetchData())
    }

    const columns = [
    {headerName:'Date',field:"date", valueFormatter:DateFormat, sortable:true, filter:true, floatingFilter:true},
    {headerName:'Duration',field:"duration",sortable:true, filter:true, floatingFilter:true},
    {headerName:'activity',field:"activity", sortable:true, filter:true, floatingFilter:true},
    {headerName:'Customer',field:"customer", valueGetter: CustomerName,sortable:true, filter:true, floatingFilter:true},
    {headerName:'', cellRenderer: params => 
        <Button variant="outlined" onClick={()=> handleClickOpen(params.value)}>
            <DeleteIcon/>
        </Button>
      }
    ]

    return (
        <div className="ag-theme-material" style ={{height:'600px', width:'67%', margin:'auto', paddingTop: 10}}>
            <AgGridReact
            columnDefs={columns}
            rowData={trainings}
            rowSelection='single'
            ref={gridRef}
            animateRows='true'
            onGridReady={params=>gridRef.current = params.api}
            ></AgGridReact>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{backgroundColor:'transparent'}}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
        > 
       <DialogTitle id="alert-dialog-title">
          {"Delete training?"}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center"}}>
            <Button onClick={handleClose}>NO</Button>
            <Button onClick={()=> deleteTraining(value)} autoFocus>
                YES
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    );
}

