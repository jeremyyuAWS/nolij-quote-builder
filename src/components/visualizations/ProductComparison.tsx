import React, { useState } from 'react';
import { Check, X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  status: 'available' | 'eol' | 'low_stock';
  price?: number;
  specs: Record<string, any>;
  rating?: number;
  matchScore?: number;
}

interface ProductComparisonProps {
  data: {
    title: string;
    originalProduct: Product;
    alternatives: Product[];
    specCategories?: {
      name: string;
      specs: string[];
      icon?: JSX.Element;
    }[];
  };
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ data }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['all']);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Available</span>;
      case 'eol':
        return <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">End of Life</span>;
      case 'low_stock':
        return <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Low Stock</span>;
      default:
        return null;
    }
  };
  
  const getMatchScoreBadge = (score?: number) => {
    if (!score) return null;
    
    let colorClass = 'bg-gray-100 text-gray-800';
    if (score >= 95) colorClass = 'bg-green-100 text-green-800';
    else if (score >= 80) colorClass = 'bg-blue-100 text-blue-800';
    else if (score >= 60) colorClass = 'bg-amber-100 text-amber-800';
    else colorClass = 'bg-red-100 text-red-800';
    
    return (
      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${colorClass}`}>
        {score}% Match
      </span>
    );
  };
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Get all specs from all products
  const getAllSpecKeys = () => {
    if (data.specCategories) {
      return data.specCategories.flatMap(category => category.specs);
    }
    
    const allSpecs = new Set<string>();
    
    // Add specs from original product
    if (data.originalProduct.specs) {
      Object.keys(data.originalProduct.specs).forEach(key => allSpecs.add(key));
    }
    
    // Add specs from alternatives
    data.alternatives.forEach(product => {
      if (product.specs) {
        Object.keys(product.specs).forEach(key => allSpecs.add(key));
      }
    });
    
    return Array.from(allSpecs);
  };
  
  const specKeys = getAllSpecKeys();
  const specCategories = data.specCategories || [{ name: 'all', specs: specKeys }];
  
  // Format spec value
  const formatSpecValue = (value: any) => {
    if (value === true) return <Check className="h-4 w-4 text-green-500" />;
    if (value === false) return <X className="h-4 w-4 text-red-500" />;
    if (value === null || value === undefined) return <span className="text-gray-400">—</span>;
    return value.toString();
  };
  
  // Highlight better specs
  const isSpecBetter = (spec: string, value: any, originalValue: any) => {
    // Handle boolean values
    if (typeof value === 'boolean' && typeof originalValue === 'boolean') {
      return value === true && originalValue === false;
    }
    
    // Handle numeric values, higher is better unless the spec name suggests otherwise
    if (typeof value === 'number' && typeof originalValue === 'number') {
      const lowerIsBetter = /power consumption|latency|weight|size|noise/i.test(spec);
      return lowerIsBetter ? value < originalValue : value > originalValue;
    }
    
    return false;
  };
  
  return (
    <div className="overflow-x-auto">
      <div className="mt-2 min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44">
                  Feature
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {data.originalProduct.name}
                  <div className="mt-1 text-gray-400 normal-case">{data.originalProduct.sku}</div>
                </th>
                {data.alternatives.map(product => (
                  <th key={product.id} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {product.name}
                    <div className="mt-1 text-gray-400 normal-case">{product.sku}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Status row */}
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">Status</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {getStatusBadge(data.originalProduct.status)}
                </td>
                {data.alternatives.map(product => (
                  <td key={product.id} className="px-4 py-2 text-sm text-gray-500">
                    {getStatusBadge(product.status)}
                  </td>
                ))}
              </tr>
              
              {/* Price row */}
              {data.originalProduct.price !== undefined && (
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">Price</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    ${data.originalProduct.price?.toLocaleString()}
                  </td>
                  {data.alternatives.map(product => (
                    <td 
                      key={product.id} 
                      className={`px-4 py-2 text-sm ${
                        product.price && data.originalProduct.price && product.price < data.originalProduct.price
                          ? 'text-green-600 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      {product.price !== undefined ? (
                        <>
                          ${product.price.toLocaleString()}
                          {product.price !== data.originalProduct.price && data.originalProduct.price && (
                            <span className="ml-1 text-xs">
                              {product.price > data.originalProduct.price ? (
                                <span className="text-red-500">
                                  (+{Math.round((product.price / data.originalProduct.price - 1) * 100)}%)
                                </span>
                              ) : (
                                <span className="text-green-500">
                                  (-{Math.round((1 - product.price / data.originalProduct.price) * 100)}%)
                                </span>
                              )}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              )}
              
              {/* Match score row */}
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">Compatibility</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  Original product
                </td>
                {data.alternatives.map(product => (
                  <td key={product.id} className="px-4 py-2 text-sm text-gray-500">
                    {getMatchScoreBadge(product.matchScore)}
                  </td>
                ))}
              </tr>
              
              {/* Spec categories */}
              {specCategories.map(category => (
                <React.Fragment key={category.name}>
                  <tr className="bg-gray-100 cursor-pointer hover:bg-gray-200" onClick={() => toggleCategory(category.name)}>
                    <td 
                      colSpan={2 + data.alternatives.length}
                      className="px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
                    >
                      {expandedCategories.includes(category.name) ? (
                        <ChevronUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      )}
                      {category.name !== 'all' ? category.name : 'Specifications'}
                    </td>
                  </tr>
                  
                  {expandedCategories.includes(category.name) && category.specs.map(spec => (
                    <tr key={spec} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {spec.charAt(0).toUpperCase() + spec.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {formatSpecValue(data.originalProduct.specs[spec])}
                      </td>
                      {data.alternatives.map(product => {
                        const value = product.specs[spec];
                        const originalValue = data.originalProduct.specs[spec];
                        const isBetter = isSpecBetter(spec, value, originalValue);
                        
                        return (
                          <td 
                            key={product.id} 
                            className={`px-4 py-2 text-sm ${
                              isBetter ? 'text-green-600 font-medium' : 'text-gray-500'
                            }`}
                          >
                            {formatSpecValue(value)}
                            {isBetter && (
                              <span className="ml-1 text-xs text-green-500">
                                ↑
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;