import { ReactNode } from "react";
import Accordion from "../Accordion/Accordion";

interface HistoryContainerProps {
    date: string;
    open?: boolean;
    children: ReactNode;
  }

const HistoryContainer: React.FC<HistoryContainerProps> = ({date, open, children}) =>
    {
        return(
            <Accordion 
                title=<p className="font-bold text-2xl">{date}</p>  
                className='HistoryContainer'
                open={open}
            >
                <div className="HistoryRows mt-5 flex flex-col gap-3">
                    {children}
                </div>
            </Accordion>
        );
    };
    
    export default HistoryContainer;