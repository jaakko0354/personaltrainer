import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import daysjs from 'dayjs';


export default function Traininglist(){
    const [trainings, setTrainings] = useState([]);
    const gridRef = React.useRef(); 
    useEffect(()=> fetchData(),[]);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }
    const CustomerName = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }
    const DateFormat = (params) => {
        return daysjs(params.value).format('DD/MM/YYYY HH:mm');
    }

    const columns = [
    {headerName:'Date',field:"date", valueFormatter:DateFormat, sortable:true, filter:true, floatingFilter:true},
    {headerName:'Duration',field:"duration",sortable:true, filter:true, floatingFilter:true},
    {headerName:'activity',field:"activity", sortable:true, filter:true, floatingFilter:true},
    {headerName:'Customer',field:"customer", valueGetter: CustomerName,sortable:true, filter:true, floatingFilter:true}
    ]

    return (
        <div className="ag-theme-material" style ={{height:'600px', width:'60%', margin:'auto'}}>
            <AgGridReact
            columnDefs={columns}
            rowData={trainings}
            rowSelection='single'
            ref={gridRef}
            animateRows='true'
            onGridReady={params=>gridRef.current = params.api}
            ></AgGridReact>
        </div>
    );
}