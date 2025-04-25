import React from "react";
import { useState } from "react";


import './styles.css'
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { getUserFromToken } from "../../utils/auth";
import { createTraining } from "../../utils/workout";

const AddWorkout = ()=>
{
    const token = useSelector((state: RootState) => state.auth.token);
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState<number>();
    const [calories, setCalories] = useState<number>();
    const [pulse, setPulse] = useState<number>();
    const [temperature, setTemperature] = useState<number>();
    const [oxygen, setOxygen] = useState<number>();

    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (token) {
            const user = getUserFromToken(token);
            if (!user) return;
            createTraining(
                user.id,
                {
                    startTime: startTime,
                    duration: duration ?? 1,
                    calories: calories ?? 0,
                    pulse: pulse ?? 0,
                    temperature: temperature ?? 0,
                    oxygen: oxygen ?? 0
                },
                token
            )
        }
    }


    return(
        <div className='AddWorkout flex flex-col gap-20 w-full items-center' >
            <h1 className="text-2xl">Добавить тренировку</h1>
            <form className=" flex flex-col w-1/3 gap-5 items-center" onSubmit={handleSubmitAdd}>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setStartTime(e.target.value)} placeholder="дата и время начала*"/>
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setDuration(Number(e.target.value))} placeholder="длительность*"/>
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

export default AddWorkout;