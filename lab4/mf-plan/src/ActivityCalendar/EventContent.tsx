import React from "react";
import { ArrowRightToLine, Clock, Droplet, Flame, HeartPulse, Thermometer, Timer, } from "lucide-react";

interface EventContentProps
{
    title: string;
    time: string;
    duration: number;
    calories?: number;
    pulse?: number;
    temperature?: string;
    oxygen?: number;
    onClose: () => void;

}

const EventContent:React.FC<EventContentProps> = ({title, time, duration, calories, pulse, temperature, oxygen, onClose}) =>
{
    return(
        <div className='relative w-1/3 flex flex-col bg-card rounded-2xl p-5 gap-3 pb-12'>
            <h2 className="text-2xl mb-10 bg-secondary w-fit p-1 px-2 rounded-2xl">{title}</h2>
            <span className="flex items-center gap-3"><Clock className="text-accent" height={20}/>{time}</span>
            <span className="flex items-center gap-3"><Timer className="text-accent" height={20}/>{duration} часов</span>
            <span className="flex items-center gap-3"><Flame className="text-accent" height={20}/>{calories?calories:"--"} кк</span>
            <span className="flex items-center gap-3"><HeartPulse className="text-accent" height={20}/>{pulse?pulse:"--"}</span>
            <span className="flex items-center gap-3"><Thermometer className="text-accent" height={20}/>{temperature?temperature:"--"}°</span>
            <span className="flex items-center gap-3"><Droplet className="text-accent" height={20}/>{oxygen?oxygen:"--"} %</span>
            <button onClick={onClose} className="absolute bottom-4 left-8 -translate-x-1/2 bg-secondary p-1.5 rounded-2xl cursor-pointer hover:bg-accent"><ArrowRightToLine/></button>
        </div>
    );
};

export default EventContent;