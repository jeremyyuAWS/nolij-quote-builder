import React from 'react';
import { FileText, Settings, ArrowLeftRight, Calendar, Shield, DollarSign } from 'lucide-react';

export const tagData = [
  {
    id: 'missing-components',
    label: 'Document Extraction',
    icon: <FileText className="h-4 w-4" />,
    description: 'Extract data from technical documents automatically'
  },
  {
    id: 'power-budget',
    label: 'Configuration Analysis',
    icon: <Settings className="h-4 w-4" />,
    description: 'Validate technical specifications and requirements'
  },
  {
    id: 'substitution',
    label: 'Product Alternatives',
    icon: <ArrowLeftRight className="h-4 w-4" />,
    description: 'Find alternatives for discontinued products'
  },
  {
    id: 'roadmap',
    label: 'Product Roadmap',
    icon: <Calendar className="h-4 w-4" />,
    description: 'Learn about upcoming features and capabilities'
  },
  {
    id: 'security-analysis',
    label: 'Security Analysis',
    icon: <Shield className="h-4 w-4" />,
    description: 'Analyze network security configurations'
  },
  {
    id: 'cost-optimization',
    label: 'Cost Optimization',
    icon: <DollarSign className="h-4 w-4" />,
    description: 'Identify opportunities to reduce infrastructure costs'
  }
];