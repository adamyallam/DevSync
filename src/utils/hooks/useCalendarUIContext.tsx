import { useContext } from 'react';
import { CalendarUIContext } from '@/components/dashboard/context/CalendarUIProvider';

const useCalendarUIContext = () => {
    const context = useContext(CalendarUIContext);
    if (!context) {
        throw new Error('CalendarUIContext must be used within a CalendarUIProvider');
    }
    return context;
}

export default useCalendarUIContext