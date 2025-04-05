"use client";

import { useMemo } from "react";
import Widget from "./Widget";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import CustomTooltip from "@/app/charts/CustomTooltip";

interface WidgetChartProps {
  data: Record<string, number[] | string[]>;
  yKey: string;
  xKey: string;
  title?: string;
  color?: string;
  size?: 'small' | 'big';
}

const WidgetChart: React.FC<WidgetChartProps> = ({
  data,
  xKey,
  yKey,
  title,
  color = "primary",
  size = "small",
}) => {
  const formattedData = useMemo(() => {
    const xValues = data[xKey] as string[]; // например "Время"
    const yValues = data[yKey] as number[];
    return xValues.map((x, index) => ({
      x,
      y: yValues[index],
    }));
  }, [data, xKey, yKey]);

  return (
    <Widget className={`flex flex-col items-center gap-5 justify-center min-w-50 ${size === 'big' ? 'w-full' : ''}`}>
      <div className={`w-full min-h-30 ${size === 'big' ? 'h-[34vh]' : ''}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ bottom: 20, top:5}}>
            {size === 'big' && <XAxis dataKey="x" tickMargin={20}/>}
            <YAxis hide={size !== 'big'} domain={["dataMin", "dataMax"]} />
            {size === 'big' && <Tooltip content={<CustomTooltip yLabel={yKey} />} />}
            <Line
              type="monotone"
              dataKey="y"
              stroke={`var(--color-${color})`}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {title && <span className="font-bold text-2xl">{title}</span>}
    </Widget>
  );
};

export default WidgetChart;
