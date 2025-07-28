import React, { useState } from 'react';
import { Search, ArrowRight, Check, ShoppingCart } from 'lucide-react';

const ProductAlternatives: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const popularProducts = [
    { id: '001', name: 'ENT-8000-PRO', displayName: 'Enterprise 8000 Pro Server' },
    { id: '002', name: 'SW-48-PRO', displayName: 'Switch 48-port Pro' },
    { id: '003', name: 'RTR-5G-ADV', displayName: 'Advanced 5G Router' },
  ];
  
  const handleSearch = (term: string = searchTerm) => {
    if (!term.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    setSelectedProduct(null);
    
    // Simulate search delay
    setTimeout(() => {
      const results = [];
      
      if (term.toLowerCase().includes('ent-8000') || term.toLowerCase().includes('server')) {
        results.push({
          id: '001',
          sku: 'ENT-8000-PRO',
          name: 'Enterprise 8000 Pro Server',
          status: 'eol',
          eolDate: '2024-06-30',
          price: 8499,
          specs: {
            processor: '24-core, 2.9GHz',
            memory: '384GB DDR4',
            storage: '16TB configurable',
            ports: '4x 10GbE, 4x 1GbE'
          },
          alternatives: [
            {
              id: '101',
              sku: 'ENT-9000-PLUS',
              name: 'Enterprise 9000 Plus Server',
              status: 'available',
              price: 9299,
              matchScore: 95,
              advantages: [
                'Faster processor (32-core vs 24-core)',
                '33% more memory (512GB vs 384GB)',
                '50% more storage capacity (24TB vs 16TB)',
                'Includes next-gen security features'
              ],
              specs: {
                processor: '32-core, 3.1GHz',
                memory: '512GB DDR4',
                storage: '24TB configurable',
                ports: '8x 10GbE, 4x 1GbE'
              }
            },
            {
              id: '102',
              sku: 'ENT-7500-ADV',
              name: 'Enterprise 7500 Advanced Server',
              status: 'available',
              price: 6499,
              matchScore: 82,
              advantages: [
                'Lower cost (30% savings)',
                'Same processor core count',
                'Adequate for most current workloads',
                'Smaller form factor (2U vs 4U)'
              ],
              specs: {
                processor: '24-core, 2.8GHz',
                memory: '256GB DDR4',
                storage: '12TB configurable',
                ports: '2x 10GbE, 4x 1GbE'
              }
            }
          ]
        });
      }
      
      if (term.toLowerCase().includes('sw-48') || term.toLowerCase().includes('switch')) {
        results.push({
          id: '002',
          sku: 'SW-48-PRO',
          name: 'Switch 48-port Pro',
          status: 'low_stock',
          availableDate: '2025-02-15',
          price: 3999,
          specs: {
            ports: '48x 1GbE, 4x 10GbE SFP+',
            power: '740W PoE+',
            throughput: '176 Gbps',
            features: 'Layer 3, OSPF, BGP'
          },
          alternatives: [
            {
              id: '201',
              sku: 'SW-48-PRO-PLUS',
              name: 'Switch 48-port Pro Plus',
              status: 'available',
              price: 4599,
              matchScore: 98,
              advantages: [
                'Higher PoE budget (820W vs 740W)',
                'Better throughput (200 Gbps vs 176 Gbps)',
                'Includes advanced security features',
                'Enhanced management interface'
              ],
              specs: {
                ports: '48x 1GbE, 4x 25GbE SFP28',
                power: '820W PoE+',
                throughput: '200 Gbps',
                features: 'Layer 3, OSPF, BGP, Advanced Security'
              }
            }
          ]
        });
      }
      
      if (term.toLowerCase().includes('rtr-5g') || term.toLowerCase().includes('router')) {
        results.push({
          id: '003',
          sku: 'RTR-5G-ADV',
          name: 'Advanced 5G Router',
          status: 'eol',
          eolDate: '2023-12-31',
          price: 1299,
          specs: {
            bands: '5G Sub-6GHz',
            wifi: 'WiFi 6',
            ports: '4x 1GbE LAN, 1x 1GbE WAN',
            vpn: 'IPSec, OpenVPN'
          },
          alternatives: [
            {
              id: '301',
              sku: 'RTR-5G-PRO',
              name: 'Professional 5G Router',
              status: 'available',
              price: 1499,
              matchScore: 97,
              advantages: [
                'Supports mmWave 5G bands',
                'WiFi 6E capability',
                'Double the VPN throughput',
                'Improved antenna design'
              ],
              specs: {
                bands: '5G Sub-6GHz + mmWave',
                wifi: 'WiFi 6E',
                ports: '4x 1GbE LAN, 1x 2.5GbE WAN',
                vpn: 'IPSec, OpenVPN, WireGuard'
              }
            },
            {
              id: '302',
              sku: 'RTR-5G-STD',
              name: 'Standard 5G Router',
              status: 'available',
              price: 899,
              matchScore: 80,
              advantages: [
                'Lower cost (30% savings)',
                'Same core 5G capabilities',
                'Adequate for most SMB needs',
                'Smaller form factor'
              ],
              specs: {
                bands: '5G Sub-6GHz',
                wifi: 'WiFi 6',
                ports: '4x 1GbE LAN, 1x 1GbE WAN',
                vpn: 'IPSec only'
              }
            }
          ]
        });
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };
  
  const selectProduct = (product: any) => {
    setSelectedProduct(product);
  };
  
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
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-dark-900 mb-2">Product Alternatives</h2>
        <p className="text-dark-600">
          Nolij's AI identifies suitable replacement options for discontinued or unavailable products 
          based on technical specifications and compatibility requirements.
        </p>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-dark-50 p-3 border-b border-dark-200">
          <h3 className="font-medium text-dark-800">Find Product Alternatives</h3>
        </div>
        <div className="p-4">
          <div className="flex mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter product name or SKU (e.g., ENT-8000-PRO)"
                className="w-full py-2 px-3 pr-10 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-dark-400" />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isSearching || !searchTerm.trim()}
              className={`ml-2 px-4 py-2 rounded-md transition-colors ${
                isSearching || !searchTerm.trim()
                  ? 'bg-dark-200 text-dark-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          <div>
            <div className="text-dark-700 text-sm mb-2">Popular products:</div>
            <div className="flex flex-wrap gap-2">
              {popularProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSearchTerm(product.name);
                    handleSearch(product.name);
                  }}
                  className="px-3 py-1.5 text-sm border border-dark-200 rounded-md hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isSearching && (
        <div className="border rounded-lg p-6 text-center">
          <Search className="h-8 w-8 text-primary-400 mx-auto mb-3 animate-pulse" />
          <p className="text-dark-600">
            Searching for product alternatives...
          </p>
        </div>
      )}
      
      {searchResults.length > 0 && !selectedProduct && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-dark-50 p-3 border-b border-dark-200">
            <h3 className="font-medium text-dark-800">Search Results</h3>
          </div>
          <div className="divide-y divide-dark-200">
            {searchResults.map(product => (
              <div 
                key={product.id} 
                className="p-4 hover:bg-dark-50 transition-colors cursor-pointer"
                onClick={() => selectProduct(product)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-dark-900">{product.name}</h4>
                      <span className="ml-2 text-dark-500 text-sm">{product.sku}</span>
                    </div>
                    <div className="mt-1 flex items-center">
                      {getStatusBadge(product.status)}
                      {product.status === 'eol' && (
                        <span className="ml-2 text-dark-500 text-xs">
                          EOL Date: {new Date(product.eolDate).toLocaleDateString()}
                        </span>
                      )}
                      {product.status === 'low_stock' && (
                        <span className="ml-2 text-dark-500 text-xs">
                          Available: {new Date(product.availableDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-dark-700">
                      {product.alternatives.length} alternative product{product.alternatives.length !== 1 ? 's' : ''} available
                    </div>
                  </div>
                  <div className="text-primary-600">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedProduct && (
        <div className="space-y-5">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="text-primary-600 hover:text-primary-700"
            >
              ← Back to results
            </button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className={`p-4 ${
              selectedProduct.status === 'eol' ? 'bg-red-50 border-b border-red-200' :
              selectedProduct.status === 'low_stock' ? 'bg-amber-50 border-b border-amber-200' :
              'bg-dark-50 border-b border-dark-200'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-dark-900 text-lg">{selectedProduct.name}</h3>
                  <div className="text-dark-500 mt-1">{selectedProduct.sku}</div>
                  <div className="mt-2">
                    {getStatusBadge(selectedProduct.status)}
                    {selectedProduct.status === 'eol' && (
                      <span className="ml-2 text-dark-500 text-sm">
                        EOL Date: {new Date(selectedProduct.eolDate).toLocaleDateString()}
                      </span>
                    )}
                    {selectedProduct.status === 'low_stock' && (
                      <span className="ml-2 text-dark-500 text-sm">
                        Expected: {new Date(selectedProduct.availableDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-dark-900 font-medium">
                  ${selectedProduct.price.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-dark-800 mb-2">Specifications</h4>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(selectedProduct.specs).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <dt className="text-dark-500 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd className="text-dark-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-dark-900 text-lg mb-4">Recommended Alternatives</h3>
            
            {selectedProduct.alternatives.map((alt: any) => (
              <div key={alt.id} className="border rounded-lg overflow-hidden mb-4 hover:border-primary-300 transition-colors">
                <div className="bg-dark-50 p-3 border-b border-dark-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="font-medium text-dark-900">{alt.name}</div>
                    <div className="ml-2 text-dark-500 text-sm">{alt.sku}</div>
                    <div className="ml-3">
                      {getStatusBadge(alt.status)}
                    </div>
                  </div>
                  <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded font-medium text-sm">
                    {alt.matchScore}% Match
                  </div>
                </div>
                <div className="p-4 flex flex-col sm:flex-row">
                  <div className="flex-grow sm:pr-4 sm:border-r border-dark-200">
                    <h4 className="font-medium text-dark-800 mb-2">Key Advantages</h4>
                    <ul className="space-y-1">
                      {alt.advantages.map((adv: string, i: number) => (
                        <li key={i} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-dark-700">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:pl-4 mt-4 sm:mt-0 sm:min-w-[200px]">
                    <div className="text-dark-900 font-medium text-lg mb-2">${alt.price.toLocaleString()}</div>
                    <div className="text-sm text-dark-500 mb-4">
                      {alt.price > selectedProduct.price ? (
                        <span className="text-red-600">+${(alt.price - selectedProduct.price).toLocaleString()} ({Math.round((alt.price / selectedProduct.price - 1) * 100)}%)</span>
                      ) : (
                        <span className="text-green-600">-${(selectedProduct.price - alt.price).toLocaleString()} ({Math.round((1 - alt.price / selectedProduct.price) * 100)}%)</span>
                      )}
                    </div>
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Quote
                    </button>
                  </div>
                </div>
                <div className="px-4 py-3 bg-dark-50 border-t border-dark-200">
                  <div className="flex items-center justify-between cursor-pointer">
                    <button className="text-primary-600 text-sm hover:text-primary-700 transition-colors">
                      View detailed specifications
                    </button>
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAlternatives;