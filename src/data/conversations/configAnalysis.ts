import { ConversationTopic } from '../../types';

const configAnalysis: ConversationTopic = {
  id: 'config-analysis',
  title: 'Configuration Analysis & Validation',
  description: 'See how Nolij validates technical configurations and identifies potential issues',
  icon: 'Settings',
  messages: [
    {
      sender: 'user',
      text: 'We need to deploy 45 security cameras and 30 VoIP phones at our new campus. Can you analyze if our current network infrastructure can handle this?'
    },
    {
      sender: 'agent',
      text: `I've analyzed your requirements for 45 security cameras and 30 VoIP phones against your current network infrastructure. Here's my technical assessment:

1. **Port Requirements**:
   - 45 cameras + 30 phones = 75 total devices
   - Your current switches provide 48 ports total
   - **Issue**: Port deficit of 27 ports

2. **Power Budget Analysis**:
   - 45 cameras × 5W = 225W
   - 30 phones × 7W = 210W
   - Total PoE requirement: 435W
   - Current switch capacity: 370W
   - **Issue**: Power deficit of 65W

3. **Network Architecture**:
   - Current single-switch deployment is insufficient
   - Additional switches needed for port capacity
   - Consider power distribution and redundancy

Would you like me to recommend an optimal configuration for this deployment?`,
      visualization: {
        type: 'bar-chart',
        data: {
          title: 'Resource Requirements vs. Current Capacity',
          labels: ['Ports Required', 'Ports Available', 'Power Required (W)', 'Power Available (W)'],
          values: [75, 48, 435, 370],
          color: '#0066FF'
        }
      }
    },
    {
      sender: 'user',
      text: 'Yes, please recommend a configuration that would work for our needs.'
    },
    {
      sender: 'agent',
      text: `Based on your requirements for 45 cameras and 30 phones, here's my recommended network configuration:

**Recommended Configuration**:
1. **Switch Deployment**:
   - 2× SW-48-POE switches (48 ports each, 740W PoE+ budget each)
   - Connect via 10GbE uplink for inter-switch communication
   - Total ports: 96 (75 required + 21 for expansion)
   - Total PoE capacity: 1,480W (435W required + 1,045W for growth)

2. **Power Planning**:
   - Distribute high-power devices evenly between switches
   - Reserve 20% power capacity on each switch for future expansion
   - Add redundant power supplies for critical devices
   - Install POE-CORD-NA power cords for full PoE+ operation

3. **Network Architecture**:
   - Implement VLANs to separate camera and voice traffic
   - Deploy QoS to prioritize voice traffic
   - Add UPS backup for core infrastructure
   - Consider NET-ADV-3YR licenses for advanced management features

This configuration provides sufficient ports, power, and room for 20% future expansion. Would you like detailed wiring diagrams for this setup?`,
      visualization: {
        type: 'network-diagram',
        data: {
          title: 'Recommended Network Architecture',
          nodes: [
            { id: 'sw1', name: 'SW-48-POE #1', group: 'switch', size: 2 },
            { id: 'sw2', name: 'SW-48-POE #2', group: 'switch', size: 2 },
            { id: 'cam', name: 'Cameras (45)', group: 'camera', size: 1.5 },
            { id: 'phone', name: 'VoIP Phones (30)', group: 'phone', size: 1.5 },
            { id: 'ups', name: 'UPS System', group: 'server', size: 1.5 },
            { id: 'fw', name: 'Firewall', group: 'server', size: 1.5 }
          ],
          links: [
            { source: 'sw1', target: 'sw2', type: 'network', value: 3 },
            { source: 'sw1', target: 'cam', type: 'network', value: 2 },
            { source: 'sw2', target: 'cam', type: 'network', value: 2 },
            { source: 'sw1', target: 'phone', type: 'network', value: 2 },
            { source: 'sw2', target: 'phone', type: 'network', value: 2 },
            { source: 'ups', target: 'sw1', type: 'power', value: 2 },
            { source: 'ups', target: 'sw2', type: 'power', value: 2 },
            { source: 'fw', target: 'sw1', type: 'network', value: 1 },
            { source: 'fw', target: 'sw2', type: 'network', value: 1 }
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'This looks good. What happens if we add 10 wireless access points to this configuration?'
    },
    {
      sender: 'agent',
      text: `Adding 10 wireless access points to your configuration is feasible with the recommended setup. Here's the updated analysis:

**Updated Requirements with Access Points**:
1. **Port Usage**:
   - Original: 45 cameras + 30 phones = 75 devices
   - Adding 10 APs = 85 total devices
   - Recommended config: 96 ports (still sufficient, 11 ports remaining)

2. **Power Budget**:
   - Original: 435W (cameras + phones)
   - 10 APs × 15W = 150W additional power
   - New total: 585W required
   - Recommended config: 1,480W total (still sufficient, 895W remaining)

3. **Network Considerations for AP Deployment**:
   - Distribute APs evenly between switches (5 per switch)
   - Configure each switch with a dedicated VLAN for wireless management
   - Implement controller-based management for centralized AP administration
   - Consider adding AP-MNGT-1YR controller license for advanced wireless features

The recommended dual SW-48-POE configuration can easily accommodate the addition of 10 access points with plenty of capacity remaining for future growth.`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Updated Resource Utilization',
          labels: ['Ports Used', 'Power Used (W)'],
          values: [85, 585],
          maxValue: 100,
          unit: '',
          descriptions: [
            '85 of 96 available ports (88.5% utilization)',
            '585W of 1,480W available power (39.5% utilization)'
          ],
          color: '#3B82F6'
        }
      }
    }
  ]
};

export default configAnalysis;