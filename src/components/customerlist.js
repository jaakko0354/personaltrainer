import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Editcustomer from './Editcustomer';
import AddCustomer from './Addcustomer';
import AddTraining from './Addtraining';
import CSVexporter from './CSVexport';

export default function Customerlist(){
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [pick, setPick] = useState({});
    const gridRef = React.useRef(); 

    useEffect(()=> fetchData(),[]);

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleClickOpen = (params) => {
        setValue(params)
        setOpen(true);
    }
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    const customerName = (params) => {
        return params.data.firstname + " " + params.data.lastname;
    }

    const address = (params) => {
        return params.data.streetaddress + ", " + params.data.city + ", " + params.data.postcode;
    }

    const edit = (customer,url) =>{
        fetch(url, {
            method:'PUT',
            body: JSON.stringify(customer),
            headers:{
                'Content-type':'application/json'
            },
        })
        .then(response => fetchData())
    }

    const deleteCustomer = (link) => {
            setOpen(false);
            fetch(link, {method: 'DELETE'})
            .then(response => fetchData())
    }

    const saveC = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {method: 'POST',
        body:JSON.stringify(customer),
        headers:{'Content-Type':'application/json'}})
        .then(response => fetchData())
    }

    const saveT = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(training),
            headers: { 'Content-type' : 'application/json' }
          })
          .then(res => {
            window.alert('Training added')})
      }


    const columns = [
    {headerName:'Customer',field:"customer", valueGetter: customerName, sortable:true, filter:true, floatingFilter:true},
    {headerName:'Email',field:"email",sortable:true, filter:true, floatingFilter:true},
    {headerName:'Address',field:"address", valueGetter: address, width:300, sortable:true, filter:true, floatingFilter:true},
    {headerName:'Phone number',field:"phone",sortable:true, filter:true, floatingFilter:true},
    {headerName:'', valueGetter: (params) => params.data.links[0].href, cellRenderer: params => <Editcustomer customer={params.data} url={params.value} edit={edit}/>},
    {headerName:'', valueGetter: (params) => params.data.links[0].href, cellRenderer: params => 
        <Button variant="outlined" onClick={()=> handleClickOpen(params.value)}>
            <DeleteIcon/>
        </Button>

      }
    ]
    const gridopt = {
        columnDefs:columns,
        rowSelection:'single',
        onRowClicked: event => setPick(event.data),
        animateRows:'true',
        onGridReady:params=>gridRef.current = params.api,
    }
    return (
        <div>
            <div id='container'>
                <AddCustomer saveC={saveC}/>
                <AddTraining
                    url={pick.links?.[0].href}
                    name={pick.firstname + ' ' + pick.lastname}
                    saveT={saveT}
                />
                <CSVexporter customers={customers}/>
            </div>
            <div className="ag-theme-material" style ={{height:'600px', width:'86%', margin:'auto', paddingTop: 10}}>
                <AgGridReact
                gridOptions={gridopt}
                rowData={customers}
                ref={gridRef}
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
            {"Delete customer?"}
            </DialogTitle>
            <DialogActions sx={{ justifyContent: "center"}}>
                <Button onClick={handleClose}>NO</Button>
                <Button onClick={()=> deleteCustomer(value)} autoFocus>
                    YES
                </Button>
            </DialogActions>
            </Dialog>
            </div>
            </div>
    );
}