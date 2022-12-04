import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


export default function Customerlist(){
    const [customers, setCustomers] = useState([]);
    const gridRef = React.useRef(); 
    useEffect(()=> fetchData(),[]);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    const CustomerName = (params) => {
        return params.data.firstname + " " + params.data.lastname;
    }

    const Address = (params) => {
        return params.data.streetaddress + ", " + params.data.city + ", " + params.data.postcode;
    }
    const columns = [
    {headerName:'Customer',field:"customer", valueGetter: CustomerName, sortable:true, filter:true, floatingFilter:true},
    {headerName:'Email',field:"email",sortable:true, filter:true, floatingFilter:true},
    {headerName:'Address',field:"address", valueGetter: Address, sortable:true, filter:true, floatingFilter:true},
    {headerName:'Phone number',field:"phone",sortable:true, filter:true, floatingFilter:true}
    ]

    return (
        <div className="ag-theme-material" style ={{height:'600px', width:'60%', margin:'auto'}}>
            <AgGridReact
            columnDefs={columns}
            rowData={customers}
            rowSelection='single'
            ref={gridRef}
            animateRows='true'
            onGridReady={params=>gridRef.current = params.api}
            ></AgGridReact>
            
        </div>
    );
}