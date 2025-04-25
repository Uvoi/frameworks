import React, { useEffect, useState } from 'react';
import RemoteHistory from "mf_history/RemoteHistory"
import { RootState } from '../../store/store';
import { getUserFromToken } from '../../utils/auth';
import { useSelector } from 'react-redux';
import { getUserTrainings } from '../../utils/workout';

interface Training {
    id: number;
    startTime: string;
    calories: number | null;
    pulse: number | null;
    temperature: number | null;
} 

interface GroupedTrainings {
    [date: string]: Training[];
}

const History = ()=>
{
    const [groupedTrainings, setGroupedTrainings] = useState<GroupedTrainings | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    
    useEffect(() => {
        if (!token) return;
      
        const fetchData = async () => {
          const userData = getUserFromToken(token);
      
          let resPonse;
          if (userData) {
            resPonse = await getUserTrainings(userData.id, token);
          }
          if (isValidResponse(resPonse)) {
            const trainings = Array.isArray(resPonse.data) 
                ? resPonse.data 
                : [resPonse.data];
            const grouped = groupTrainingsByDate(trainings);
            setGroupedTrainings(grouped);
            }
        };
      
        fetchData();
      }, [token]);

    const isValidResponse = (response: any): response is { data: Training[] } => {
        return response && response.data && Array.isArray(response.data);
    };


    const groupTrainingsByDate = (trainings: Training[]): GroupedTrainings => {
        return trainings.reduce((acc: GroupedTrainings, training) => {
            const date = formatDate(training.startTime);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(training);
            return acc;
        }, {});
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };
      
    
    
    return(
        <div className='History' >
            {groupedTrainings && <RemoteHistory groupedTrainingsP={groupedTrainings}/>}
        </div>
    );
};

export default History;