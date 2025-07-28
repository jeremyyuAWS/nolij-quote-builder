import { ConversationTopic } from '../../types';

const productAlternatives: ConversationTopic = {
  id: 'product-alternatives',
  title: 'Product Alternatives & Compatibility',
  description: 'Discover how Nolij recommends alternatives for EOL or unavailable products',
  icon: 'ArrowLeftRight',
  messages: [
    {
      sender: 'user',
      text: 'Our project specifies the ENT-8000-PRO server, but we just found out it\'s been discontinued. What alternatives can you recommend?'
    },
    {
      sender: 'agent',
      text: `I've analyzed the ENT-8000-PRO server's specifications and identified that it has indeed reached End-of-Life (EOL) status as of June 30, 2024. Based on your project requirements, I've identified two viable alternatives:

**ENT-9000-PLUS (Recommended)**
This is the direct replacement model with enhanced specifications:
- 32-core processor (vs. 24-core in ENT-8000-PRO)
- 512GB RAM (33% more than original)
- 24TB configurable storage (50% more capacity)
- Identical form factor and rack mounting
- 100% backward compatible with your existing infrastructure

**ENT-7500-ADV (Cost-Effective Option)**
A more economical alternative that meets core requirements:
- 24-core processor (same as ENT-8000-PRO)
- 256GB RAM (sufficient for most workloads)
- 12TB configurable storage
- Smaller 2U form factor (vs 4U original)
- 30% lower cost than original model

Would you like a detailed comparison of these alternatives against your specific requirements?`,
      visualization: {
        type: 'product-table',
        data: {
          title: 'ENT-8000-PRO Alternatives',
          products: [
            {
              sku: 'ENT-8000-PRO',
              name: 'Enterprise 8000 Pro Server',
              status: 'eol',
              alternativeSku: 'ENT-9000-PLUS',
              alternativeName: 'Enterprise 9000 Plus Server (Recommended)'
            },
            {
              sku: 'ENT-9000-PLUS',
              name: 'Enterprise 9000 Plus Server',
              status: 'available',
              alternativeSku: '',
              alternativeName: ''
            },
            {
              sku: 'ENT-7500-ADV',
              name: 'Enterprise 7500 Advanced Server',
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
      text: 'Yes, please provide a detailed comparison based on our virtualization workloads and database requirements.'
    },
    {
      sender: 'agent',
      text: `I've analyzed your specific virtualization workloads and database requirements against the available alternatives. Here's a detailed comparison:

**Virtualization Workload Analysis**:
Your requirements show 12 VMs with an average of 16GB RAM each (192GB total) and 40 vCPUs total.

- **ENT-9000-PLUS**: Can handle all current VMs plus 100% growth (up to 24 VMs)
  - 512GB RAM allows 24+ VMs at 16GB each
  - 32 cores (64 threads) supports 150+ vCPUs
  - High I/O throughput ideal for VM storage operations

- **ENT-7500-ADV**: Can handle current workload with limited growth (up to 16 VMs)
  - 256GB RAM allows for 16 VMs at 16GB each
  - 24 cores (48 threads) supports 100+ vCPUs
  - Adequate I/O for current virtualization needs

**Database Requirements Analysis**:
Your SQL database requires 8TB storage, high transaction processing, and sub-10ms latency.

- **ENT-9000-PLUS**: Exceeds database requirements
  - 24TB storage provides room for 200% data growth
  - Enhanced memory bandwidth for high transaction processing
  - NVMe storage options for sub-5ms latency

- **ENT-7500-ADV**: Meets current requirements with limited growth
  - 12TB storage provides 50% headroom for growth
  - Sufficient processing for current transaction volume
  - SSD options achieve required 10ms latency target

Based on your projected 30% annual growth, the ENT-9000-PLUS would support your workloads for 3+ years, while the ENT-7500-ADV would likely require upgrading within 18 months.`,
      visualization: {
        type: 'product-comparison',
        data: {
          title: 'Server Comparison for Your Workloads',
          originalProduct: {
            id: '001',
            name: 'ENT-8000-PRO',
            sku: 'ENT-8000-PRO',
            status: 'eol',
            price: 8499,
            specs: {
              processor: '24-core, 2.9GHz',
              memory: '384GB DDR4',
              storage: '16TB configurable',
              formFactor: '4U',
              powerConsumption: 850,
              virtualizationCapacity: 'Up to 18 VMs',
              databasePerformance: 'Medium-High',
              expansionSlots: 8
            }
          },
          alternatives: [
            {
              id: '101',
              name: 'ENT-9000-PLUS',
              sku: 'ENT-9000-PLUS',
              status: 'available',
              price: 9299,
              matchScore: 95,
              specs: {
                processor: '32-core, 3.1GHz',
                memory: '512GB DDR4',
                storage: '24TB configurable',
                formFactor: '4U',
                powerConsumption: 900,
                virtualizationCapacity: 'Up to 24+ VMs',
                databasePerformance: 'High',
                expansionSlots: 8
              }
            },
            {
              id: '102',
              name: 'ENT-7500-ADV',
              sku: 'ENT-7500-ADV',
              status: 'available',
              price: 6499,
              matchScore: 82,
              specs: {
                processor: '24-core, 2.8GHz',
                memory: '256GB DDR4',
                storage: '12TB configurable',
                formFactor: '2U',
                powerConsumption: 650,
                virtualizationCapacity: 'Up to 16 VMs',
                databasePerformance: 'Medium',
                expansionSlots: 6
              }
            }
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'The ENT-9000-PLUS looks like the best option. Are there any other considerations we should keep in mind for the migration?'
    },
    {
      sender: 'agent',
      text: `Excellent choice. The ENT-9000-PLUS is indeed the most suitable replacement for your needs. Here are important migration considerations to ensure a smooth transition:

**Technical Migration Considerations**:
1. **Driver Compatibility**: The ENT-9000-PLUS uses updated NIC drivers. You'll need to update your network configuration during migration.

2. **BIOS/Firmware**: Perform a full firmware update prior to production deployment. Current recommended version is 3.14.5.

3. **Power Requirements**: The ENT-9000-PLUS draws slightly more power (900W vs 850W). Verify your rack PDU capacity.

4. **Backup Strategy**: 
   - Perform full VM backups prior to migration
   - Schedule at least 4-hour maintenance window
   - Test restore procedures on the new hardware

5. **Hypervisor Compatibility**:
   - VMware ESXi 7.0+ fully supported (preferred)
   - Hyper-V 2019+ compatible with updated integration tools
   - Proxmox VE requires kernel 5.15+ for full hardware support

6. **Warranty & Support Options**:
   - Standard: 3-year NBD (included)
   - Premium: 4-hour response time (+$1,200)
   - Mission Critical: 24/7 2-hour onsite (+$2,800)

I recommend also purchasing the optional Rail-Kit-4U ($349) if you don't already have compatible rails, and the KVM-IP-ADV module ($499) for remote management capabilities.

Would you like me to prepare a complete migration plan document based on these considerations?`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Migration Readiness Assessment',
          labels: ['Hardware Compatibility', 'Software Compatibility', 'Data Migration', 'Performance Gain', 'Overall Readiness'],
          values: [100, 90, 95, 135, 95],
          maxValue: 150,
          unit: '%',
          descriptions: [
            '100% hardware compatibility with your environment',
            '90% software compatibility (driver updates required)',
            '95% data migration readiness (backup procedures validated)',
            '135% expected performance improvement over current system',
            '95% overall migration readiness score'
          ]
        }
      }
    }
  ]
};

export default productAlternatives;