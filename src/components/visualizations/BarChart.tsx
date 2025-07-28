import React from 'react';

interface BarChartProps {
  data: {
    title: string;
    labels: string[];
    values: number[];
    maxValue?: number;
    color?: string;
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = data.maxValue || Math.max(...data.values);
  const defaultColor = '#3B82F6';
  
  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-2 text-gray-700">{data.title}</h4>
      <div className="space-y-2">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <div className="w-1/4 text-xs text-gray-600 pr-2 truncate" title={label}>
              {label}
            </div>
            <div className="w-3/4 h-6 bg-gray-100 rounded overflow-hidden flex items-center">
              <div 
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${(data.values[index] / maxValue) * 100}%`,
                  backgroundColor: data.color || defaultColor
                }}
              />
              <span className="ml-2 text-xs font-medium">
                {data.values[index]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;