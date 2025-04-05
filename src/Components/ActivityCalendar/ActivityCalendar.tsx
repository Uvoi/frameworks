'use client';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import EventContent from './EventContent';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { getUserFromToken } from '@/utils/auth';
import { getUserTrainings } from '@/utils/workout';

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

export default function ActivityCalendar() {
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TrainingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchTrainings = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const user = getUserFromToken(token);
        if (!user) return;

        const response = await getUserTrainings(user.id, token);
        
        if (isValidResponse(response)) {
          const trainings = Array.isArray(response.data) 
            ? response.data 
            : [response.data];
          
          // Группируем тренировки по дате (без времени)
          const groupedByDate: Record<string, TrainingEvent> = {};

          trainings.forEach(training => {
            const startDate = new Date(training.startTime);
            const dateKey = startDate.toISOString().split('T')[0]; // Ключ в формате YYYY-MM-DD
            
            const durationHours = training.duration || 1;
            const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
            
            if (!groupedByDate[dateKey]) {
              // Первая тренировка в этот день
              groupedByDate[dateKey] = {
                title: 'Тренировки',
                start: startDate,
                end: endDate,
                time: formatTime(training.startTime),
                duration: durationHours,
                calories: training.calories || 0,
                pulse: Math.round(training.pulse || 0),
                temperature: training.temperature || 0,
                oxygen: training.oxygen || 0,
                id: dateKey,
                count: 1
              };
            } else {
              // Объединяем с существующей тренировкой в этот день
              const existing = groupedByDate[dateKey];
              
              // Выбираем самое раннее время начала
              if (startDate < existing.start) {
                existing.start = startDate;
                existing.time = formatTime(training.startTime);
              }
              
              // Выбираем самое позднее время окончания
              if (endDate > existing.end) {
                existing.end = endDate;
              }
              
              // Суммируем показатели
              existing.duration += durationHours;
              existing.calories += training.calories || 0;
              existing.pulse = Math.round(((existing.pulse * existing.count) + (training.pulse || 0)) / (existing.count + 1));
              existing.temperature = ((existing.temperature * existing.count) + (training.temperature || 0)) / (existing.count + 1);
              existing.oxygen = ((existing.oxygen * existing.count) + (training.oxygen || 0)) / (existing.count + 1);
              existing.count += 1;
            }
          });

          setEvents(Object.values(groupedByDate));
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, [token]);

  const isValidResponse = (response: any): response is { data: any[] } => {
    return response && response.data;
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const period = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    return `${displayHours}${period}`;
  };

  if (loading) {
    return <div className="text-center py-10">Загрузка календаря тренировок...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="ActivityCalendar flex gap-10">
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