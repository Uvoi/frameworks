"use client";

import WidgetContainer from "@/Components/WidgetContainer/WidgetContainer";
import WidgetCounter from "@/Components/Widgets/WidgetCounter";
import {  Droplet, Flame, Footprints, HeartPulse, Map, Moon, Thermometer } from "lucide-react";

const Dashboard = ()=>
{
    return(
        <div className='Dashboard' >
            <WidgetContainer title="Ваша статистика">
                <WidgetCounter icon={Footprints} number={10000} title="Шаги"/>
                <WidgetCounter icon={Map} number={10.73} suffix="км" title="Расстояние" color="secondary"/>
                <WidgetCounter icon={Flame} number={456} title="Калории" color="secondary"/>
                <WidgetCounter icon={HeartPulse} number={71} title="Пульс"/>
                <WidgetCounter icon={Moon} number={8} suffix="ч" title="Сон" color="secondary"/>
                <WidgetCounter icon={Thermometer} number={36.6} suffix="°" title="Температура"/>
                <WidgetCounter icon={Droplet} number={98} suffix="%" title="Кислород"/>
            </WidgetContainer>
        </div>
    );
};

export default Dashboard;