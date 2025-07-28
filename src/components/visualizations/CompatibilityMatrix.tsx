import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface CompatibilityMatrixProps {
  data: {
    title: string;
    headers: string[];
    rows: {
      name: string;
      values: ('compatible' | 'incompatible' | 'warning')[];
    }[];
  };
}

const CompatibilityMatrix: React.FC<CompatibilityMatrixProps> = ({ data }) => {
  const renderIcon = (value: 'compatible' | 'incompatible' | 'warning') => {
    switch (value) {
      case 'compatible':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'incompatible':
        return <X className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <h4 className="text-sm font-medium mb-2 text-gray-700">{data.title}</h4>
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-3 text-left font-medium text-gray-500"></th>
            {data.headers.map((header, index) => (
              <th key={index} className="py-2 px-3 text-center font-medium text-gray-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="py-2 px-3 font-medium text-gray-800">{row.name}</td>
              {row.values.map((value, cellIndex) => (
                <td key={cellIndex} className="py-2 px-3 text-center">
                  {renderIcon(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompatibilityMatrix;