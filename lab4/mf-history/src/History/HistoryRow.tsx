import React from "react";
import { Flame, HeartPulse, Thermometer } from "lucide-react";

interface HistoryRowProps
{
    time: string; 
    calories:number;
    pulse:number;
    temperature:number;
}

const HistoryRow: React.FC<HistoryRowProps> = ({ time, calories, pulse, temperature}) =>
{
    return(
        <div className='HistoryRow flex justify-between bg-card py-4 px-6 rounded-2xl text-xl'>
            <span className="text-xl">{time}</span>
            <div className="flex justify-between gap-10">
                <div className="flex items-center gap-2">
                    <Flame className="text-primary"/>
                    <span>{calories} кк</span>
                </div>
                <div className="flex items-center gap-2">
                    <HeartPulse className="text-primary"/>
                    <span>{pulse}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Thermometer className="text-primary"/>
                    <span>{temperature} °</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryRow;