import { CSVLink } from 'react-csv';
import { IconButton } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

export default function CSVexporter(props){
    const headers = [
        {label:'firstname', key: 'firstname'},
        {label:'lastname', key: 'lastname'},
        {label:'email', key: 'email'},
        {label:'phone', key: 'phone'},
        {label:'streetaddress', key: 'streetaddress'},
        {label:'postcode', key: 'postcode'},
        {label:'city', key: 'city'}
    ]

    return (
        <div>
            <CSVLink
                style={{textDecoration: 'none'}}
                data={props.customers}
                headers={headers}
                filename='Customers.csv'
                target='_blank'
            >
                <IconButton color='info' >Download customers csv file <FileUpload sx={{margin:0.6}}/></IconButton>
            </CSVLink>
        </div>
    )
}