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

interface RemotePlanProps
{
    eventsP: TrainingEvent[];
}


declare module 'mf_plan/RemotePlan' {
    import { ComponentType } from 'react';
    const RemotePlan: ComponentType<RemotePlanProps>;
    export default RemotePlan;
}

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

interface RemoteHistoryProps
{
    groupedTrainingsP: GroupedTrainings;
}

declare module 'mf_history/RemoteHistory' {
    import { ComponentType } from 'react';
    const RemoteHistory: ComponentType<RemoteHistoryProps>;
    export default RemoteHistory;
}