import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import './styles.css'
import { getUserFromToken } from "../../utils/auth";
import { createMeasurement } from "../../utils/measurements";
import { RootState } from "../../store/store";

const addMeasurements = ()=>
{
    const token = useSelector((state: RootState) => state.auth.token);
    const [date, setDate] = useState('');
    const [steps, setSteps] = useState<number>();
    const [distance, setDistance] = useState<number>();
    const [sleep, setSleep] = useState<number>();
    const [calories, setCalories] = useState<number>();
    const [pulse, setPulse] = useState<number>();
    const [temperature, setTemperature] = useState<number>();
    const [oxygen, setOxygen] = useState<number>();

    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (token) {
            const user = getUserFromToken(token);
            if (!user) return;
            createMeasurement(
                user.id,
                {
                    steps: steps ?? 0,
                    distance: distance ?? 1,
                    calories: calories ?? 0,
                    pulse: pulse ?? 0,
                    sleep: sleep ?? 0,
                    temperature: temperature ?? 0,
                    oxygen: oxygen ?? 0,
                    date: date 
                },
                token
            )
        }
    }


    return(
        <div className='addMeasurements flex flex-col gap-20 w-full items-center' >
            <h1 className="text-2xl">Добавить показатели</h1>
            <form className="flex flex-col gap-5 items-center w-1/3" onSubmit={handleSubmitAdd}>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setDate(e.target.value)} placeholder="дата и время*"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSteps(Number(e.target.value))} placeholder="кол-во шагов"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setDistance(Number(e.target.value))} placeholder="расстояние"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSleep(Number(e.target.value))} placeholder="сон"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setCalories(Number(e.target.value))} placeholder="калории"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPulse(Number(e.target.value))} placeholder="пульс"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTemperature(Number(e.target.value))} placeholder="температура"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setOxygen(Number(e.target.value))} placeholder="кислород"/>
                <button
                type="submit"
                className='w-[50%] cursor-pointer bg-accent mt-10 px-3 pt-1.5 pb-2.5 text-xl rounded-xl hover:bg-accent-100'
                >
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default addMeasurements;