import React from "react";
import { Droplet, Flame, Footprints, HeartPulse, Map, Moon, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getTodayMeasurements, ParsedData, parseHealthData } from "../../utils/measurements";
import { getUserFromToken } from "../../utils/auth";
import WidgetContainer from "../../Components/WidgetContainer/WidgetContainer";
import WidgetCounter from "../../Components/Widgets/WidgetCounter";
import WidgetChart from "../../Components/Widgets/WidgetChart";

const Dashboard = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [healthData, setHealthData] = useState<ParsedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    setLoading(true);
                    const user = getUserFromToken(token);
                    if (!user) return;
                    
                    const measurements = await getTodayMeasurements(user.id, token);
                    console.log("Raw measurements:", measurements);
                    
                    if (measurements && measurements.length > 0) {
                        const parsedData = parseHealthData(measurements);
                        console.log("Parsed data:", parsedData);
                        setHealthData(parsedData);
                    } else {
                        console.log("No measurements data received");
                    }
                } catch (error) {
                    let errorMessage = "Failed to fetch measurements";
                    if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    setError(errorMessage);
                    console.error(errorMessage);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
    }, [token]);


    return (
        <div className='Dashboard'>
            <WidgetContainer title="Ваша статистика">
                {healthData && (healthData.counters.map((counter, index) => (
                    <WidgetCounter
                        key={index}
                        icon={counter.icon === 'Footprints' ? Footprints : 
                            counter.icon === 'Map' ? Map :
                            counter.icon === 'Flame' ? Flame :
                            counter.icon === 'HeartPulse' ? HeartPulse :
                            counter.icon === 'Moon' ? Moon :
                            counter.icon === 'Thermometer' ? Thermometer : Droplet}
                        number={counter.number}
                        title={counter.title}
                        suffix={counter.suffix}
                        color={counter.color}
                    />
                )))}
            </WidgetContainer>
            
            <WidgetContainer title="Графики" className="mt-10" elementsClassName="gap-8">
                {healthData && (healthData.charts.map((chart, index) => (
                    <WidgetChart
                        key={index}
                        xKey={chart.xKey}
                        yKey={chart.yKey}
                        data={chart.data}
                        title={chart.title}
                        color={chart.color}
                    />
                )))}
            </WidgetContainer>
        </div>
    );
};

export default Dashboard;