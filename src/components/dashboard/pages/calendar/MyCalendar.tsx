'use client'
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//Component imports

const localizer = momentLocalizer(moment);


const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectEvent = (event: Event) => {
    alert(event.title);
  };

  const handleSelectSlot = (slotInfo: any) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        title,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  return (
      <div className='h-full w-full p-3'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%' }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
      </div>
  );
};

export default MyCalendar;