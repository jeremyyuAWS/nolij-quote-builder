import { ConversationTopic } from '../../types';

const productRoadmap: ConversationTopic = {
  id: 'product-roadmap',
  title: 'Nolij Product Roadmap',
  description: 'Explore upcoming features and capabilities in the Nolij platform',
  icon: 'Calendar',
  messages: [
    {
      sender: 'user',
      text: 'What\'s on the Nolij product roadmap for the next year? We\'re considering a longer-term implementation.'
    },
    {
      sender: 'agent',
      text: `Nolij has an exciting product roadmap planned for the next year. Here are the key initiatives we're working on:

**Q3 2025 (Next Quarter)**
1. **Advanced Document Extraction** (65% complete)
   - Enhanced capabilities for extracting data from complex technical diagrams
   - Multi-page context awareness for improved accuracy
   - Self-improving extraction models that learn from corrections
   - Support for legacy document formats and technical drawings

2. **Multi-Document Analysis** (40% complete)
   - Cross-reference information across multiple documents
   - Automatically identify inconsistencies between specifications
   - Map technical dependencies across document sets
   - Quote validation using multiple source documents

**Q4 2025**
3. **Industry Verticalization** (15% complete)
   - Specialized document models for healthcare, finance, and manufacturing
   - Industry-specific terminology and compliance validation
   - Vertical-specific workflows and integrations
   - Custom knowledge bases for different sectors

4. **Visual Processing Enhancement** (5% planning phase)
   - Advanced technical diagram understanding
   - Improved image content extraction and analysis
   - Correlation between visual and textual information
   - Interactive visual components in responses

Would you like more details about any of these upcoming features?`,
      visualization: {
        type: 'bar-chart',
        data: {
          title: 'Feature Development Progress',
          labels: ['Advanced Document Extraction', 'Multi-Document Analysis', 'Industry Verticalization', 'Visual Processing'],
          values: [65, 40, 15, 5],
          maxValue: 100,
          color: '#0066FF'
        }
      }
    },
    {
      sender: 'user',
      text: 'Tell me more about the industry verticalization features. We\'re in the manufacturing sector.'
    },
    {
      sender: 'agent',
      text: `I'm glad you're interested in our industry verticalization features, especially for manufacturing. Here's a detailed overview of what's coming for the manufacturing sector in our Q4 2025 release:

**Manufacturing Vertical Specialization**

1. **Manufacturing-Specific Document Models**
   - BOM (Bill of Materials) intelligent parsing and validation
   - Technical drawing and CAD file information extraction
   - Manufacturing process documentation analysis
   - Supply chain documentation standardization

2. **Manufacturing Knowledge Base**
   - Extensive component database with compatibility matrices
   - Industry-standard parts and assemblies recognition
   - Regulatory and compliance documentation references
   - Manufacturing best practices and quality standards

3. **Specialized Analytics for Manufacturing**
   - Supply chain risk analysis based on documentation
   - Component obsolescence prediction and management
   - Production efficiency recommendations
   - Quality control documentation verification

4. **Manufacturing-Specific Integrations**
   - PLM (Product Lifecycle Management) system connections
   - ERP system document synchronization
   - IoT documentation and specification management
   - Digital twin documentation support

5. **Manufacturing Use Cases**
   - Automated quoting for complex assemblies
   - Regulatory compliance documentation verification
   - Technical specification validation against industry standards
   - Component compatibility and substitution analysis

For your manufacturing implementation, these upcoming features will significantly enhance documentation accuracy, reduce manual verification time by approximately 60%, and improve quote accuracy by identifying potential component issues earlier in the process.`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Manufacturing Vertical Benefits',
          labels: ['Document Processing Time', 'Quote Accuracy', 'Compliance Validation', 'Component Analysis', 'Overall Efficiency'],
          values: [40, 92, 95, 90, 75],
          maxValue: 100,
          unit: '%',
          descriptions: [
            '60% reduction in document processing time',
            '92% quote accuracy (vs. industry avg of 78%)',
            '95% compliance validation automation',
            '90% component compatibility analysis accuracy',
            '75% overall efficiency improvement'
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'That sounds promising. How can we stay informed about these upcoming features and potentially join the beta program?'
    },
    {
      sender: 'agent',
      text: `I'm excited about your interest in our upcoming features and beta program! Here are the best ways to stay informed and get involved:

**Staying Informed About Nolij Updates**

1. **Nolij Product Newsletter**
   - Monthly updates on feature development
   - Early access announcements
   - Case studies and implementation examples
   - Sign up at: newsletter.nolij.ai/subscribe

2. **Nolij Customer Portal**
   - Detailed roadmap visibility with timelines
   - Feature request tracking and voting
   - Documentation previews for upcoming capabilities
   - Access at: portal.nolij.ai (use your existing credentials)

**Joining the Manufacturing Beta Program**

Our Manufacturing Vertical Beta Program is scheduled to begin in early Q4 2025 (approximately October). Here's how to participate:

1. **Application Process**
   - Complete the beta application form at: nolij.ai/manufacturing-beta
   - Beta slots are limited to 15 companies in the initial phase
   - Selection criteria include use case diversity and implementation readiness
   - Application deadline: August 15, 2025

2. **Beta Program Benefits**
   - Early access to manufacturing vertical features (2-3 months before public release)
   - Direct input into feature prioritization and refinement
   - Dedicated implementation specialist for beta deployment
   - No additional cost for beta participants

3. **Requirements for Participation**
   - Current Nolij customer on Enterprise tier or higher
   - Willingness to provide regular feedback (bi-weekly sessions)
   - Manufacturing documentation samples for testing and validation
   - Commitment to at least one validated production use case

I'd be happy to connect you with our manufacturing solutions specialist, Jennifer Chen, who can provide more details about the beta program and discuss your specific use cases.`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Beta Program Timeline',
          labels: ['Applications Open', 'Participant Selection', 'Beta Kickoff', 'Feature Testing', 'General Availability'],
          values: [6, 8, 10, 12, 15],
          maxValue: 15,
          unit: '',
          descriptions: [
            'June 2025 - Applications Open',
            'August 2025 - Participant Selection',
            'October 2025 - Beta Program Kickoff',
            'December 2025 - Feature Testing Complete',
            'March 2026 - General Availability'
          ]
        }
      }
    }
  ]
};

export default productRoadmap;