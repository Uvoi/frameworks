import React, { useEffect, useState } from "react";
import ActivityCalendar from "./ActivityCalendar/ActivityCalendar";

interface RemotePlanProps
{
    eventsP: TrainingEvent[];
}

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

const RemotePlan: React.FC<RemotePlanProps> = ({eventsP})=>
{
    const [events, setEvents] = useState<TrainingEvent[]>([]);

    useEffect(() => {
        console.log(eventsP)
        if (eventsP)
            setEvents(eventsP)
    }, [eventsP])
    

    return(
        <div className='RemotePlan h-full' >
            <ActivityCalendar eventsP={events}/>
        </div>
    );
};

export default RemotePlan;


