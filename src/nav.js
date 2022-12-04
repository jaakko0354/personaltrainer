import React, { useState } from'react';
import {Link} from 'react-router-dom';

const Nav = ()  => {
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
          setValue(value);
    };
    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="customers" label="Customers" />
                <Tab value="trainings" label="Trainings" />
            </Tabs>
            {value === 'customers' && <div></div>}
            {value === 'trainings' && <div><traininglist></traininglist></div>}
        </div>
    );
}
export default Nav;