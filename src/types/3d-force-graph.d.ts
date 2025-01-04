/**
 * @file src/types/3d-force-graph.d.ts
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description 3d-force-graphライブラリの型定義ファイル。
 * グラフのノード、リンク、およびグラフインスタンスの型を定義する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

declare module '3d-force-graph' {
  interface NodeObject {
    id: string;
    name: string;
    type: string;
    val: number;
    color?: string;
  }

  interface LinkObject {
    source: string;
    target: string;
  }

  interface GraphData {
    nodes: NodeObject[];
    links: LinkObject[];
  }

  interface GraphInstance {
    graphData(data: GraphData): GraphInstance;
    nodeLabel(label: string): GraphInstance;
    nodeAutoColorBy(attribute: string): GraphInstance;
    onNodeHover(callback: (node: NodeObject | null) => void): GraphInstance;
    nodeThreeObject(callback: (node: NodeObject) => THREE.Object3D): GraphInstance;
    _destructor(): void;
    linkColor(color: string): GraphInstance;
    linkWidth(width: number): GraphInstance;
    linkOpacity(opacity: number): GraphInstance;
    linkDirectionalArrowLength(length: number): GraphInstance;
    linkDirectionalArrowRelPos(pos: number): GraphInstance;
    linkDirectionalParticles(num: number): GraphInstance;
    linkDirectionalParticleWidth(width: number): GraphInstance;
    linkDirectionalParticleSpeed(speed: number): GraphInstance;
  }

  export default function ForceGraph3D(): (element: HTMLElement) => GraphInstance;
}