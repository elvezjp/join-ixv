declare module '3d-force-graph' {
  interface NodeObject {
    id: string;
    name: string;
    type: string;
    val: number;
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
    _destructor(): void;
  }

  export default function ForceGraph3D(): (element: HTMLElement) => GraphInstance;
}