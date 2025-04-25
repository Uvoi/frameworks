import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import EventContent from './EventContent';
import { useEffect, useState } from 'react';


const localizer = momentLocalizer(moment);

interface TrainingEvent {
  title: string;
  start: Date;
  end: Date;
  time: string;
  duration: number;
  calories: number;
  pulse: number;
  temperature: number;
  oxygen: number;
  id: string;
  count: number;
}

interface ActivityCalendarProps
{
  eventsP: TrainingEvent[];
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({eventsP}) => {
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TrainingEvent | null>(null);


  useEffect(() => {
      if (eventsP)
        setEvents(eventsP)
  }, [eventsP]);

  return (
    <div className="ActivityCalendar flex gap-10 h-full">
      <div className="h-[85vh] w-full rounded-xl text-foreground grow-1">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="month"
          views={['month']}
          style={{ height: '100%' }}
          onSelectEvent={(event) => setSelectedEvent(event)}
          selected={selectedEvent}
        />
      </div>

      {selectedEvent && (
        <EventContent
          title={`${selectedEvent.title} (${selectedEvent.count})`}
          time={selectedEvent.time}
          duration={selectedEvent.duration}
          calories={Math.round(selectedEvent.calories)}
          pulse={Math.round(selectedEvent.pulse)}
          temperature={selectedEvent.temperature.toFixed(1)}
          oxygen={Math.round(selectedEvent.oxygen)}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default ActivityCalendar;