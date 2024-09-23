'use client'
import React, { useState, useRef, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


//Component imports

const MyCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState<string>(''); 

  const dayHeaderContent = (arg: { date: Date }) => {
    const options = { weekday: 'short', day: 'numeric' } as const;
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(arg.date);
    const [day, number] = formattedDate.split(' '); 

    return (
      <div className="flex flex-col items-start h-16 font-normal w-full">
        <span className='ml-3 mt-1'>{number}</span>
        <span className='ml-3 text-2xl'>{day}</span>
      </div>
    );
  };

  const dayCellContent = (arg: { date: Date }) => {
    const options = { day: 'numeric' } as const;
    const dayNumber = new Intl.DateTimeFormat('en-US', options).format(arg.date);
    
    return (
      <div className="">
        <span className=''>{dayNumber}</span>
      </div>
    );
  };

  const calendarActions = {  
    updateCalendarTitle: () => {
      if (calendarRef.current) {
        const title = calendarRef.current.getApi().view.title;
        setCalendarTitle(title);
      }
    },

     goToPrev: () => {
      calendarRef.current?.getApi().prev()
      calendarActions.updateCalendarTitle()
    },
  
     goToNext: () => {
      calendarRef.current?.getApi().next();
      calendarActions.updateCalendarTitle()
    },
  
     goToToday: () => {
      calendarRef.current?.getApi().today();
      calendarActions.updateCalendarTitle()
    },
  
     changeToMonthLayout: () => {
      calendarRef.current?.getApi().changeView('dayGridMonth');
      calendarActions.updateCalendarTitle()
    },
  
     changeToWeekLayout: () => {
      calendarRef.current?.getApi().changeView('dayGridWeek');
      calendarActions.updateCalendarTitle()
    },
  }

  useEffect(() => {
    calendarActions.updateCalendarTitle()
  }, [])

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex justify-between items-center pl-8 pr-8 pb-3 pt-3 border-b-2 border-gray-300'>
        <div className='flex'>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.goToToday}>Today</button>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.goToPrev}>Prev</button>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.goToNext}>Next</button>
        </div>

        <h1 className='text-xl font-semibold mr-16'>{calendarTitle}</h1>

        <div className='flex'>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.changeToWeekLayout}>Week</button>
          <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.changeToMonthLayout}>Month</button>
        </div>
      </div>
      
      <div className='overflow-auto'>
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin ]}
          initialView="dayGridWeek"
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
          dayHeaderFormat={
            { weekday: 'short', day: 'numeric', omitCommas: true }
          }
          dayHeaderContent={dayHeaderContent}
          dayCellContent={dayCellContent}
        />
      </div>
    </div>
  );
};

export default MyCalendar;