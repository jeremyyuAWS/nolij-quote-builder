export const conversations: {
  [key: string]: {
    title: string;
    description: string;
    messages: Array<{
      sender: 'user' | 'agent';
      text: string;
      visualization?: {
        type: string;
        data: any;
      };
    }>;
  };
} = {
  'missing-components': {
    title: 'Document Extraction Demo',
    description: 'See how Nolij extracts data from technical documents',
    messages: [
      {
        sender: 'user',
        text: 'I have some technical specification documents for a network project. Can Nolij extract the configuration details automatically?'
      },
      {
        sender: 'agent',
        text: `I've analyzed your technical documents and extracted the key configuration details. Our system has identified that your quote is missing the POE-CORD-NA power cord required for full operation. Additionally, based on your specifications, I recommend adding the NET-ADV-1YR license to enable the advanced features your project requires.`,
        visualization: {
          type: 'compatibility-matrix',
          data: {
            title: 'Network Configuration Analysis',
            headers: ['PoE Devices', 'AC Input', 'Controller'],
            rows: [
              { 
                name: 'Extracted Configuration', 
                values: ['compatible', 'warning', 'compatible'] 
              }
            ]
          }
        }
      },
      {
        sender: 'user',
        text: 'What other components would Nolij recommend based on my documents?'
      },
      {
        sender: 'agent',
        text: 'Based on the technical documents you provided, Nolij recommends adding these additional components:\n\n1. POE-CORD-NA: Power cord (required)\n2. NET-ADV-1YR: Advanced features license (recommended)\n3. MOUNT-KIT-S: Rack mounting kit (optional)\n4. SFP-10G-SR: 10GbE SFP+ module for uplink (optional)\n\nOur document understanding technology identified these requirements by analyzing the system architecture diagrams, power specifications, and feature requirements mentioned in your technical documentation. Would you like me to provide specific page references from your documents that support these recommendations?'
      }
    ]
  },
  'power-budget': {
    title: 'Configuration Analysis Demo',
    description: 'See how Nolij validates technical specifications',
    messages: [
      {
        sender: 'user',
        text: 'Our technical team submitted a network configuration with 12 security cameras and 8 VoIP phones. Can Nolij analyze if this setup is technically valid?'
      },
      {
        sender: 'agent',
        text: `I've analyzed your network configuration requirements. Nolij's configuration analysis shows that your setup requires 116W of PoE power (12 cameras at 5W each, 8 phones at 7W each). This is well within the 370W capacity of the specified network hardware, giving you a comfortable power budget with 69% remaining capacity.`,
        visualization: {
          type: 'bar-chart',
          data: {
            title: 'Power Requirement Analysis',
            labels: ['Available Capacity', 'Current Usage', 'Remaining'],
            values: [370, 116, 254],
            maxValue: 370,
            color: '#0066FF'
          }
        }
      },
      {
        sender: 'user',
        text: 'How much more can our infrastructure handle?'
      },
      {
        sender: 'agent',
        text: 'Based on Nolij\'s analysis of your current infrastructure:\n\n• Power Capacity: You\'re using 116W of your 370W power budget, leaving 254W available\n• Port Availability: Your hardware has 24 total ports with 20 already in use (12 cameras + 8 phones)\n\nThis means you could add:\n- Up to 4 more devices without requiring additional switches (port constraint)\n- Up to 50 more 5W devices if you had additional switches (power constraint)\n\nNolij recommends planning for an additional switch if you anticipate scaling beyond 24 total devices in this location. Our analysis also suggests implementing a power monitoring system since you\'re planning to utilize more than 50% of your available power capacity.'
      }
    ]
  },
  'substitution': {
    title: 'Product Alternatives Demo',
    description: 'See how Nolij suggests product alternatives',
    messages: [
      {
        sender: 'user',
        text: 'Our project specifies the ENT-8000-PRO server, but I\'ve heard it\'s being discontinued. Can Nolij suggest alternatives based on our requirements?'
      },
      {
        sender: 'agent',
        text: 'Based on your project requirements and the specification documents you provided, Nolij has identified suitable alternatives for the discontinued ENT-8000-PRO server. Our document analysis suggests the ENT-9000-PLUS as the direct replacement with enhanced capabilities, while the ENT-7500-ADV could be a more cost-effective option that still meets your core requirements.',
        visualization: {
          type: 'product-table',
          data: {
            title: 'Recommended Alternatives',
            products: [
              {
                sku: 'ENT-8000-PRO',
                name: 'Enterprise 8000 Pro Server',
                status: 'eol',
                alternativeSku: 'ENT-9000-PLUS',
                alternativeName: 'Enterprise 9000 Plus Server (Enhanced)'
              },
              {
                sku: 'ENT-9000-PLUS',
                name: 'Enterprise 9000 Plus Server',
                status: 'available',
              },
              {
                sku: 'ENT-7500-ADV',
                name: 'Enterprise 7500 Advanced Server',
                status: 'available',
              }
            ]
          }
        }
      },
      {
        sender: 'user',
        text: 'How do these alternatives compare in terms of specifications and compatibility?'
      },
      {
        sender: 'agent',
        text: 'Nolij\'s analysis of your technical requirements compared to the available alternatives shows:\n\n**ENT-9000-PLUS (Recommended):**\n- Processing: 20% faster than ENT-8000-PRO (32-core vs 24-core)\n- Memory: 512GB RAM (vs 384GB in the original model)\n- Storage: 24TB configurable (vs 16TB)\n- 100% compatible with your existing infrastructure\n- Supports all software applications in your environment\n- Includes next-gen security features absent in the discontinued model\n\n**ENT-7500-ADV (Cost-effective alternative):**\n- Processing: Similar to ENT-8000-PRO (24-core)\n- Memory: 256GB RAM (sufficient for your current workloads)\n- Storage: 12TB configurable (adequate based on your utilization data)\n- 100% compatible with existing infrastructure\n- Supports all critical applications (may require minor configuration changes)\n\nBased on the capacity planning documentation you provided, the ENT-9000-PLUS offers better future-proofing, while the ENT-7500-ADV meets your current requirements with a 30% cost reduction.'
      }
    ]
  },
  'roadmap': {
    title: 'Nolij Product Roadmap',
    description: 'Learn about upcoming Nolij features',
    messages: [
      {
        sender: 'user',
        text: 'What\'s next on Nolij\'s product roadmap? I\'d like to know what new features are coming.'
      },
      {
        sender: 'agent',
        text: 'Nolij is expanding our document intelligence platform with several exciting capabilities planned for our roadmap. Here are the key initiatives we\'re currently working on:',
        visualization: {
          type: 'bar-chart',
          data: {
            title: 'Nolij Roadmap Priorities',
            labels: ['Advanced Extraction', 'Multi-doc Analysis', 'Industry Verticalization', 'Visual Processing'],
            values: [90, 75, 60, 45],
            maxValue: 100,
            color: '#0066FF'
          }
        }
      },
      {
        sender: 'user',
        text: 'Can you tell me more about the industry verticalization and visual processing features?'
      },
      {
        sender: 'agent',
        text: 'Absolutely! Here are the details about these upcoming Nolij features:\n\n**Industry Verticalization (Q3 2025)**\nNolij is developing specialized document understanding models for key industries:\n\n• Healthcare: Automated processing of medical records, insurance forms, and clinical documentation with HIPAA-compliant workflows\n• Financial Services: Enhanced extraction from complex financial statements, investment prospectuses, and regulatory filings\n• Manufacturing: Specialized capabilities for BOM analysis, CAD/technical drawing interpretation, and supply chain documentation\n\nEach vertical solution will include pre-trained models, industry-specific terminology understanding, and compliance-aware processing.\n\n**Visual Processing Enhancement (Q4 2025)**\nThis initiative expands Nolij\'s capabilities beyond text analysis to include:\n\n• Diagram & Schematic Analysis: Automated interpretation of technical diagrams, flowcharts, and engineering schematics\n• Image Content Extraction: Identifying and extracting meaningful information from embedded images in documents\n• Visual-Textual Correlation: Connecting visual elements with related textual content for comprehensive understanding\n\nThese capabilities will be especially valuable for technical documentation, product manuals, and visual-heavy content like architectural plans or engineering documentation.'
      }
    ]
  }
};