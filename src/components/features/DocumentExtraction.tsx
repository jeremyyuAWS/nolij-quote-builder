import React, { useState } from 'react';
import { FileUp, Check, AlertCircle } from 'lucide-react';

const DocumentExtraction: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setProcessingStatus('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessingStatus('complete');
      setExtractedData({
        title: "Technical Specification - Network Infrastructure",
        documentType: "Technical Documentation",
        components: [
          { name: "SW-24-POE Switch", quantity: 1, status: "Primary Component" },
          { name: "POE-CORD-NA", quantity: 0, status: "Missing" },
          { name: "NET-ADV-1YR License", quantity: 0, status: "Recommended" }
        ],
        specifications: {
          powerRequirements: "370W PoE capacity",
          connectivity: "24 ports, 2 SFP+ uplinks",
          mountingOptions: "Rack or desk mount"
        },
        confidence: 0.92
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-dark-900 mb-2">Intelligent Document Extraction</h2>
        <p className="text-dark-600">
          Nolij's AI automatically extracts key information from technical documentation, 
          identifies required components, and validates configurations against specifications.
        </p>
      </div>

      {!uploadedFile && (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-primary-400 bg-primary-50' : 'border-dark-300 hover:border-primary-400 hover:bg-primary-50'
          } transition-colors`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileUp className="h-10 w-10 mx-auto text-dark-400 mb-3" />
          <p className="text-dark-700 mb-2">Drag and drop your document here</p>
          <p className="text-dark-500 text-sm mb-4">Supports PDF, DOCX, CSV, and more</p>
          
          <label className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors cursor-pointer inline-block">
            Browse Files
            <input
              type="file"
              className="hidden"
              onChange={handleChange}
              accept=".pdf,.docx,.csv,.txt,.xlsx"
            />
          </label>
        </div>
      )}

      {uploadedFile && processingStatus === 'processing' && (
        <div className="border rounded-lg p-6 bg-dark-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center mr-3">
                <FileUp className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-dark-900">{uploadedFile.name}</h3>
                <p className="text-dark-500 text-sm">{Math.round(uploadedFile.size / 1024)} KB</p>
              </div>
            </div>
            <div className="text-primary-600 animate-pulse">Processing...</div>
          </div>
          
          <div className="w-full bg-dark-200 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full animate-[progress_2.5s_ease-in-out]" style={{width: '100%'}}></div>
          </div>
          
          <p className="text-dark-500 text-sm mt-3">
            Extracting component information, validating specifications, and analyzing configurations...
          </p>
        </div>
      )}

      {processingStatus === 'complete' && extractedData && (
        <div className="space-y-5">
          <div className="border rounded-lg p-4 bg-green-50 border-green-200 flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-dark-900">Document Successfully Processed</h3>
              <p className="text-dark-600 text-sm">
                Nolij extracted information with {Math.round(extractedData.confidence * 100)}% confidence
              </p>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-dark-50 p-3 border-b border-dark-200">
              <h3 className="font-medium text-dark-800">Document Information</h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <dt className="text-dark-500 text-sm">Document Title</dt>
                  <dd className="text-dark-900 font-medium">{extractedData.title}</dd>
                </div>
                <div>
                  <dt className="text-dark-500 text-sm">Document Type</dt>
                  <dd className="text-dark-900">{extractedData.documentType}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-dark-50 p-3 border-b border-dark-200">
              <h3 className="font-medium text-dark-800">Extracted Components</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-dark-700 text-sm font-medium">Component</th>
                    <th className="px-4 py-2 text-left text-dark-700 text-sm font-medium">Quantity</th>
                    <th className="px-4 py-2 text-left text-dark-700 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-200">
                  {extractedData.components.map((component: any, index: number) => (
                    <tr key={index} className={component.status === "Missing" ? "bg-red-50" : ""}>
                      <td className="px-4 py-3 text-dark-900">{component.name}</td>
                      <td className="px-4 py-3 text-dark-900">{component.quantity}</td>
                      <td className="px-4 py-3">
                        {component.status === "Missing" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {component.status}
                          </span>
                        ) : component.status === "Recommended" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            {component.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            {component.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-dark-50 p-3 border-b border-dark-200">
              <h3 className="font-medium text-dark-800">Technical Specifications</h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(extractedData.specifications).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <dt className="text-dark-500 text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</dt>
                    <dd className="text-dark-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => {
                setUploadedFile(null);
                setProcessingStatus('idle');
                setExtractedData(null);
              }}
              className="bg-dark-100 text-dark-700 px-4 py-2 rounded-md hover:bg-dark-200 transition-colors"
            >
              Process Another Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentExtraction;