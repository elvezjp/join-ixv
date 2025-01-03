'use client';

import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import { DependencyNode } from '@/lib/analyzer/astAnalyzer';
import { NodeObject } from '3d-force-graph';

interface Props {
  data: DependencyNode[];
}

interface NodeInfo {
  name: string;
  type: string;
  dependencies: string[];
}

export default function DependencyGraph({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeInfo | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const graphData = {
      nodes: data.map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        val: 1
      })),
      links: data.flatMap(node =>
        node.dependencies.map(depId => ({
          source: node.id,
          target: depId
        }))
      )
    };

    const Graph = ForceGraph3D()(containerRef.current as HTMLElement)
      .graphData(graphData)
      .nodeLabel('name')
      .nodeAutoColorBy('type')
      .onNodeHover((node: NodeObject | null) => {
        if (node) {
          const nodeInfo: NodeInfo = {
            name: node.name,
            type: node.type,
            dependencies: data.find(n => n.id === node.id)?.dependencies || []
          };
          setHoveredNode(nodeInfo);
        } else {
          setHoveredNode(null);
        }
        document.body.style.cursor = node ? 'pointer' : 'default';
      });

    return () => {
      Graph._destructor();
    };
  }, [data]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {hoveredNode && (
        <div
          className="absolute text-black bg-white/90 p-4 rounded-lg shadow-lg z-10 backdrop-blur-sm border border-gray-200"
          style={{
            left: 10,
            top: 10,
          }}
        >
          <h3 className="font-bold text-lg">{hoveredNode.name}</h3>
          <p className="text-sm text-gray-600">Type: {hoveredNode.type}</p>
          <p className="text-sm text-gray-600">
            Dependencies: {hoveredNode.dependencies ? hoveredNode.dependencies.length : 0}
          </p>
          {hoveredNode.dependencies && hoveredNode.dependencies.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              <p>Depends on:</p>
              <ul className="list-disc list-inside">
                {hoveredNode.dependencies.map(dep => (
                  <li key={dep}>{dep}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}