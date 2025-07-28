import React from 'react';

interface Product {
  sku: string;
  name: string;
  status: 'available' | 'eol' | 'low_stock';
  price?: number;
  alternativeSku?: string;
  alternativeName?: string;
}

interface ProductTableProps {
  data: {
    title: string;
    products: Product[];
  };
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">Available</span>;
      case 'eol':
        return <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-red-100 text-red-800">End of Life</span>;
      case 'low_stock':
        return <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Low Stock</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <h4 className="text-sm font-medium mb-2 text-gray-700">{data.title}</h4>
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-2 px-3 text-left font-medium text-gray-500">SKU</th>
            <th className="py-2 px-3 text-left font-medium text-gray-500">Product</th>
            <th className="py-2 px-3 text-left font-medium text-gray-500">Status</th>
            <th className="py-2 px-3 text-left font-medium text-gray-500">Alternative</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.products.map((product, index) => (
            <tr key={index} className={product.status !== 'available' ? 'bg-gray-50' : ''}>
              <td className="py-2 px-3 font-mono text-xs">{product.sku}</td>
              <td className="py-2 px-3">{product.name}</td>
              <td className="py-2 px-3">{getStatusBadge(product.status)}</td>
              <td className="py-2 px-3">
                {product.alternativeSku && (
                  <div>
                    <div className="font-mono text-xs">{product.alternativeSku}</div>
                    <div className="text-xs text-gray-600">{product.alternativeName}</div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;