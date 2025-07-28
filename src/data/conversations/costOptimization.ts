import { ConversationTopic } from '../../types';

const costOptimization: ConversationTopic = {
  id: 'cost-optimization',
  title: 'IT Infrastructure Cost Optimization',
  description: 'Identify opportunities to reduce costs while maintaining performance',
  icon: 'DollarSign',
  messages: [
    {
      sender: 'user',
      text: 'Our IT budget is tight this year. Can Nolij analyze our hardware specifications to find cost optimization opportunities?'
    },
    {
      sender: 'agent',
      text: `I've analyzed your IT infrastructure documentation and identified several cost optimization opportunities while maintaining necessary performance:

**Cost Optimization Analysis**

1. **Server Consolidation**:
   - Current: 12 physical servers at 40% average utilization
   - Opportunity: Consolidate to 7 higher-capacity servers
   - Estimated annual savings: $42,500 (hardware + power + cooling)
   - One-time migration cost: $15,000

2. **Licensing Optimization**:
   - Over-licensed: NET-ADV-3YR (15 licenses, only 10 needed)
   - Under-utilized: VRT-MGMT-ENT (using basic features of premium license)
   - Estimated annual savings: $26,800
   - Implementation complexity: Low

3. **Support Contract Adjustments**:
   - Current: Premium 24/7 support on all systems
   - Opportunity: Tiered support based on criticality
   - Estimated annual savings: $31,200
   - Risk level: Low (with proper implementation)

4. **Hardware Lifecycle Extension**:
   - Current: 3-year replacement cycle for all equipment
   - Opportunity: Extend non-critical systems to 5 years
   - Estimated annual savings: $35,000
   - Risk level: Medium (requires component health monitoring)

Would you like a detailed breakdown of any specific area?`,
      visualization: {
        type: 'bar-chart',
        data: {
          title: 'Annual Cost Savings Opportunities',
          labels: ['Server Consolidation', 'Licensing Optimization', 'Support Contracts', 'Lifecycle Extension', 'Total Potential'],
          values: [42500, 26800, 31200, 35000, 135500],
          color: '#0066FF'
        }
      }
    },
    {
      sender: 'user',
      text: 'Please provide more details on the server consolidation opportunity.'
    },
    {
      sender: 'agent',
      text: `Here's a detailed breakdown of the server consolidation opportunity based on my analysis of your infrastructure documentation:

**Current Server Environment**
You currently maintain 12 physical servers:
- 4× Database servers (SQL-SVR-1 through 4)
- 5× Application servers (APP-SVR-1 through 5)
- 3× Web servers (WEB-SVR-1 through 3)

**Server Utilization Analysis**
Based on the performance metrics in your documentation:
- Database servers: 55% average CPU, 60% memory utilization
- Application servers: 35% average CPU, 45% memory utilization
- Web servers: 30% average CPU, 40% memory utilization
- Overall average: 40% resource utilization across all servers

**Consolidation Recommendation**
1. **Replace with 7 Higher-Capacity Servers**:
   - 3× ENT-9000-PLUS servers for databases (virtualized)
   - 3× ENT-7500-ADV servers for applications and web services
   - 1× ENT-7500-ADV for testing/development environment

2. **Virtualization Strategy**:
   - Migrate to full virtualization environment
   - Implement resource-based allocation for critical workloads
   - Use dynamic resource allocation for non-critical services

3. **Hardware Specifications Comparison**:
   - Current total: 192 cores, 768GB RAM, 48TB storage
   - Recommended: 176 cores, 1792GB RAM, 80TB storage
   - Performance result: 15% higher overall processing capacity

4. **Detailed Cost Breakdown**:
   - Current annual costs: $96,000 (hardware, power, cooling, rack space)
   - Proposed annual costs: $53,500
   - Annual savings: $42,500
   - One-time migration cost: $15,000
   - ROI timeframe: 4.2 months

Would you like me to develop a phased migration plan for this server consolidation approach?`,
      visualization: {
        type: 'product-comparison',
        data: {
          title: 'Current vs. Consolidated Infrastructure',
          originalProduct: {
            id: '001',
            name: 'Current Environment',
            sku: '12-SERVER-ENV',
            status: 'available',
            price: 96000,
            specs: {
              serverCount: 12,
              totalCores: 192,
              totalMemory: '768GB',
              totalStorage: '48TB',
              powerConsumption: 12500,
              utilizationRate: '40%',
              rackUnits: 24,
              redundancy: 'Partial'
            }
          },
          alternatives: [
            {
              id: '101',
              name: 'Consolidated Environment',
              sku: '7-SERVER-ENV',
              status: 'available',
              price: 53500,
              matchScore: 95,
              specs: {
                serverCount: 7,
                totalCores: 176,
                totalMemory: '1792GB',
                totalStorage: '80TB',
                powerConsumption: 7800,
                utilizationRate: '65%',
                rackUnits: 14, 
                redundancy: 'Full'
              }
            }
          ]
        }
      }
    },
    {
      sender: 'user',
      text: 'Yes, please provide a phased migration plan for the server consolidation.'
    },
    {
      sender: 'agent',
      text: `# Server Consolidation: Phased Migration Plan

Based on your current infrastructure and business requirements, here's a comprehensive phased migration plan to minimize disruption:

## Phase 1: Preparation (Weeks 1-2)
**Activities:**
- Procure new hardware (3× ENT-9000-PLUS, 4× ENT-7500-ADV)
- Set up virtualization environment on new hardware
- Install monitoring tools for pre/post-migration comparison
- Establish backup verification procedures
- Create rollback plan for each migration step

**Milestones:**
- Hardware delivery and rack installation
- Virtualization platform configuration complete
- Network integration verified
- Migration runbook approved

## Phase 2: Non-Critical Workload Migration (Weeks 3-4)
**Activities:**
- Migrate development and test environments first
- Move WEB-SVR-2 and WEB-SVR-3 (non-primary web servers)
- Migrate APP-SVR-3, APP-SVR-4, and APP-SVR-5 (secondary applications)
- Validate functionality after each migration
- Document performance metrics and adjust resource allocation

**Milestones:**
- 50% of servers migrated
- Initial performance baselines established
- Resource allocation optimized based on actual usage

## Phase 3: Critical Workload Migration (Weeks 5-7)
**Activities:**
- Migrate database servers during scheduled maintenance windows
  - SQL-SVR-3 and SQL-SVR-4 (reporting/analytics) first
  - SQL-SVR-1 and SQL-SVR-2 (transactional) with minimal downtime
- Migrate primary application server (APP-SVR-1 and APP-SVR-2)
- Migrate primary web server (WEB-SVR-1)

**Milestones:**
- All workloads successfully migrated
- Performance verification complete
- Redundancy testing passed

## Phase 4: Optimization and Decommissioning (Weeks 8-10)
**Activities:**
- Fine-tune resource allocation based on production metrics
- Implement automated scaling for variable workloads
- Decommission old hardware
- Document final configuration and update disaster recovery procedures
- Conduct training for IT staff on new environment

**Milestones:**
- All old hardware decommissioned
- Final documentation completed
- Operational handover to IT team

## Risk Mitigation Strategies
1. **Maintain old environment** until new one is proven stable (2-week overlap)
2. **Schedule critical migrations** during lowest-usage periods
3. **Implement temporary redundancy** between old and new environments
4. **Automated rollback triggers** if performance thresholds aren't met
5. **Additional support resources** on standby during migration windows

Would you like me to provide more details on any specific phase of this migration plan?`,
      visualization: {
        type: 'interactive-bar-chart',
        data: {
          title: 'Migration Timeline & Progress',
          labels: ['Preparation', 'Non-Critical Migration', 'Critical Migration', 'Optimization'],
          values: [2, 2, 3, 3],
          maxValue: 12,
          unit: ' weeks',
          descriptions: [
            'Hardware procurement, virtualization setup, planning (Weeks 1-2)',
            'Development, test, and secondary systems migration (Weeks 3-4)',
            'Database and primary application migration (Weeks 5-7)',
            'Tuning, decommissioning, and final documentation (Weeks 8-10)'
          ]
        }
      }
    }
  ]
};

export default costOptimization;