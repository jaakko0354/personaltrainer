import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';

export default function CalendarPage() {
    const [events, setEvents] = React.useState([]);

    React.useEffect(()=>fetchData(),[]);

    const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(res => res.json())
    .then(data => setEvents(eventLister(data)))
    .catch(err => console.error(err));
    }

    const eventLister = (list) => {
        const nlist= list.map((event) => {
            return{
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, "m").toDate(),
                title: event.activity + " | " + event.customer?.firstname + " " + event.customer?.lastname
            }
        });
        return nlist;
    }

    return (
        <div id="calendar">
            <FullCalendar
            height={513}
            aspectRatio={1.5}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }}
            headerToolbar={{
                left: 'prev today next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            initialView='dayGridMonth'
            firstDay='1'
            timeZone='UTC'
            />
        </div>
        );
    };



