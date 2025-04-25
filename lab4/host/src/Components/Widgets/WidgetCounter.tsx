import React from "react";
import Widget from "./Widget";
import { LucideIcon } from "lucide-react";

interface WidgetCounterProps {
  icon: LucideIcon;
  number: number;
  suffix?: string;
  title: string;
  color?: string;
}

const WidgetCounter: React.FC<WidgetCounterProps> = ({ icon: Icon, number, suffix, title, color = "primary" }) => {
  return (
    <Widget className="flex items-center gap-5 justify-center">
      <Icon size={50} className={`text-${color}`}/>
      <div className="flex flex-col">
        <span className={`font-bold text-2xl text-${color}`}>{number} {suffix}</span>
        <span className="text-muted">{title}</span>
      </div>
    </Widget>
  );
};

export default WidgetCounter;
