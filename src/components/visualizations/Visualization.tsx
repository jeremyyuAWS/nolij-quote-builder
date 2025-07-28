import React from 'react';
import BarChart from './BarChart';
import CompatibilityMatrix from './CompatibilityMatrix';
import ProductTable from './ProductTable';
import InteractiveBarChart from './InteractiveBarChart';
import NetworkDiagram from './NetworkDiagram';
import ProductComparison from './ProductComparison';
import ExportButton from './ExportButton';

interface VisualizationProps {
  type: string;
  data: any;
}

const Visualization: React.FC<VisualizationProps> = ({ type, data }) => {
  const renderVisualization = () => {
    switch (type) {
      case 'bar-chart':
        return <BarChart data={data} />;
      case 'interactive-bar-chart':
        return <InteractiveBarChart data={data} />;
      case 'compatibility-matrix':
        return <CompatibilityMatrix data={data} />;
      case 'product-table':
        return <ProductTable data={data} />;
      case 'network-diagram':
        return <NetworkDiagram data={data} />;
      case 'product-comparison':
        return <ProductComparison data={data} />;
      default:
        return <div className="text-sm text-gray-500">Unsupported visualization type</div>;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">{data.title || type}</h4>
        <ExportButton data={data} type={type} />
      </div>
      {renderVisualization()}
    </div>
  );
};

export default Visualization;