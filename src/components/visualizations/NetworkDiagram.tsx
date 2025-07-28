import React, { useRef, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';

interface NetworkDiagramProps {
  data: {
    title: string;
    nodes: Array<{
      id: string;
      name: string;
      group: string;
      size?: number;
    }>;
    links: Array<{
      source: string;
      target: string;
      type?: string;
      value?: number;
    }>;
  };
}

const NetworkDiagram: React.FC<NetworkDiagramProps> = ({ data }) => {
  const graphRef = useRef<any>();
  
  // Generate colors based on group
  const getNodeColor = (group: string) => {
    const colorMap: Record<string, string> = {
      'switch': '#3B82F6',       // Primary blue
      'camera': '#10B981',       // Green
      'phone': '#F59E0B',        // Amber
      'server': '#6366F1',       // Indigo
      'accesspoint': '#EC4899',  // Pink
      'default': '#94A3B8',      // Gray
    };
    
    return colorMap[group] || colorMap.default;
  };
  
  // Generate link colors based on type
  const getLinkColor = (type?: string) => {
    const colorMap: Record<string, string> = {
      'power': '#F97316',        // Orange
      'network': '#3B82F6',      // Blue
      'wireless': '#8B5CF6',     // Violet
      'default': '#CBD5E1',      // Light gray
    };
    
    return colorMap[type || 'default'] || colorMap.default;
  };
  
  // Ensure proper data format for the graph
  const graphData = {
    nodes: data.nodes.map(node => ({
      id: node.id,
      name: node.name,
      group: node.group,
      val: node.size || 1,
    })),
    links: data.links.map(link => ({
      source: link.source,
      target: link.target,
      type: link.type || 'default',
      value: link.value || 1,
    })),
  };
  
  // Adjust graph size when component mounts
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-100);
      graphRef.current.d3Force('link').distance(link => link.value * 30);
      graphRef.current.zoom(1.5);
      
      // Center graph
      setTimeout(() => {
        graphRef.current.zoomToFit(400);
      }, 500);
    }
  }, []);
  
  return (
    <div className="w-full h-64 border border-gray-200 rounded-md overflow-hidden bg-white">
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={node => node.name}
        nodeColor={node => getNodeColor(node.group)}
        nodeRelSize={6}
        linkWidth={link => link.value * 0.5}
        linkColor={link => getLinkColor(link.type)}
        cooldownTicks={100}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={link => link.value * 0.6}
        onNodeClick={node => {
          // Zoom in on clicked node
          if (graphRef.current) {
            graphRef.current.centerAt(node.x, node.y, 1000);
            graphRef.current.zoom(2.5, 1000);
          }
        }}
        onBackgroundClick={() => {
          // Reset zoom on background click
          if (graphRef.current) {
            graphRef.current.zoomToFit(400);
          }
        }}
        width={600}
        height={250}
      />
    </div>
  );
};

export default NetworkDiagram;