import React, {useState} from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';

export default function AddCustomer(props)  {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode:'',
        city:'',
        email: '',
        phone: '',
        });
    const [open,setOpen] = useState(false)
    const [scroll, setScroll] = useState('paper')

    const handleClose=()=>{
        setOpen(false)
    }
    const handleOpen=()=>{
        setOpen(true)
    }
    const handleSubmit = () => {
        props.saveC(customer);
        handleClose()
    }
    const inputChanged = (e) => {
    setCustomer({...customer, [e.target.name]: e.target.value});
    }

    return (
        <div>
        <IconButton color='info' sx={{justifyContent: "flex-start"}} onClick={() => handleOpen()}> Add customer <Add sx={{margin:0.6}} /> </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            scroll={scroll}
            style={{backgroundColor:'transparent'}}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
        > 
    <DialogTitle id="scroll-dialog-title">
        {"Add customer"}
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
        </Dialog>
        </div>
    );
}
