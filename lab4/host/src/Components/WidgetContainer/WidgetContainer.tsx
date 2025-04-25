
import React, { ReactNode } from "react";

interface WidgetContainerProps {
    title?: string;
    className?: string;
    elementsClassName?: string;
    children: ReactNode;
}

const WidgetContainer:React.FC<WidgetContainerProps> = ({title, className, elementsClassName, children})=>
{
    return(
        <div className={`WidgetContainer w-full ${className}`}  >
            {title && 
                <p className="font-bold text-2xl mb-6">{title}</p>
            }
            <div className={`flex flex-wrap gap-6 ${elementsClassName}`}>{children}</div>
        </div>
    );
};

export default WidgetContainer;