"use client";

import React, { ReactElement, ReactNode, useState } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';

interface AccordionProps
{
    ClosedIcon?: ReactElement;
    OpenedIcon?: ReactElement;
    title: string | ReactNode;
    open?: boolean;
    className?: string;
    children: ReactNode;
}

const isString = (value: string|ReactNode): value is string => typeof value === 'string';


const Accordion: React.FC<AccordionProps> = ({ClosedIcon=<ChevronLeft/>, OpenedIcon=<ChevronDown/>, title, open=false, className, children })=>
{
    const [isOpenAccordion, setIsOpenAccordion] = useState(open);


    const handleAccordionToggle = () =>
    {
        setIsOpenAccordion(!isOpenAccordion);
    }

    return(
        <div className={`Accordion border-2 border-accent p-2 pl-3 rounded-2xl ${className}`} >
            <button 
                onClick={handleAccordionToggle} 
                className='flex justify-between w-full items-center cursor-pointer'
                aria-expanded={isOpenAccordion}
                aria-controls="accordion-content"
            >
                {isString(title)?<span>{title}</span>:title}
                {isOpenAccordion?OpenedIcon:ClosedIcon}
            </button>
            <div id='accordion-content' className='py-4' hidden={!isOpenAccordion}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;