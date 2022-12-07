import React, {useState} from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import daysjs from 'dayjs';
import format from 'date-fns/format';
import fiLocale from 'date-fns/locale/fi';

export default function AddTraining(props){
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
        customer:'',
        });
    const [open,setOpen] = useState(false)
    const [scroll, setScroll] = useState('paper')

    const handleClose=()=>{
        setOpen(false)
    }
    const handleOpen=()=>{
        if(!props.url){
            window.alert('Please select a customer');
            return
        }
        setTraining({
            ...training,
            customer: props.url
          });
        setOpen(true)
    }
    const handleSubmit = () => {
        props.saveT(training);
        handleClose()
    }
    const inputChanged = (e) => {
    setTraining({...training, [e.target.name]: e.target.value});
    }
    return(<div>
        <IconButton color='info' sx={{justifyContent: "flex-start"}} onClick={() => handleOpen()}> Add Training <Add sx={{margin:0.6}} /> </IconButton>
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
        {"Add training for "}{props.name} 
        </DialogTitle>
        <DialogContent dividers={scroll==='paper'}>
            <LocalizationProvider sx={{justifyContent:'center'}} dateAdapter={AdapterDateFns} adapterLocale={fiLocale}>
                <DatePicker
                    label="Date"
                    inputFormat='dd.MM.yyyy'
                    value={training.date}
                    onChange={value => setTraining({...training, date: value})}
                    renderInput={(params) => <TextField variant='standard' {...params} />}
                />
            </LocalizationProvider>
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='duration'
                value={training.duration}
                onChange={e=>inputChanged(e)}
                placeholder="Duration"
            />
            <TextField
                style={{paddingTop: '10px'}}
                fullWidth
                name='activity'
                value={training.activity}
                onChange={e=>inputChanged(e)}
                placeholder="Activity"
            />
            
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center"}}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
        </Dialog>
        </div>
    )
}