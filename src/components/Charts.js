import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { BarChart, Bar, Legend, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function Chart(){
    const [trainings, setTrainings] = useState([]);
    const [grouped, setGrouped] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    useEffect(() => {
        const array = [];
        setGrouped(_.groupBy(trainings, 'activity'));
        for (const property in grouped) {
            array.push({ name: property, duration: _.sumBy(grouped[property], 'duration') });
        }
        setData(array);
    }, [trainings]);

    return (
        <div style={{ width: '100%', height: '550px', display: 'inline-block', maxWidth: '1300px' }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 100, left: 0, right: 10, bottom: 0 }}
                >
                    <CartesianGrid stroke="#eee" strokeDasharray='5 5' />
                    <XAxis dataKey='name' />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='duration' fill='#9999ff' name='Duration' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}