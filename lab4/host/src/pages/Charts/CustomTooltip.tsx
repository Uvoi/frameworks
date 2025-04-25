import React from "react";
import { TooltipProps } from "recharts";
import { ReactNode } from "react";

interface CustomTooltipProps extends TooltipProps<number, string> {
  labelFormatter?: (label: any) => ReactNode;
  yLabel?: string;
}

const CustomTooltip = ({ active, payload, label, yLabel = "y" }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card text-foreground p-2 rounded shadow-md border border-foreground/10 text-sm">
        <p>{label}</p>
        <p>
          <span className="font-semibold">{yLabel}:</span> {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;