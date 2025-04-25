import React, { useEffect, useState } from 'react';
import HistoryRow from './History/HistoryRow';
import HistoryContainer from './History/HistoryContainer';

interface RemoteHistoryProps
{
    groupedTrainingsP: GroupedTrainings,
};

interface GroupedTrainings {
    [date: string]: Training[];
}

  interface Training {
    id: number;
    startTime: string;
    calories: number | null;
    pulse: number | null;
    temperature: number | null;
  }

  

const RemoteHistory: React.FC<RemoteHistoryProps> = ({ groupedTrainingsP })=>
{

    const [groupedTrainings, setGroupedTrainings] = useState<GroupedTrainings>({});

    useEffect(() => {
        if (groupedTrainingsP) {                    
            setGroupedTrainings(groupedTrainingsP);
        }
    }, [groupedTrainingsP]);


    
    if (Object.keys(groupedTrainings).length === 0) {
        return <div className="text-center py-10">Нет данных о тренировках</div>;
    }

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const period = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;
        return `${displayHours} ${period}`;
    };


    return(
        <div className='RemoteHistory flex flex-col gap-6'>
            {Object.entries(groupedTrainings)
                .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                .map(([date, trainings], index) => (
                    <HistoryContainer
                        key={date} 
                        date={date} 
                        open={index === 0}
                    >
                        {trainings.map(training => (
                            <HistoryRow
                                key={training.id}
                                time={formatTime(training.startTime)}
                                calories={training.calories || 0}
                                pulse={training.pulse || 0}
                                temperature={training.temperature || 0}
                            />
                        ))}
                    </HistoryContainer>
                ))}
        </div>
    );
};

export default RemoteHistory;