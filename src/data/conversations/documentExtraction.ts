import { ConversationTopic } from '../../types';

const documentExtraction: ConversationTopic = {
  id: 'document-extraction',
  title: 'Document Extraction Capabilities',
  description: 'Learn how Nolij extracts critical information from complex technical documentation',
  icon: 'FileText',
  messages: [
    {
      sender: 'user',
      text: 'I have a large set of network equipment specifications. Can Nolij extract the key information automatically?'
    },
    {
      sender: 'agent',
      text: `I've analyzed your network equipment specifications and extracted the following key information:

1. Core Network Equipment:
   - SW-48-PRO Switch (48 ports, 4x 10GbE uplinks)
   - RTR-5G-ADV Routers (3 units)
   - FW-UTM-2000 Firewall

2. Missing Components:
   - POE-CORD-NA power cords (required for PoE operation)
   - NET-ADV-1YR licenses (recommended for advanced features)

3. Technical Requirements:
   - 740W PoE+ power budget
   - Support for 176 Gbps throughput
   - Layer 3 routing capabilities required

Would you like me to generate a compatibility report for these components?`,
      visualization: {
        type: 'product-table',
        data: {
          title: 'Extracted Network Components',
          products: [
            {
              sku: 'SW-48-PRO',
              name: '48-Port Pro Switch',
              status: 'available',
              alternativeSku: '',
              alternativeName: ''
            },
            {
              sku: 'RTR-5G-ADV',
              name: 'Advanced 5G Router',
              status: 'available',
              alternativeSku: '',
              alternativeName: ''
            },
            {
              sku: 'FW-UTM-2000',
              name: 'UTM Firewall 2000',
              status: 'available',
              alternativeSku: '',
              alternativeName: ''
            },
            {
              sku: 'POE-CORD-NA',
              name: 'PoE Power Cord (North America)',
              status: 'low_stock',
              alternativeSku: '',
              alternativeName: ''
            },
            {
              sku: 'NET-ADV-1YR',
              name: 'Advanced Features License (1 Year)',
              status: 'available',
              alternativeSku: '',
              alternativeName: ''
            }
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'Yes, please generate a compatibility report. Also, are there any issues with the current configuration?'
    },
    {
      sender: 'agent',
      text: `Here's the compatibility report for your network equipment:

The configuration is generally valid, but I've identified several issues that need attention:

1. **Power Requirements**: The SW-48-PRO requires POE-CORD-NA for full PoE operation. Without these cords, the switches won't provide power to connected devices.

2. **License Gap**: The NET-ADV-1YR license is required for advanced features including:
   - Layer 3 routing protocols (OSPF, BGP)
   - Advanced security monitoring
   - API integration capabilities

3. **Throughput Analysis**: Your current configuration supports 176 Gbps throughput, which is sufficient for your documented requirements of 150 Gbps.

Would you like recommendations for resolving these issues?`,
      visualization: {
        type: 'compatibility-matrix',
        data: {
          title: 'Network Configuration Compatibility',
          headers: ['Power', 'Licensing', 'Throughput', 'Mounting'],
          rows: [
            { 
              name: 'Current Config', 
              values: ['warning', 'warning', 'compatible', 'compatible'] 
            }
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'Please provide recommendations to resolve these issues.'
    },
    {
      sender: 'agent',
      text: `Based on the document analysis, here are my recommendations to resolve the identified issues:

1. **Power Requirements**:
   - Add 3x POE-CORD-NA to your order (one for each switch)
   - Alternative: POE-CORD-UNI universal power cords are also compatible

2. **License Requirements**:
   - Add 3x NET-ADV-1YR licenses (one per switch)
   - Consider NET-ADV-3YR for 15% cost savings over 3 years

3. **Additional Recommendations**:
   - Add SFP-10G-SR modules for fiber uplinks between switches
   - Consider redundant power supplies (PWR-RPS-500) for critical infrastructure
   - Review cooling requirements for rack installation

These recommendations are based on the technical specifications from pages 12-15 of your document and the compatibility matrix on page 23.

Would you like me to update your configuration with these additions?`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Configuration Readiness After Recommendations',
          labels: ['Power', 'Licensing', 'Throughput', 'Security', 'Overall'],
          values: [100, 100, 100, 85, 96],
          maxValue: 100,
          unit: '%',
          descriptions: [
            'Power requirements fully addressed with POE-CORD-NA',
            'Licensing requirements addressed with NET-ADV-1YR',
            'Throughput requirements satisfied with current hardware',
            'Advanced security features recommended but optional',
            'Overall configuration readiness after recommendations'
          ]
        }
      }
    }
  ]
};

export default documentExtraction;