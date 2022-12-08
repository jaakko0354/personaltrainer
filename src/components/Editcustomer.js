import React, { useState } from 'react';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

export default function Editcustomer(props){
    const [open, setOpen] = useState(false);
    const [customer,setCustomer]= useState({firstname:"", lastname:"",streetaddress:"", postcode:"", city:"", email:"", phone:""});
    const [scroll, setScroll] = useState('paper')

    const handleClickOpen = () =>{
        setCustomer({
           firstname: props.customer.firstname,
           lastname: props.customer.lastname,
           streetaddress: props.customer.streetaddress,
           postcode: props.customer.postcode,
           city: props.customer.city,
           email: props.customer.email,
           phone: props.customer.phone
        });
        setOpen(true);
    }
    const handleCloseClick = () => {
        setOpen(false);
    }
    const edit=()=>{
        props.edit(customer, props.url);
        handleCloseClick();
    }
    const inputChanged = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    }
    
    return(<div>
        <IconButton onClick={() => handleClickOpen()}> <CreateIcon/> </IconButton>
        <Dialog
            open={open}
            onClose={handleCloseClick}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            scroll={scroll}
            style={{backgroundColor:'transparent'}}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
        > 
       <DialogTitle id="scroll-dialog-title">
          {"Edit customer"}
        </DialogTitle>
        <DialogContent dividers={scroll==='paper'}>
            <TextField
                fullWidth
                name='firstname'
                value={customer.firstname}
                onChange={e=>inputChanged(e)}
                placeholder="Firstname"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='lastname'
                value={customer.lastname}
                onChange={e=>inputChanged(e)}
                placeholder="lastname"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='streetaddress'
                value={customer.streetaddress}
                onChange={e=>inputChanged(e)}
                placeholder="Streetaddress"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='postcode'
                value={customer.postcode}
                onChange={e=>inputChanged(e)}
                placeholder="Postalcode"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='city'
                value={customer.city}
                onChange={e=>inputChanged(e)}
                placeholder="City"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='email'
                value={customer.email}
                onChange={e=>inputChanged(e)}
                placeholder="Email"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='phone'
                value={customer.phone}
                onChange={e=>inputChanged(e)}
                placeholder="Phonenumber"
            />
            
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center"}}>
                    <Button onClick={handleCloseClick}>Cancel</Button>
                    <Button onClick={edit}>Save</Button>
        </DialogActions>
        </Dialog>
    </div>)
}