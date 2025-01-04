'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DependencyNode } from '@/lib/analyzer/astAnalyzer';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);

    // メインレンダラーの設定
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // ラベル用レンダラーの設定
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    const controls = new OrbitControlsImpl(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const nodeColors = {
      component: 0x4caf50,
      context: 0x2196f3,
      class: 0xffc107,
      function: 0x007bff,
      other: 0xff9800
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const nodeObjects: { [key: string]: THREE.Mesh } = {};

    function calculateNodePosition(index: number, total: number) {
      const radius = Math.min(container.clientWidth, container.clientHeight) * 0.2;
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      };
    }

    const NODE_SIZE = 10;

    // ノードとラベルの作成
    data.forEach((node, index) => {
      const geometry = new THREE.SphereGeometry(NODE_SIZE);
      const material = new THREE.MeshPhongMaterial({
        color: nodeColors[node.type as keyof typeof nodeColors],
        shininess: 100,
        specular: 0x444444,
        emissive: 0x111111,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const position = calculateNodePosition(index, data.length);
      mesh.position.set(position.x, position.y, position.z);

      mesh.userData = {
        name: node.name,
        type: node.type,
        dependencies: node.dependencies
      };

      nodeObjects[node.id] = mesh;
      scene.add(mesh);

      // ラベルの作成
      const labelDiv = document.createElement('div');
      labelDiv.className = 'bg-transparent text-black px-2 py-1 rounded text-sm';
      labelDiv.textContent = `${node.name} (${node.type})`;
      const label = new CSS2DObject(labelDiv);
      label.position.set(0, NODE_SIZE + 10, 0);
      mesh.add(label);
    });

    // エッジの作成
    data.forEach(node => {
      node.dependencies.forEach(depId => {
        if (nodeObjects[depId]) {
          const startNode = nodeObjects[node.id];
          const endNode = nodeObjects[depId];

          // 始点と終点の位置を取得
          const startPoint = startNode.position;
          const endPoint = endNode.position;

          // 方向ベクトルを計算
          const direction = new THREE.Vector3()
            .subVectors(endPoint, startPoint)
            .normalize();
          // 始点と終点を調整（ノードの表面から開始/終了するように）
          const adjustedStart = startPoint.clone()
            .add(direction.clone().multiplyScalar(NODE_SIZE));
          const adjustedEnd = endPoint.clone()
            .sub(direction.clone().multiplyScalar(NODE_SIZE));

          // 調整後の点で線を作成
          const points = [adjustedStart, adjustedEnd];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0x666666,
            opacity: 0.6,
            transparent: true,
            linewidth: 1
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      });
    });

    const radius = Math.min(container.clientWidth, container.clientHeight) * 0.4;
    camera.position.set(radius, radius, radius);
    camera.lookAt(0, 0, 0);

    controls.minDistance = radius * 0.5;
    controls.maxDistance = radius * 2;

    function onWindowResize() {
      const newAspect = container.clientWidth / container.clientHeight;
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      labelRenderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onWindowResize);

    function onMouseMove(event: MouseEvent) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

      setMousePos({ x: event.clientX, y: event.clientY });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Object.values(nodeObjects));

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        setHoveredNode(intersectedObject.userData as NodeInfo);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }
    }

    container.addEventListener('mousemove', onMouseMove);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeEventListener('mousemove', onMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (container.contains(labelRenderer.domElement)) {
        container.removeChild(labelRenderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [data]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {hoveredNode && (
        <div
          className="absolute text-black bg-white/90 p-4 rounded-lg shadow-lg z-10 backdrop-blur-sm border border-gray-200"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 10,
          }}
        >
          <h3 className="font-bold text-lg">{hoveredNode.name}</h3>
          <p className="text-sm text-gray-600">Type: {hoveredNode.type}</p>
          <p className="text-sm text-gray-600">
            Dependencies: {hoveredNode.dependencies.length}
          </p>
          {hoveredNode.dependencies.length > 0 && (
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