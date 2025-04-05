'use client'

import HistoryContainer from "@/Components/History/HistoryContainer";
import HistoryRow from "@/Components/History/HistoryRow";
import { RootState } from "@/store/store";
import { getUserFromToken } from "@/utils/auth";
import { getUserTrainings } from "@/utils/workout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

const History = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [groupedTrainings, setGroupedTrainings] = useState<GroupedTrainings>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    setLoading(true);
                    const user = getUserFromToken(token);
                    if (!user) return;
                    
                    const response = await getUserTrainings(user.id, token);
                    
                    if (isValidResponse(response)) {
                        const trainings = Array.isArray(response.data) 
                            ? response.data 
                            : [response.data];
                        const grouped = groupTrainingsByDate(trainings);
                        setGroupedTrainings(grouped);
                    }
                } catch (error) {
                    setError(error instanceof Error ? error.message : "Неизвестная ошибка");
                } finally {
                    setLoading(false);
                }
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

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const period = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;
        return `${displayHours} ${period}`;
    };

    if (loading) {
        return <div className="text-center py-10">Загрузка истории тренировок...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Ошибка: {error}</div>;
    }

    if (Object.keys(groupedTrainings).length === 0) {
        return <div className="text-center py-10">Нет данных о тренировках</div>;
    }

    return (
        <div className='History flex flex-col gap-6'>
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

export default History;