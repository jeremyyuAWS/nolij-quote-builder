import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface InteractiveBarChartProps {
  data: {
    title: string;
    labels: string[];
    values: number[];
    maxValue?: number;
    color?: string;
    unit?: string;
    descriptions?: string[];
  };
}

const InteractiveBarChart: React.FC<InteractiveBarChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const defaultColor = '#3B82F6';
  const hoverColor = '#2563EB';
  
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.title,
        data: data.values,
        backgroundColor: data.values.map((_, index) => 
          index === hoveredIndex ? hoverColor : data.color || defaultColor
        ),
        borderColor: 'transparent',
        borderRadius: 4,
        barThickness: 24,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar'>[]) => {
            return data.labels[tooltipItems[0].dataIndex];
          },
          label: (tooltipItem: TooltipItem<'bar'>) => {
            const value = data.values[tooltipItem.dataIndex];
            const unit = data.unit || '';
            const description = data.descriptions?.[tooltipItem.dataIndex] || '';
            return [
              `Value: ${value}${unit}`,
              description ? `Note: ${description}` : '',
            ].filter(Boolean);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: data.maxValue || undefined,
        ticks: {
          callback: (value: number) => {
            return `${value}${data.unit || ''}`;
          },
        },
      },
    },
    onHover: (_: any, elements: any[]) => {
      if (elements.length > 0) {
        setHoveredIndex(elements[0].index);
      } else {
        setHoveredIndex(null);
      }
    },
  };
  
  return (
    <div className="w-full h-64 relative">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default InteractiveBarChart;