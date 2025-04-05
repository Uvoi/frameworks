import ActivityCalendar from "@/Components/ActivityCalendar/ActivityCalendar";
import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

const Plan = ()=>
{
    return(
        <div className='Plan ' >
            <ActivityCalendar/>
            <Link className="absolute top-8 right-8" 
                href={"/add_workout"}><PlusCircle height={30} width={30} className="text-accent"/>
            </Link>
        </div>
    );
};

export default Plan;