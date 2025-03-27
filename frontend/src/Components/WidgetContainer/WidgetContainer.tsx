import { ReactNode } from "react";

interface WidgetContainerProps {
    title?: string;
    children: ReactNode;
}

const WidgetContainer:React.FC<WidgetContainerProps> = ({title, children})=>
{
    return(
        <div className='WidgetContainer' >
            {title && 
                <p className="font-bold text-2xl mb-6">{title}</p>
            }
            <div className="flex flex-wrap gap-6">{children}</div>
        </div>
    );
};

export default WidgetContainer;