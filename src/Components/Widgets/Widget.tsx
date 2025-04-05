"use client";
import { ReactNode } from "react";


interface WidgetProps {
  children: ReactNode;
  className?: string;
}

const Widget:React.FC<WidgetProps> = ({children, className})=>
{
    return(
        <div className={`Widget bg-card p-4 min-w-40 rounded-xl ${className}`}>
            {children}
        </div>
    );
};

export default Widget;