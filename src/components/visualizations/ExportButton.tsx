import React, { useState } from 'react';
import { Download, ChevronDown, FileText, FileSpreadsheet, Share2, Check } from 'lucide-react';

interface ExportButtonProps {
  data: any;
  type: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, type }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const exportOptions = [
    { id: 'pdf', label: 'Export as PDF', icon: <FileText className="h-4 w-4" /> },
    { id: 'csv', label: 'Export as CSV', icon: <FileSpreadsheet className="h-4 w-4" /> },
    { id: 'share', label: 'Copy share link', icon: <Share2 className="h-4 w-4" /> },
  ];
  
  const handleExport = (format: string) => {
    // In a real implementation, these would make API calls or use libraries
    // to generate the exports. For now, we'll just simulate the actions.
    
    if (format === 'pdf') {
      // Simulate PDF download
      alert(`PDF export of ${data.title} would download here`);
    } else if (format === 'csv') {
      // Create and download CSV
      let csvContent = 'data:text/csv;charset=utf-8,';
      
      // Add header row based on data structure
      if (data.labels && data.values) {
        // For chart data
        csvContent += `Category,Value\n`;
        data.labels.forEach((label: string, i: number) => {
          csvContent += `${label},${data.values[i]}\n`;
        });
      } else if (type === 'product-table' && data.products) {
        // For product tables
        csvContent += `SKU,Product,Status,Alternative\n`;
        data.products.forEach((product: any) => {
          csvContent += `${product.sku},${product.name},${product.status},${product.alternativeSku || ''}\n`;
        });
      } else {
        // Generic JSON to CSV conversion
        csvContent += JSON.stringify(data);
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${data.title.replace(/\s+/g, '_')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'share') {
      // Generate and copy a share link
      const shareLink = `https://app.nolij.ai/share/${type}/${btoa(JSON.stringify(data)).substring(0, 20)}`;
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    
    setShowDropdown(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Download className="h-4 w-4 mr-1" />
        <span className="sr-only md:not-sr-only md:inline">Export</span>
        <ChevronDown className="h-3 w-3 ml-0.5" />
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
          {exportOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              {option.id === 'share' && copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Link copied!</span>
                </>
              ) : (
                <>
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportButton;