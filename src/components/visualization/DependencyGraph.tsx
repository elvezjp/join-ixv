/**
 * @file src/components/visualization/DependencyGraph.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description 3D Force Graphを使用して依存関係を可視化するコンポーネント。
 * ノードの種類別の色分け、ホバー時の情報表示、ファイルツリーの表示機能を提供する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import { DependencyNode } from '@/lib/analyzer/astAnalyzer';
import { NodeObject } from '3d-force-graph';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import FileTree from './FileTree';
import { Box } from '@mui/material';
import { FileNode } from '@/lib/analyzer/types';

/**
 * コンポーネントのプロパティ型定義
 * @interface Props
 */
interface Props {
  data: DependencyNode[];
  files: FileNode[];
}

/**
 * ノード情報の型定義
 * @interface NodeInfo
 */
interface NodeInfo {
  name: string;
  type: string;
  dependencies: string[];
  dependedBy: string[];
}

/**
 * グラフノードの型定義
 * @interface GraphNode
 */
interface GraphNode extends NodeObject {
  id: string;
  name: string;
  type: string;
  val: number;
  color?: string;
}

interface LegendItem {
  type: string;
  color: string;
}

/**
 * 依存関係グラフを3Dで表示するコンポーネント
 * @param {Props} props - コンポーネントのプロパティ
 * @param {DependencyNode[]} props.data - 依存関係のデータ
 * @param {FileNode[]} props.files - ファイル構造のデータ
 * @returns {JSX.Element} 3D依存関係グラフ
 */
export default function DependencyGraph({ data, files }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeInfo | null>(null);
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);

  const calculateReverseDependencies = (nodes: DependencyNode[]) => {
    const reverseDeps = new Map<string, string[]>();

    // 初期化
    nodes.forEach(node => {
      reverseDeps.set(node.id, []);
    });

    // 逆依存関係の計算
    nodes.forEach(node => {
      node.dependencies.forEach(depId => {
        const deps = reverseDeps.get(depId) || [];
        deps.push(node.id);
        reverseDeps.set(depId, deps);
      });
    });

    return reverseDeps;
  };

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

    const uniqueTypes = ['component', 'function', 'context', 'other'];
    const colorScale = (type: string) => {
      const colorMap: { [key: string]: string } = {
        component: '#FF9F1C', // オレンジ
        function: '#4361EE', // 青
        context: '#4CAF50',  // 緑
        other: '#9C27B0'     // 紫
      };
      return colorMap[type] || '#808080'; // デフォルトはグレー
    };

    const newLegendItems = uniqueTypes.map(type => ({
      type,
      color: colorScale(type)
    }));
    setLegendItems(newLegendItems);

    const Graph = ForceGraph3D()(containerRef.current as HTMLElement)
      .graphData(graphData)
      .nodeLabel('name')
      .linkColor('#ffffff')
      .linkWidth(2)
      .linkOpacity(0.5)
      .linkDirectionalArrowLength(5)
      .linkDirectionalArrowRelPos(1)
      .nodeThreeObject((node: GraphNode) => {
        const group = new THREE.Group();
        const color = colorScale(node.type);

        const sphereGeometry = new THREE.SphereGeometry(3);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        group.add(sphere);

        const sprite = new SpriteText(`${node.name} [${node.type}]`);
        sprite.color = 'white';
        sprite.textHeight = 8;
        sprite.position.set(0, 10, 0);
        group.add(sprite);

        return group;
      })
      .onNodeHover((node: NodeObject | null) => {
        if (node) {
          const reverseDeps = calculateReverseDependencies(data);
          const currentNode = data.find(n => n.id === node.id);
          const nodeInfo: NodeInfo = {
            name: node.name as string,
            type: node.type as string,
            dependencies: currentNode?.dependencies || [],
            dependedBy: reverseDeps.get(node.id as string) || []
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
    <Box sx={{
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="absolute inset-0">
        <div ref={containerRef} className="w-full h-full" />

        <div className="absolute left-10 top-10 bg-white/90 p-2 rounded-lg shadow-lg z-10 backdrop-blur-sm border border-gray-200">
          <FileTree files={files} />
        </div>

        <div className="absolute text-black right-10 top-10 bg-white/90 p-2 rounded-lg shadow-lg z-10 backdrop-blur-sm border border-gray-200">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1 text-sm">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.type}</span>
            </div>
          ))}
        </div>

        {hoveredNode && (
          <div
            className="absolute text-black bg-white/90 p-4 rounded-lg shadow-lg z-10 backdrop-blur-sm border border-gray-200"
            style={{
              left: '50%',
              bottom: 100,
              transform: 'translateX(-50%)',
              maxWidth: '850px'
            }}
          >
            <h3 className="font-bold text-lg">{hoveredNode.name}</h3>
            <p className="text-sm text-gray-600">Type: {hoveredNode.type}</p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="text-sm text-gray-500">
                <p className="font-semibold">
                  Depends on:
                </p>
                {hoveredNode.dependencies?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {hoveredNode.dependencies.map(dep => (
                      <li key={dep}>{dep}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs italic">-</p>
                )}
              </div>

              <div className="text-sm text-gray-500">
                <p className="font-semibold">
                  Depended by:
                </p>
                {hoveredNode.dependedBy?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {hoveredNode.dependedBy.map(dep => (
                      <li key={dep}>{dep}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs italic">-</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}