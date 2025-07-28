import { ConversationTopic } from '../../types';

const securityAnalysis: ConversationTopic = {
  id: 'security-analysis',
  title: 'Security Configuration Analysis',
  description: 'Analyze network security configurations and identify vulnerabilities',
  icon: 'Shield',
  messages: [
    {
      sender: 'user',
      text: 'We\'re configuring a new network security setup with FW-UTM-2000 firewall. Can Nolij validate our security configuration?'
    },
    {
      sender: 'agent',
      text: `I've analyzed your FW-UTM-2000 firewall configuration documents and identified several important security considerations:

**Security Configuration Analysis**

1. **Firewall Rule Assessment**:
   - 42 rules analyzed in your configuration
   - 3 overly permissive rules identified
   - 2 rule conflicts detected
   - 1 critical security bypass opportunity found

2. **Network Segmentation**:
   - IoT network properly isolated
   - Guest network correctly segregated
   - **Issue**: Corporate and production networks have unnecessary cross-access

3. **Intrusion Prevention**:
   - IPS signatures outdated (last update: 45 days ago)
   - Custom rules properly configured
   - Logging settings appropriate for compliance

4. **VPN Configuration**:
   - Using secure protocols (IKEv2)
   - Certificate-based authentication implemented
   - **Issue**: Split tunneling enabled (potential security risk)

Would you like me to provide specific recommendations to address these security concerns?`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Security Configuration Assessment',
          labels: ['Firewall Rules', 'Network Segmentation', 'Intrusion Prevention', 'VPN Security', 'Overall Security'],
          values: [75, 80, 60, 85, 75],
          maxValue: 100,
          unit: '%',
          descriptions: [
            '75% - Multiple rule issues identified',
            '80% - Good segmentation with minor issues',
            '60% - Updates required for optimal protection',
            '85% - Strong configuration with minor concerns',
            '75% - Overall security rating'
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'Yes, please provide specific recommendations to address these security issues.'
    },
    {
      sender: 'agent',
      text: `Based on my analysis of your FW-UTM-2000 configuration, here are specific recommendations to address the identified security concerns:

**1. Firewall Rule Remediation**:
   - **Rule #24**: Change "ANY" source to specific IP ranges (192.168.10.0/24, 192.168.20.0/24)
   - **Rule #31**: Restrict service from "ANY" to specific required ports (80, 443, 8080)
   - **Rule #36**: Remove redundant rule that conflicts with more specific rule #37
   - **Rules #42 & #43**: Resolve conflict where #43 blocks traffic permitted by #42
   - **Rule #15**: Critical - Remove rule allowing direct external access to management interface

**2. Network Segmentation Improvements**:
   - Create explicit deny rules between corporate (VLAN 10) and production (VLAN 20) networks
   - Implement application-layer gateway for necessary cross-VLAN communication
   - Deploy network monitoring on inter-VLAN boundaries

**3. Intrusion Prevention Updates**:
   - Schedule immediate IPS signature update (current signatures 45 days old)
   - Enable automatic daily updates at 2:00 AM (non-production hours)
   - Implement custom IPS rules for your specialized manufacturing equipment

**4. VPN Security Hardening**:
   - Disable split tunneling to prevent security bypasses
   - Implement multi-factor authentication for all VPN users
   - Create separate VPN profiles for administrative vs. regular users

**Implementation Priority**:
1. Address critical Rule #15 immediately (high risk)
2. Update IPS signatures within 24 hours
3. Resolve firewall rule issues within one week
4. Implement network segmentation improvements within two weeks
5. Deploy VPN security changes within one month (requires user communication)

Would you like me to generate specific configuration commands for any of these recommendations?`,
      visualization: {
        type: 'product-table',
        data: {
          title: 'Security Issue Priority Matrix',
          products: [
            {
              sku: 'FW-RULE-15',
              name: 'Rule #15: External Management Access',
              status: 'eol',
              alternativeSku: 'CRITICAL',
              alternativeName: 'High risk - immediate action required'
            },
            {
              sku: 'IPS-UPDATE',
              name: 'Outdated IPS Signatures (45 days)',
              status: 'low_stock',
              alternativeSku: 'HIGH',
              alternativeName: 'Update within 24 hours'
            },
            {
              sku: 'FW-RULES-CONF',
              name: 'Firewall Rule Conflicts (#42 & #43)',
              status: 'low_stock',
              alternativeSku: 'MEDIUM',
              alternativeName: 'Resolve within one week'
            },
            {
              sku: 'VLAN-SEGMENTATION',
              name: 'Corporate/Production Network Access',
              status: 'low_stock',
              alternativeSku: 'MEDIUM',
              alternativeName: 'Implement within two weeks'
            },
            {
              sku: 'VPN-SPLIT-TUNNEL',
              name: 'VPN Split Tunneling Enabled',
              status: 'available',
              alternativeSku: 'LOW',
              alternativeName: 'Address within one month'
            }
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'Please generate the configuration commands for the critical Rule #15 issue and the IPS updates.'
    },
    {
      sender: 'agent',
      text: `Here are the specific configuration commands to address the critical Rule #15 issue and update the IPS signatures on your FW-UTM-2000 firewall:

**1. Remove Critical Rule #15 (External Management Access)**

SSH to your firewall and enter configuration mode:
\`\`\`
# ssh admin@192.168.1.1
# configure
\`\`\`

Delete the dangerous rule #15:
\`\`\`
(config)# no security-policy id 15
(config)# commit
(config)# save
\`\`\`

Create a proper management access rule with restrictions:
\`\`\`
(config)# security-policy id 15
(config-policy-15)# name "Secure Management Access"
(config-policy-15)# source-zone WAN
(config-policy-15)# destination-zone LAN
(config-policy-15)# source-address management-allowed-ips
(config-policy-15)# destination-address mgmt-interfaces
(config-policy-15)# application ssh https
(config-policy-15)# action allow
(config-policy-15)# log session-start session-end
(config-policy-15)# commit
(config-policy-15)# exit
\`\`\`

Create the address group for approved management IPs:
\`\`\`
(config)# address-group management-allowed-ips
(config-addr-group)# address 203.0.113.15/32 name "Office-Static-IP"
(config-addr-group)# address 198.51.100.0/29 name "VPN-Gateway-Range"
(config-addr-group)# exit
(config)# commit
(config)# save
\`\`\`

**2. Update IPS Signatures**

Perform immediate IPS update:
\`\`\`
(config)# security ips update signatures
\`\`\`

Configure automatic daily updates:
\`\`\`
(config)# security ips auto-update
(config-ips-update)# schedule daily 02:00
(config-ips-update)# alert admin-email
(config-ips-update)# commit
(config-ips-update)# exit
(config)# save
\`\`\`

Verify that updates are properly applied:
\`\`\`
(config)# exit
# show security ips status
# show security ips signature-database info
\`\`\`

**Important Notes**:
1. These commands assume standard FW-UTM-2000 CLI syntax
2. Make sure to have console or out-of-band access before making firewall rule changes
3. The management-allowed-ips addresses should be replaced with your actual approved IP addresses
4. Execute during a maintenance window if possible
5. Verify admin access works from authorized IPs after changes

Would you like me to generate commands for any of the other recommended security improvements?`,
      visualization: {
        type: 'compatibility-matrix',
        data: {
          title: 'Security Configuration Verification Matrix',
          headers: ['Before Fix', 'After Fix', 'Security Best Practice'],
          rows: [
            { 
              name: 'External Management', 
              values: ['incompatible', 'compatible', 'compatible'] 
            },
            { 
              name: 'IPS Signatures', 
              values: ['warning', 'compatible', 'compatible'] 
            },
            { 
              name: 'Management Access Control', 
              values: ['incompatible', 'compatible', 'compatible'] 
            },
            { 
              name: 'Update Automation', 
              values: ['incompatible', 'compatible', 'compatible'] 
            }
          ]
        }
      }
    }
  ]
};

export default securityAnalysis;