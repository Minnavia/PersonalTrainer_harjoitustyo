import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import dayjs from "dayjs";
import React, { useState, useEffect, useMemo } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CustomerCalendar() {

    const [trainings, setTrainings] = useState([]);

    const localizer = momentLocalizer(moment);

    const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
            backgroundColor: 'lightblue',
            },
        })

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch: " + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    const events = trainings.reduce((res, item) => {
        res.push({id: item.id, title: item.activity, start: new Date(item.date), end: new Date((dayjs(item.date)).add(item.duration, 'minute'))});
        return res;
    }, []);

    return (
        <div style={{height: 600, width: 1200}}>
            <Calendar
                defaultDate={new Date(2023, 11, 11)}
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 500 }}
                views={['month', 'week', 'day']}
                step={30}
            />
        </div>
    )
}