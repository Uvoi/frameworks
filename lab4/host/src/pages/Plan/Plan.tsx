import { PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { RootState } from '../../store/store';
import { getUserFromToken } from '../../utils/auth';
import { getUserTrainings } from '../../utils/workout';
import './styles.css'

import RemotePlan from "mf_plan/RemotePlan"

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
  

const Plan = ()=>
{
    const [events, setEvents] = useState<TrainingEvent[] | null>(null);

    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        const fetchTrainings = async () => {
          if (!token) return;
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

    

    return(
        <div className='Plan h-full' >
            {events!=null && <RemotePlan eventsP={events}/>}
            <Link className="absolute top-8 right-8" 
                to={"/add_workout"}><PlusCircle height={30} width={30} className="text-accent"/>
            </Link>
        </div>
    );
};

export default Plan;