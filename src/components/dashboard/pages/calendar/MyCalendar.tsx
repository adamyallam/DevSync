'use client'
import React, { useState, useRef, useEffect} from 'react';
import { Plus } from 'lucide-react';
import useWeekDates from '@/utils/hooks/useWeekDates';


//Component imports

const MyCalendar = () => {
  const weeks = useWeekDates()
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const addTaskButton = (index: number) => {
    if(index !== 0 && index !== 6) {
      return (
        <button className="flex items-center gap-1 pb-2 font-semibold opacity-60 hover:opacity-100">
          <Plus size={18}/>
          Add Task
        </button>
      )
    }
    return null
  }

  return (
    <div className="h-full w-full flex border-t border-l">
      {weeks.map((week, index) => (
        <div key={index} className={`border-r border-b flex flex-col ${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}>

          <div className="h-[4.5rem] p-2 border-b text-start">
            <div className="text-sm font-semibold text-gray-600">{week.day}</div>
            <div className={`text-lg mt-1 ${currentDay === week.date ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{week.date}</div>
          </div>

          <div className="flex flex-grow items-start justify-center bg-gray-100 pt-4">
            {addTaskButton(index)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCalendar







//temporary calendar that uses a library

// const MyCalendar: React.FC = () => {
//   const calendarRef = useRef<FullCalendar | null>(null);
//   const [calendarTitle, setCalendarTitle] = useState<string>(''); 

//   const dayHeaderContent = (arg: { date: Date }) => {
//     const currentView = calendarRef.current?.getApi().view.type
//     const options = { weekday: 'short', day: 'numeric' } as const;
//     const formattedDate = new Intl.DateTimeFormat('en-US', options).format(arg.date);
//     const [day, number] = formattedDate.split(' '); 

//     if (currentView === 'dayGridWeek') {
//       return (
//         <div className="flex flex-col items-start h-14 w-48">
//           <span className='mt-1 text-sm font-bold text-gray-600'>{number}</span>
//           <span className='text-xl font-normal'>{day}</span>
//         </div>
//       )
//     }
//     return (
//       <div className="flex flex-col items-start h-5 w-48">
//         <span className='text-sm font-bold text-gray-600'>{number}</span>
//       </div>
//     );
//   };

//   const dayCellContent = (arg: { date: Date }) => {
//     const currentView = calendarRef.current?.getApi().view.type
//     const options = { day: 'numeric' } as const;
//     const dayNumber = new Intl.DateTimeFormat('en-US', options).format(arg.date);

//     if (currentView === 'dayGridMonth') {
//       return (
//         <div className='w-52'>
//           <span className='text-md ml-2'>{dayNumber}</span>
//         </div>
//       );
//     } 

//     return (
//       <div>
//         <span> </span>
//       </div>
//     )
//   };

//   const calendarActions = {  
//     updateCalendarTitle: () => {
//       if (calendarRef.current) {
//         const title = calendarRef.current.getApi().view.title;
//         setCalendarTitle(title);
//       }
//     },

//      goToPrev: () => {
//       calendarRef.current?.getApi().prev()
//       calendarActions.updateCalendarTitle()
//     },
  
//      goToNext: () => {
//       calendarRef.current?.getApi().next();
//       calendarActions.updateCalendarTitle()
//     },
  
//      goToToday: () => {
//       calendarRef.current?.getApi().today();
//       calendarActions.updateCalendarTitle()
//     },
  
//      changeToMonthLayout: () => {
//       calendarRef.current?.getApi().changeView('dayGridMonth');
//       calendarActions.updateCalendarTitle()
//     },
  
//      changeToWeekLayout: () => {
//       calendarRef.current?.getApi().changeView('dayGridWeek');
//       calendarActions.updateCalendarTitle()
//     },
//   }

//   useEffect(() => {
//     calendarActions.updateCalendarTitle()
//   }, [])

//   return (
//     <div className='flex flex-col h-full w-full'>
//       <div className='flex justify-between items-center pl-8 pr-8 pt-3 pb-3'>
//         <div className='flex'>
//           <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.goToToday}>Today</button>
//           <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.goToPrev}>Prev</button>
//           <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.goToNext}>Next</button>
//         </div>

//         <h1 className='text-xl font-semibold mr-16'>{calendarTitle}</h1>

//         <div className='flex'>
//           <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.changeToWeekLayout}>Week</button>
//           <button className='border-2 bg-blue-500 w-14 h-9 rounded-md p-1 text-sm text-white' onClick={calendarActions.changeToMonthLayout}>Month</button>
//         </div>
//       </div>
      
//       <div className='overflow-auto' style={{ height: 'calc(100% - 64px)' }}>
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[ dayGridPlugin ]}
//           initialView="dayGridWeek"
//           headerToolbar={{
//             left: '',
//             center: '',
//             right: ''
//           }}
//           dayHeaderFormat={
//             { weekday: 'short', day: 'numeric', omitCommas: true }
//           }
//           dayHeaderContent={dayHeaderContent}
//           dayCellContent={dayCellContent}
//           dayCellClassNames={[
//             'bg-gray-100'
//           ]}
//         />
//       </div>
//     </div>
//   );
// };

// export default MyCalendar;