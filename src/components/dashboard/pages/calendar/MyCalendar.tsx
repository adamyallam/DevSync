'use client'
import React, { useState, useRef, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


//Component imports

const MyCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState<string>(''); 

  const updateCalendarTitle = () => {
    if (calendarRef.current) {
      const title = calendarRef.current.getApi().view.title;
      setCalendarTitle(title);
    }
  };

  const goToPrev = () => {
    calendarRef.current?.getApi().prev()
    updateCalendarTitle()
  }

  const goToNext = () => {
    calendarRef.current?.getApi().next();
    updateCalendarTitle()
  };

  const goToToday = () => {
    calendarRef.current?.getApi().today();
    updateCalendarTitle()
  };

  const changeToMonthLayout = () => {
    calendarRef.current?.getApi().changeView('dayGridMonth');
    updateCalendarTitle()
  };

  const changeToWeekLayout = () => {
    calendarRef.current?.getApi().changeView('dayGridWeek');
    updateCalendarTitle()
  };

  useEffect(() => {
    updateCalendarTitle()
  }, [])

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex justify-between items-center pl-8 pr-8 pb-3 pt-3 border-b-2 border-gray-300'>
        <div className='flex'>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={goToToday}>Today</button>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={goToPrev}>Prev</button>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={goToNext}>Next</button>
        </div>

        <h1 className='text-xl font-semibold mr-16'>{calendarTitle}</h1>

        <div className='flex'>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={changeToWeekLayout}>Week</button>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={changeToMonthLayout}>Month</button>
        </div>
      </div>
      
      <div className='flex-grow overflow-auto'>
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin ]}
          initialView="dayGridWeek"
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;