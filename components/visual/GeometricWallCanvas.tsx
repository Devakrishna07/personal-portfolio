"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { getResponsiveGrid, WALL_CONFIG } from "@/hooks/animation/useGeometricWall";

interface Beam {
  isHorizontal: boolean;
  channelIndex: number; // Channel grid index
  posCoord: number;      // Current head position along the channel axis
  dir: number;           // +1 or -1
  speed: number;
  length: number;        // Length of the straight beam
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

    // --- 4. 10 Straight Beams in Diverse Directions ---
    // Distribute directional types evenly across 0-3 (L->R, R->L, T->B, B->T) and 4 (random)
    const resetBeam = (b: Beam, dirType: number) => {
      const type = dirType % 5;
      if (type === 0) {
        // Left -> Right
        b.isHorizontal = true;
        b.channelIndex = Math.floor(Math.random() * rows);
        b.posCoord = -halfW - 4;
        b.dir = 1;
      } else if (type === 1) {
        // Right -> Left
        b.isHorizontal = true;
        b.channelIndex = Math.floor(Math.random() * rows);
        b.posCoord = halfW + 4;
        b.dir = -1;
      } else if (type === 2) {
        // Top -> Bottom
        b.isHorizontal = false;
        b.channelIndex = Math.floor(Math.random() * cols);
        b.posCoord = halfH + 4;
        b.dir = -1;
      } else if (type === 3) {
        // Bottom -> Top
        b.isHorizontal = false;
        b.channelIndex = Math.floor(Math.random() * cols);
        b.posCoord = -halfH - 4;
        b.dir = 1;
      } else {
        // Random channel
        const isH = Math.random() > 0.5;
        b.isHorizontal = isH;
        b.channelIndex = isH ? Math.floor(Math.random() * rows) : Math.floor(Math.random() * cols);
        const limit = isH ? halfW : halfH;
        b.dir = Math.random() > 0.5 ? 1 : -1;
        b.posCoord = -b.dir * (limit + 4);
      }
      b.speed = 0.08 + Math.random() * 0.05;
      b.length = 3.5 + Math.random() * 2.0; // Straight stretch length
    };

    const BEAM_COUNT = 10;
    const beams: Beam[] = Array.from({ length: BEAM_COUNT }, (_, i) => {
      const b: Beam = { isHorizontal: true, channelIndex: 0, posCoord: 0, dir: 1, speed: 0.1, length: 4 };
      resetBeam(b, i);
      // Stagger initial progress along line
      b.posCoord += (Math.random() * 14 - 7) * b.dir;
      return b;
    });

    // Beam data sent to GPU: [x, y, isHorizontal (1 or 0), length] x 10 = 40 floats
    const beamData = new Float32Array(BEAM_COUNT * 4);
    const beamUniforms = {
      uBeams: { value: beamData },
      uCursorPos: { value: new THREE.Vector2(999, 999) },
    };

    const stripMat = new THREE.ShaderMaterial({
      uniforms: beamUniforms,
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
        uniform float uBeams[40]; // 10 beams * 4 floats (x, y, isHorizontal, length)
        uniform vec2 uCursorPos;
        varying vec3 vWorldPos;
        varying vec2 vUv;

        void main() {
          float pulse = 0.0;

          // Check each of the 10 straight beams
          for (int i = 0; i < 10; i++) {
            float bx = uBeams[i * 4];
            float by = uBeams[i * 4 + 1];
            float isH = uBeams[i * 4 + 2];
            float bLen = uBeams[i * 4 + 3];

            if (isH > 0.5) {
              // Horizontal straight beam: must match exact channel Y
              float dy = abs(vWorldPos.y - by);
              if (dy < 0.12) {
                float dx = abs(vWorldPos.x - bx);
                // Continuous straight stretch of light
                pulse += smoothstep(bLen, 0.0, dx) * 3.2;
              }
            } else {
              // Vertical straight beam: must match exact channel X
              float dx = abs(vWorldPos.x - bx);
              if (dx < 0.12) {
                float dy = abs(vWorldPos.y - by);
                // Continuous straight stretch of light
                pulse += smoothstep(bLen, 0.0, dy) * 3.2;
              }
            }
          }

          float cursorGlow = smoothstep(4.0, 0.0, length(vWorldPos.xy - uCursorPos)) * 1.5;
          float intensity = pulse + cursorGlow + 0.08;
          float edgeFalloff = sin(vUv.y * 3.14159);
          intensity *= (0.3 + 0.7 * edgeFalloff);

          vec3 color = mix(vec3(0.5, 0.0, 0.06), vec3(1.0, 0.1, 0.22), clamp(intensity * 0.45, 0.0, 1.0));
          gl_FragColor = vec4(color * intensity, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    const stripW = gapSize * 1.15;
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
        beamUniforms.uCursorPos.value.set(pt.x, pt.y);

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

      // Update 10 Straight Beams
      const bArr = beamUniforms.uBeams.value;
      for (let i = 0; i < BEAM_COUNT; i++) {
        const b = beams[i];
        b.posCoord += b.dir * b.speed;

        const maxBound = b.isHorizontal ? halfW + 6 : halfH + 6;
        if (b.dir > 0 && b.posCoord > maxBound) {
          resetBeam(b, i);
        } else if (b.dir < 0 && b.posCoord < -maxBound) {
          resetBeam(b, i);
        }

        // Exact channel coordinates
        if (b.isHorizontal) {
          const channelY = b.channelIndex * step - halfH - gapSize / 2;
          bArr[i * 4] = b.posCoord;
          bArr[i * 4 + 1] = channelY;
          bArr[i * 4 + 2] = 1.0; // Horizontal flag
          bArr[i * 4 + 3] = b.length;
        } else {
          const channelX = b.channelIndex * step - halfW - gapSize / 2;
          bArr[i * 4] = channelX;
          bArr[i * 4 + 1] = b.posCoord;
          bArr[i * 4 + 2] = 0.0; // Vertical flag
          bArr[i * 4 + 3] = b.length;
        }
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
