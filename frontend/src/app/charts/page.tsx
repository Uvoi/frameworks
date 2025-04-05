"use client";

import WidgetContainer from "@/Components/WidgetContainer/WidgetContainer";
import WidgetChart from "@/Components/Widgets/WidgetChart";
import { RootState } from "@/store/store";
import { getUserFromToken } from "@/utils/auth";
import { getTodayMeasurements, parseHealthData } from "@/utils/measurements";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ChartData {
    xKey: string;
    yKey: string;
    data: Record<string, string[] | number[]>;
    title: string;
    color?: string;
}

const Charts = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [chartsData, setChartsData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            if (token) {
                try {
                    setLoading(true);
                    const user = getUserFromToken(token);
                    if (!user) return;
                    
                    const measurements = await getTodayMeasurements(user.id, token);
                    
                    if (measurements && measurements.length > 0) {
                        const parsedData = parseHealthData(measurements);
                        // Фильтруем только нужные графики
                        const filteredCharts = parsedData.charts.filter(chart => 
                            ['Шаги', 'Расстояние', 'Калории'].includes(chart.title)
                        );
                        setChartsData(filteredCharts);
                    }
                } catch (error) {
                    setError(error instanceof Error ? error.message : "Неизвестная ошибка");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchChartData();
    }, [token]);

    // if (loading) {
    //     return <div className="text-center py-10">Загрузка данных...</div>;
    // }

    // if (error) {
    //     return <div className="text-center py-10 text-red-500">Ошибка: {error}</div>;
    // }

    // if (chartsData.length === 0) {
    //     return <div className="text-center py-10">Нет данных для отображения</div>;
    // }

    return (
        <div className='Charts w-full flex flex-col gap-10'>
            {chartsData.map((chart, index) => (
                <WidgetContainer key={index}>
                    <WidgetChart 
                        title={chart.title}   
                        xKey={chart.xKey}
                        yKey={chart.yKey}
                        data={chart.data}
                        color={chart.title === 'Расстояние' || chart.title === 'Калории' ? 'secondary' : undefined}
                        size="big"
                    />
                </WidgetContainer>
            ))}
            <Link className="absolute top-8 right-8" 
                href={"/add_measurements"}><PlusCircle height={30} width={30} className="text-accent"/>
            </Link>
        </div>
    );
};

export default Charts;