"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { getResponsiveGrid, WALL_CONFIG } from "@/hooks/animation/useGeometricWall";

interface Runner {
  pos: THREE.Vector2;
  dir: THREE.Vector2;
  speed: number;
}

export default function GeometricWallCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene & Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#07080a");

    const { width: w, height: h } = container.getBoundingClientRect();
    const grid = getResponsiveGrid(w, h);

    const camera = new THREE.PerspectiveCamera(grid.fov, w / h, 0.1, 100);
    camera.position.set(0, 0, grid.cameraZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    scene.add(new THREE.AmbientLight(0x232936, 1.8));
    const topLight = new THREE.DirectionalLight(0x94a9c9, 2.2);
    topLight.position.set(12, 16, 12);
    scene.add(topLight);

    const cursorLight = new THREE.PointLight(0xff1133, 3.0, 9.0);
    cursorLight.position.set(0, 0, 1.5);
    scene.add(cursorLight);

    // --- 3. Instanced Wall Blocks ---
    const { blockSize, gapSize } = WALL_CONFIG;
    const { cols, rows, step } = grid;
    const totalBlocks = cols * rows;

    const dummy = new THREE.Object3D();
    const halfW = ((cols - 1) * step) / 2;
    const halfH = ((rows - 1) * step) / 2;

    const blockBaseHeights = new Float32Array(totalBlocks);
    const blockDepressions = new Float32Array(totalBlocks);
    const blockPositions: THREE.Vector3[] = [];

    const instancedMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(blockSize, blockSize, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x16181d, roughness: 0.72, metalness: 0.25 }),
      totalBlocks
    );

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * step - halfW;
        const y = r * step - halfH;
        const z = 0.1 + 0.55 * (Math.sin(c * 0.8) * Math.cos(r * 0.8) * 0.5 + 0.5);

        blockBaseHeights[idx] = z;
        blockPositions.push(new THREE.Vector3(x, y, z));
        dummy.position.set(x, y, z - 0.6);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(idx++, dummy.matrix);
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);

    // --- 4. 6 Distinct Autonomous Line Runners ---
    const runnerUniforms = {
      uPositions: { value: new Float32Array(12) }, // 6 pairs of (x, y)
      uCursorPos: { value: new THREE.Vector2(999, 999) },
    };

    const runners: Runner[] = Array.from({ length: 6 }, () => {
      const isHorizontal = Math.random() > 0.5;
      return {
        pos: new THREE.Vector2(
          (Math.floor(Math.random() * cols) * step - halfW),
          (Math.floor(Math.random() * rows) * step - halfH)
        ),
        dir: isHorizontal
          ? new THREE.Vector2(Math.random() > 0.5 ? 1 : -1, 0)
          : new THREE.Vector2(0, Math.random() > 0.5 ? 1 : -1),
        speed: (0.04 + Math.random() * 0.04) * step,
      };
    });

    const stripMat = new THREE.ShaderMaterial({
      uniforms: runnerUniforms,
      vertexShader: `
        varying vec3 vWorldPos;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          #ifdef USE_INSTANCING
            vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
          #else
            vec4 wp = modelMatrix * vec4(position, 1.0);
          #endif
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform float uPositions[12];
        uniform vec2 uCursorPos;
        varying vec3 vWorldPos;
        varying vec2 vUv;

        void main() {
          float pulse = 0.0;
          // Calculate distance along lines to the 6 moving runners
          for (int i = 0; i < 6; i++) {
            vec2 rPos = vec2(uPositions[i * 2], uPositions[i * 2 + 1]);
            float dist = length(vWorldPos.xy - rPos);
            // Crisp trailing line tail of ~3.5 grid units
            pulse += smoothstep(3.5, 0.0, dist) * 2.8;
          }

          float cursorGlow = smoothstep(4.0, 0.0, length(vWorldPos.xy - uCursorPos)) * 1.5;
          float intensity = pulse + cursorGlow + 0.12;
          float edgeFalloff = sin(vUv.y * 3.14159);
          intensity *= (0.35 + 0.65 * edgeFalloff);

          vec3 color = mix(vec3(0.55, 0.0, 0.08), vec3(1.0, 0.12, 0.25), clamp(intensity * 0.5, 0.0, 1.0));
          gl_FragColor = vec4(color * intensity, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    const stripW = gapSize * 1.1;
    const hStrips = new THREE.InstancedMesh(new THREE.PlaneGeometry(step, stripW), stripMat, (rows + 1) * cols);
    const vStrips = new THREE.InstancedMesh(new THREE.PlaneGeometry(stripW, step), stripMat, (cols + 1) * rows);
    hStrips.renderOrder = 2;
    vStrips.renderOrder = 2;

    let hIdx = 0;
    for (let r = 0; r <= rows; r++) {
      const y = r * step - halfH - gapSize / 2;
      for (let c = 0; c < cols; c++) {
        dummy.position.set(c * step - halfW, y, 0.32);
        dummy.updateMatrix();
        hStrips.setMatrixAt(hIdx++, dummy.matrix);
      }
    }
    hStrips.instanceMatrix.needsUpdate = true;
    scene.add(hStrips);

    let vIdx = 0;
    for (let c = 0; c <= cols; c++) {
      const x = c * step - halfW - gapSize / 2;
      for (let r = 0; r < rows; r++) {
        dummy.position.set(x, r * step - halfH, 0.32);
        dummy.updateMatrix();
        vStrips.setMatrixAt(vIdx++, dummy.matrix);
      }
    }
    vStrips.instanceMatrix.needsUpdate = true;
    scene.add(vStrips);

    // --- 5. Interactive Hover & Parallax ---
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.set(targetX, targetY);

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(instancedMesh);
      if (hits.length > 0) {
        const pt = hits[0].point;
        cursorLight.position.set(pt.x, pt.y, 1.5);
        runnerUniforms.uCursorPos.value.set(pt.x, pt.y);

        // Hover depression
        const p2d = new THREE.Vector2(pt.x, pt.y);
        for (let i = 0; i < totalBlocks; i++) {
          const d = p2d.distanceTo(new THREE.Vector2(blockPositions[i].x, blockPositions[i].y));
          if (d < 2.5) blockDepressions[i] = Math.max(blockDepressions[i], (1 - d / 2.5) * 0.25);
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove);

    // --- 6. Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const dt = clock.getDelta();

      // Camera Parallax
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;
      camera.position.x = curX * 1.5;
      camera.position.y = curY * 1.0;
      camera.lookAt(0, 0, 0);

      // Update 6 Autonomous Runners
      const posArr = runnerUniforms.uPositions.value;
      for (let i = 0; i < 6; i++) {
        const r = runners[i];
        r.pos.addScaledVector(r.dir, r.speed);

        // Turn at random grid intersections or bounds
        if (Math.random() < 0.03 || Math.abs(r.pos.x) > halfW || Math.abs(r.pos.y) > halfH) {
          if (Math.abs(r.pos.x) > halfW) r.pos.x = -Math.sign(r.pos.x) * halfW;
          if (Math.abs(r.pos.y) > halfH) r.pos.y = -Math.sign(r.pos.y) * halfH;

          // Align to grid line and turn 90 deg
          if (r.dir.x !== 0) {
            r.pos.x = Math.round(r.pos.x / step) * step;
            r.dir.set(0, Math.random() > 0.5 ? 1 : -1);
          } else {
            r.pos.y = Math.round(r.pos.y / step) * step;
            r.dir.set(Math.random() > 0.5 ? 1 : -1, 0);
          }
        }
        posArr[i * 2] = r.pos.x;
        posArr[i * 2 + 1] = r.pos.y;
      }

      // Spring back depressed blocks
      let updateMat = false;
      for (let i = 0; i < totalBlocks; i++) {
        if (blockDepressions[i] > 0.001) {
          blockDepressions[i] -= blockDepressions[i] * 5.0 * dt;
          dummy.position.set(blockPositions[i].x, blockPositions[i].y, blockBaseHeights[i] - blockDepressions[i] - 0.6);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i, dummy.matrix);
          updateMat = true;
        }
      }
      if (updateMat) instancedMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 7. Resize & Cleanup ---
    const onResize = () => {
      const rect = container.getBoundingClientRect();
      const updated = getResponsiveGrid(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.fov = updated.fov;
      camera.position.z = updated.cameraZ;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden cursor-crosshair touch-none select-none" />;
}
