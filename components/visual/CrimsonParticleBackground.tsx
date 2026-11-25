"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

interface CrimsonParticleBackgroundProps {
  imageSrc?: string;
  className?: string;
}

export function CrimsonParticleBackground({
  imageSrc = "/images/logo.png",
  className = "",
}: CrimsonParticleBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let isMounted = true;
    let animationFrameId: number;

    // 1. Particle Budget: 38% logo emblem, 62% flowing crimson ribbons
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 8500 : 16000;
    const LOGO_RATIO = 0.38;
    const LOGO_COUNT = Math.floor(PARTICLE_COUNT * LOGO_RATIO);

    // 2. Three.js Scene, Camera, Renderer & Post-Processing
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const domElement = renderer.domElement;
    mount.appendChild(domElement);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.88, // Volumetric crimson/scarlet glow strength
      0.62, // Soft atmospheric halo radius
      0.14  // Threshold so ribbon crests and emblem lines glow softly
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // 3. Fallback Procedural High-Res Emblem Generator (Trident, Crescent, Flame, Heart, Lotus)
    function buildDefaultEmblemCanvas(): HTMLCanvasElement {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return canvas;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = "#050505";
      ctx.fillStyle = "#050505";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const cx = size * 0.5;

      // Center Trident Spearhead & Shaft
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx, 46);
      ctx.lineTo(cx - 22, 126);
      ctx.lineTo(cx, 154);
      ctx.lineTo(cx + 22, 126);
      ctx.closePath();
      ctx.stroke();

      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, 54);
      ctx.lineTo(cx, 148);
      ctx.stroke();

      // Left & Right Outer Trident Prongs + U-Bowl
      ctx.lineWidth = 8.5;
      ctx.beginPath();
      ctx.moveTo(cx - 78, 86);
      ctx.bezierCurveTo(cx - 68, 142, cx - 108, 178, cx - 96, 232);
      ctx.bezierCurveTo(cx - 86, 274, cx - 34, 286, cx, 264);
      ctx.stroke();

      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(cx - 78, 92);
      ctx.bezierCurveTo(cx - 56, 144, cx - 84, 182, cx - 74, 224);
      ctx.bezierCurveTo(cx - 64, 256, cx - 26, 266, cx, 256);
      ctx.stroke();

      ctx.lineWidth = 8.5;
      ctx.beginPath();
      ctx.moveTo(cx + 78, 86);
      ctx.bezierCurveTo(cx + 68, 142, cx + 108, 178, cx + 96, 232);
      ctx.bezierCurveTo(cx + 86, 274, cx + 34, 286, cx, 264);
      ctx.stroke();

      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(cx + 78, 92);
      ctx.bezierCurveTo(cx + 56, 144, cx + 84, 182, cx + 74, 224);
      ctx.bezierCurveTo(cx + 64, 256, cx + 26, 266, cx, 256);
      ctx.stroke();

      // Asymmetric Crescent Arc Sweeping Across Middle Spear
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.moveTo(cx - 32, 134);
      ctx.bezierCurveTo(cx + 26, 114, cx + 96, 152, cx + 86, 214);
      ctx.bezierCurveTo(cx + 78, 256, cx + 34, 272, cx + 2, 262);
      ctx.stroke();

      // Central Sacred Flame
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx, 252);
      ctx.bezierCurveTo(cx - 34, 236, cx - 34, 198, cx - 14, 184);
      ctx.bezierCurveTo(cx - 18, 198, cx - 10, 204, cx - 8, 192);
      ctx.bezierCurveTo(cx - 8, 174, cx - 2, 162, cx, 154);
      ctx.bezierCurveTo(cx + 4, 166, cx + 12, 178, cx + 10, 194);
      ctx.bezierCurveTo(cx + 14, 204, cx + 20, 196, cx + 16, 184);
      ctx.bezierCurveTo(cx + 34, 200, cx + 32, 236, cx, 252);
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, 246);
      ctx.bezierCurveTo(cx - 14, 234, cx - 12, 214, cx, 200);
      ctx.bezierCurveTo(cx + 12, 214, cx + 14, 234, cx, 246);
      ctx.stroke();

      // V-Shaped Stem Connecting Trident to Lotus & Heart
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx - 26, 268);
      ctx.lineTo(cx, 336);
      ctx.lineTo(cx + 26, 268);
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 12, 274);
      ctx.lineTo(cx, 308);
      ctx.lineTo(cx + 12, 274);
      ctx.stroke();

      // Lotus Petals Framing the Heart
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx - 12, 344);
      ctx.quadraticCurveTo(cx - 46, 314, cx - 54, 348);
      ctx.quadraticCurveTo(cx - 34, 360, cx - 18, 358);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 12, 344);
      ctx.quadraticCurveTo(cx + 46, 314, cx + 54, 348);
      ctx.quadraticCurveTo(cx + 34, 360, cx + 18, 358);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 32, 356);
      ctx.quadraticCurveTo(cx - 74, 352, cx - 80, 382);
      ctx.quadraticCurveTo(cx - 56, 404, cx - 22, 404);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 32, 356);
      ctx.quadraticCurveTo(cx + 74, 352, cx + 80, 382);
      ctx.quadraticCurveTo(cx + 56, 404, cx + 22, 404);
      ctx.stroke();

      // Central Heart at Base of Lotus
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.moveTo(cx, 428);
      ctx.bezierCurveTo(cx - 44, 396, cx - 44, 350, cx - 18, 350);
      ctx.bezierCurveTo(cx - 6, 350, cx, 360, cx, 368);
      ctx.bezierCurveTo(cx, 360, cx + 6, 350, cx + 18, 350);
      ctx.bezierCurveTo(cx + 44, 350, cx + 44, 396, cx, 428);
      ctx.stroke();

      // Outer Sweeping Crescent Cradle & Spiral Tendrils
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.moveTo(cx - 112, 298);
      ctx.bezierCurveTo(cx - 122, 388, cx - 58, 434, cx, 438);
      ctx.bezierCurveTo(cx + 58, 434, cx + 122, 388, cx + 112, 298);
      ctx.stroke();

      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(cx - 98, 304);
      ctx.bezierCurveTo(cx - 104, 378, cx - 50, 420, cx, 426);
      ctx.bezierCurveTo(cx + 50, 420, cx + 104, 378, cx + 98, 304);
      ctx.stroke();

      ctx.lineWidth = 6.5;
      ctx.beginPath();
      ctx.moveTo(cx - 112, 298);
      ctx.bezierCurveTo(cx - 134, 286, cx - 126, 256, cx - 104, 260);
      ctx.bezierCurveTo(cx - 92, 262, cx - 92, 276, cx - 102, 278);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 112, 298);
      ctx.bezierCurveTo(cx + 134, 286, cx + 126, 256, cx + 104, 260);
      ctx.bezierCurveTo(cx + 92, 262, cx + 92, 276, cx + 102, 278);
      ctx.stroke();

      ctx.lineWidth = 6.5;
      ctx.beginPath();
      ctx.moveTo(cx, 428);
      ctx.lineTo(cx, 464);
      ctx.stroke();

      return canvas;
    }

    // 4. Sobel Edge-Weighted Sampler strictly ignoring transparent/checkerboard backgrounds
    function sampleEmblemCoordinates(
      sourceCanvas: HTMLCanvasElement,
      count: number
    ): Float32Array {
      const w = sourceCanvas.width;
      const h = sourceCanvas.height;
      const ctx = sourceCanvas.getContext("2d");
      if (!ctx) return new Float32Array(count * 3);

      const imgData = ctx.getImageData(0, 0, w, h).data;
      const lum = new Float32Array(w * h);
      let minX = w, maxX = 0, minY = h, maxY = 0;
      let darkCount = 0;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          // Filter out transparent pixels AND light gray/white checkerboard squares
          if (a > 180 && brightness < 95) {
            lum[y * w + x] = brightness;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            darkCount++;
          } else {
            lum[y * w + x] = 255;
          }
        }
      }

      // Fallback if image has inverted strokes
      if (darkCount < 40) {
        minX = w; maxX = 0; minY = h; maxY = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const brightness =
              0.299 * imgData[idx] +
              0.587 * imgData[idx + 1] +
              0.114 * imgData[idx + 2];
            if (imgData[idx + 3] > 180 && brightness > 160) {
              lum[y * w + x] = 255 - brightness;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
      }

      const edgePoints: [number, number][] = [];
      const fillPoints: [number, number][] = [];

      const xStart = Math.max(1, minX);
      const xEnd = Math.min(w - 2, maxX);
      const yStart = Math.max(1, minY);
      const yEnd = Math.min(h - 2, maxY);

      for (let y = yStart; y <= yEnd; y++) {
        for (let x = xStart; x <= xEnd; x++) {
          const c = lum[y * w + x];
          if (c >= 250) continue;

          const gx =
            -lum[(y - 1) * w + (x - 1)] + lum[(y - 1) * w + (x + 1)] +
            -2 * lum[y * w + (x - 1)] + 2 * lum[y * w + (x + 1)] +
            -lum[(y + 1) * w + (x - 1)] + lum[(y + 1) * w + (x + 1)];

          const gy =
            -lum[(y - 1) * w + (x - 1)] - 2 * lum[(y - 1) * w + x] - lum[(y - 1) * w + (x + 1)] +
            lum[(y + 1) * w + (x - 1)] + 2 * lum[(y + 1) * w + x] + lum[(y + 1) * w + (x + 1)];

          const grad = Math.hypot(gx, gy);
          if (grad > 190) {
            edgePoints.push([x, y]);
          } else {
            fillPoints.push([x, y]);
          }
        }
      }

      const boxW = Math.max(maxX - minX, 1);
      const boxH = Math.max(maxY - minY, 1);
      const uniformScale = Math.max(boxW, boxH);
      const centerX = (minX + maxX) * 0.5;
      const centerY = (minY + maxY) * 0.5;

      const targets = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const useEdge =
          edgePoints.length > 0 &&
          (Math.random() < 0.72 || fillPoints.length === 0);
        const pool = useEdge
          ? edgePoints
          : fillPoints.length > 0
            ? fillPoints
            : ([[centerX, centerY]] as [number, number][]);
        const pt = pool[Math.floor(Math.random() * pool.length)];

        const jx = pt[0] + (Math.random() - 0.5) * 0.65;
        const jy = pt[1] + (Math.random() - 0.5) * 0.65;

        targets[i * 3] = (jx - centerX) / uniformScale;
        targets[i * 3 + 1] = -(jy - centerY) / uniformScale;
        targets[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
      }
      return targets;
    }

    const defaultEmblemCanvas = buildDefaultEmblemCanvas();
    const initialEmblemPoints = sampleEmblemCoordinates(
      defaultEmblemCanvas,
      LOGO_COUNT
    );

    // 5. Initialize Buffer Attributes
    // Origin calculation: Starts from left-top on desktop, right-top on tablet/mobile
    const isTabletOrBelowInit = window.innerWidth < 1024;
    const vFovRadInit = (camera.fov * Math.PI) / 180;
    const visHInit = 2.0 * Math.tan(vFovRadInit * 0.5) * camera.position.z;
    const visWInit = visHInit * (window.innerWidth / window.innerHeight);

    const startXOrigin = isTabletOrBelowInit
      ? visWInit * 0.42 // Top-Right on tablet and below
      : -visWInit * 0.42; // Top-Left on desktop and above
    const startYOrigin = visHInit * 0.44; // Top of the viewport

    const startPositions = new Float32Array(PARTICLE_COUNT * 3);
    const burstDirs = new Float32Array(PARTICLE_COUNT * 3);
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const ribbonSeeds = new Float32Array(PARTICLE_COUNT * 4); // [size, alpha, colorMix, isLogoParticle]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.18 * Math.cbrt(Math.random());

      const sinPhi = Math.sin(phi);
      const dx = sinPhi * Math.cos(theta);
      const dy = sinPhi * Math.sin(theta);
      const dz = Math.cos(phi);

      // Start particles clustered at the responsive top corner origin
      startPositions[i * 3] = startXOrigin + dx * r;
      startPositions[i * 3 + 1] = startYOrigin + dy * r;
      startPositions[i * 3 + 2] = dz * r;

      // Random 3D omnidirectional velocity burst vectors
      burstDirs[i * 3] = dx * 2.8 + (Math.random() - 0.5) * 1.5;
      burstDirs[i * 3 + 1] = dy * 2.2 + (Math.random() - 0.5) * 1.5;
      burstDirs[i * 3 + 2] = dz * 1.6 + (Math.random() - 0.5) * 1.2;

      if (i < LOGO_COUNT) {
        targetPositions[i * 3] = initialEmblemPoints[i * 3];
        targetPositions[i * 3 + 1] = initialEmblemPoints[i * 3 + 1];
        targetPositions[i * 3 + 2] = initialEmblemPoints[i * 3 + 2];

        ribbonSeeds[i * 4] = 1.05 + Math.random() * 1.15;
        ribbonSeeds[i * 4 + 1] = 0.42 + Math.random() * 0.34;
        ribbonSeeds[i * 4 + 2] = 0.35 + Math.random() * 0.65;
        ribbonSeeds[i * 4 + 3] = 1.0;
      } else {
        // Disperse ambient stream seeds across the full screen
        const uWide = (Math.random() - 0.5) * 5.8;
        const vWide = (Math.random() - 0.5) * 4.2;
        const zWide = (Math.random() - 0.5) * 1.8;
        targetPositions[i * 3] = uWide;
        targetPositions[i * 3 + 1] = vWide;
        targetPositions[i * 3 + 2] = zWide;

        ribbonSeeds[i * 4] = 1.45 + Math.random() * 2.25;
        ribbonSeeds[i * 4 + 1] = 0.36 + Math.random() * 0.42;
        ribbonSeeds[i * 4 + 2] = Math.pow(Math.random(), 1.3);
        ribbonSeeds[i * 4 + 3] = 0.0;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(startPositions, 3));
    geometry.setAttribute("aBurstDir", new THREE.BufferAttribute(burstDirs, 3));
    geometry.setAttribute("aTargetPos", new THREE.BufferAttribute(targetPositions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(ribbonSeeds, 4));

    // 6. Shader Material with Exact reference-particle-bg.html Shaders
    // Configured: Curl 5% (0.05), Flow 5% (0.05), Swirl 2% (0.02)
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uFlowTime: { value: 0 },
        uCurlStrength: { value: 0.05 }, // 5% curl turbulence
        uLogoEnabled: { value: 1.0 },
        uLogoAnchor: { value: new THREE.Vector3(-2.65, 1.82, 0.0) },
        uLogoScale: { value: 0.78 },
        uScrollDisperse: { value: 0.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uMouseWorld: { value: new THREE.Vector3(999, 999, 0) },
      },
      vertexShader: `
        attribute vec3 aBurstDir;
        attribute vec3 aTargetPos;
        attribute vec4 aSeed;

        uniform float uTime;
        uniform float uFlowTime;
        uniform float uCurlStrength;
        uniform float uLogoEnabled;
        uniform vec3 uLogoAnchor;
        uniform float uLogoScale;
        uniform float uScrollDisperse;
        uniform float uPixelRatio;
        uniform vec3 uMouseWorld;

        varying float vAlpha;
        varying float vColorMix;
        varying float vBokehBlur;
        varying float vCoreHeat;
        varying float vFoldDensity;

        // --- 3D Simplex Noise ---
        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);

          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;

          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

          float n_ = 1.0 / 7.0;
          vec3 ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);

          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);

          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        // --- Divergence-Free 3D Curl Noise Field ---
        vec3 curlNoise(vec3 p) {
          const float e = 0.085;
          vec3 dx = vec3(e, 0.0, 0.0);
          vec3 dy = vec3(0.0, e, 0.0);
          vec3 dz = vec3(0.0, 0.0, e);

          vec3 p1 = p;
          vec3 p2 = p + vec3(31.4, 17.2, -11.8);
          vec3 p3 = p + vec3(-19.8, 43.1, 27.5);

          float dP3_dy = (snoise(p3 + dy) - snoise(p3 - dy)) / (2.0 * e);
          float dP2_dz = (snoise(p2 + dz) - snoise(p2 - dz)) / (2.0 * e);
          float dP1_dz = (snoise(p1 + dz) - snoise(p1 - dz)) / (2.0 * e);
          float dP3_dx = (snoise(p3 + dx) - snoise(p3 - dx)) / (2.0 * e);
          float dP2_dx = (snoise(p2 + dx) - snoise(p2 - dx)) / (2.0 * e);
          float dP1_dy = (snoise(p1 + dy) - snoise(p1 - dy)) / (2.0 * e);

          return vec3(dP3_dy - dP2_dz, dP1_dz - dP3_dx, dP2_dx - dP1_dy);
        }

        void main() {
          float sizeSeed = aSeed.x;
          float alphaSeed = aSeed.y;
          float colorSeed = aSeed.z;
          float isLogo = aSeed.w;

          // 1. Eruption Envelope: expansive spread across the entire viewport
          float expandT = clamp(uTime / 4.8, 0.0, 1.0);
          float easeCloud = 1.0 - pow(1.0 - expandT, 2.8);

          // Widen radial spread factor to cover the full viewport
          float radialSpread = mix(1.6, 3.8, colorSeed);
          float scrollRadialBoost = uScrollDisperse * (3.0 + colorSeed * 2.2);
          vec3 ribbonPos = position + aBurstDir * (easeCloud * radialSpread + scrollRadialBoost);
          ribbonPos += aTargetPos * (1.0 - isLogo) * easeCloud; // disperse ambient particles across full screen
          ribbonPos.y += uScrollDisperse * (0.4 + colorSeed * 0.8);

          // 2. Two-Octave Curl-Noise Streamline Advection
          float activeCurl = uCurlStrength * (1.0 + uScrollDisperse * 1.15);
          vec3 fieldCoord1 = ribbonPos * 0.62 + vec3(uFlowTime * 0.075, -uFlowTime * 0.055, uFlowTime * 0.045);
          vec3 curl1 = curlNoise(fieldCoord1) * activeCurl;
          ribbonPos += curl1 * (0.28 + easeCloud * 1.15 + uScrollDisperse * 0.9);

          vec3 fieldCoord2 = ribbonPos * 1.25 + vec3(-uFlowTime * 0.09, uFlowTime * 0.06, -uFlowTime * 0.05);
          vec3 curl2 = curlNoise(fieldCoord2) * activeCurl;
          ribbonPos += curl2 * (0.12 + easeCloud * 0.36 + uScrollDisperse * 0.42);

          // Initial Swirl: 89% (0.89) during first 20 seconds, then smoothly transitions to 2% (0.02)
          float swirlDecay = smoothstep(20.0, 15.0, uTime); // 1.0 during 0-15s, smoothly transitions to 0.0 by 20s
          float currentSwirl = mix(0.02, 0.89, swirlDecay);
          ribbonPos *= 1.0 + currentSwirl * sin(uFlowTime * 0.85 + colorSeed * 3.14);

          // Random 3D Brownian micro-wander for natural organic particle motion
          vec3 randomMicroJitter = vec3(
            sin(uFlowTime * 1.4 + alphaSeed * 18.0),
            cos(uFlowTime * 1.6 + colorSeed * 22.0),
            sin(uFlowTime * 1.2 + sizeSeed * 14.0)
          ) * (0.04 + easeCloud * 0.08);
          ribbonPos += randomMicroJitter;

          // 3. Top-Left Brand Emblem Target Position + Living Shimmer
          vec3 logoWorldPos = uLogoAnchor + aTargetPos * uLogoScale;
          vec3 logoMicroCurl = curlNoise(logoWorldPos * 3.8 + vec3(uFlowTime * 0.32)) * 0.0085 * uCurlStrength;
          float flameMask = smoothstep(0.14, 0.02, abs(aTargetPos.x)) * smoothstep(-0.02, 0.14, aTargetPos.y) * smoothstep(0.28, 0.14, aTargetPos.y);
          logoMicroCurl.y += flameMask * (0.012 + 0.01 * sin(uFlowTime * 6.5 + aTargetPos.x * 40.0));
          logoWorldPos += logoMicroCurl;

          float gatherPhase = smoothstep(0.6, 3.4, uTime);
          float scrollDissolve = smoothstep(0.02, 0.48, uScrollDisperse);
          float morphWeight = isLogo * uLogoEnabled * gatherPhase * (1.0 - scrollDissolve);

          float flightArc = sin(morphWeight * 3.14159);
          vec3 pos = mix(ribbonPos, logoWorldPos, morphWeight) + curl1 * (flightArc * 0.24);

          // 4. Interactive Cursor / Touch Repulsion
          vec3 toParticle = pos - uMouseWorld;
          float mDist = length(toParticle);
          float repelRadius = mix(0.95, 0.55, morphWeight);
          if (mDist < repelRadius && mDist > 0.0001) {
            float force = pow(1.0 - mDist / repelRadius, 2.0) * mix(0.45, 0.18, morphWeight);
            pos += normalize(toParticle) * force;
            pos.z += force * 0.45;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // 5. Depth-of-Field Bokeh Scaling
          float focalDist = abs(pos.z);
          float bokehFactor = clamp((focalDist - 0.25) / 2.2, 0.0, 1.0) * (1.0 - morphWeight * 0.85);
          vBokehBlur = bokehFactor;

          float twinkle = 0.88 + 0.12 * sin(uFlowTime * 3.4 + aBurstDir.x * 11.0 + aBurstDir.y * 9.0);
          float bokehScale = 1.0 + bokehFactor * 1.75;
          float scrollSizeBoost = 1.0 + uScrollDisperse * 0.25;
          gl_PointSize = sizeSeed * twinkle * bokehScale * scrollSizeBoost * uPixelRatio * (6.2 / -mvPosition.z);

          float scrollFade = mix(1.0, 0.44, uScrollDisperse);
          float emblemBoost = mix(1.0, 1.18, morphWeight);
          vAlpha = clamp(alphaSeed * emblemBoost * (1.0 - bokehFactor * 0.5) * scrollFade, 0.0, 0.95);
          vColorMix = mix(colorSeed, clamp(colorSeed + 0.22 + flameMask * 0.35, 0.0, 1.0), morphWeight);
          vCoreHeat = clamp(1.0 - uTime * 0.55, 0.0, 1.0) * (1.0 - uScrollDisperse * 0.85);
          vFoldDensity = clamp(length(curl1) * 0.55, 0.0, 1.0) * (1.0 - uScrollDisperse * 0.45);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vColorMix;
        varying float vBokehBlur;
        varying float vCoreHeat;
        varying float vFoldDensity;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv) * 2.0;
          if (dist > 1.0) discard;

          float sharpCore = exp(-dist * dist * 5.8);
          float sharpHalo = pow(1.0 - dist, 2.2) * 0.44;
          float inFocusIntensity = sharpCore + sharpHalo;

          float bokehOrb = smoothstep(1.0, 0.22, dist) * 0.62;
          float intensity = mix(inFocusIntensity, bokehOrb, vBokehBlur);

          // Rich Crimson, Scarlet & Ember-Rose Palette (#991b1b -> #ef4444 -> #fca5a5)
          vec3 deepCrimson  = vec3(0.60, 0.11, 0.11); // #991b1b
          vec3 scarletRed   = vec3(0.94, 0.27, 0.27); // #ef4444
          vec3 emberRose    = vec3(0.99, 0.65, 0.65); // #fca5a5

          vec3 baseColor = mix(deepCrimson, scarletRed, vColorMix);
          float hotBoost = clamp(sharpCore * 0.52 + vCoreHeat * 0.55 + vFoldDensity * 0.26, 0.0, 1.0);
          vec3 finalColor = mix(baseColor, emberRose, hotBoost);

          gl_FragColor = vec4(finalColor, intensity * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);
    setIsLoaded(true);

    // 7. Load /images/logo.png for Custom Exact Emblem Sampling
    const customImg = new Image();
    customImg.crossOrigin = "anonymous";
    customImg.src = imageSrc;

    customImg.onload = () => {
      if (!isMounted) return;
      const offCanvas = document.createElement("canvas");
      const maxDim = 512;
      const scale = Math.min(maxDim / customImg.width, maxDim / customImg.height, 1);
      offCanvas.width = Math.max(1, Math.round(customImg.width * scale));
      offCanvas.height = Math.max(1, Math.round(customImg.height * scale));
      const ctx = offCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(customImg, 0, 0, offCanvas.width, offCanvas.height);
      const newTargets = sampleEmblemCoordinates(offCanvas, LOGO_COUNT);
      const attr = geometry.getAttribute("aTargetPos") as THREE.BufferAttribute;
      for (let i = 0; i < LOGO_COUNT; i++) {
        attr.array[i * 3] = newTargets[i * 3];
        attr.array[i * 3 + 1] = newTargets[i * 3 + 1];
        attr.array[i * 3 + 2] = newTargets[i * 3 + 2];
      }
      attr.needsUpdate = true;
    };

    // 8. Viewport Frustum Calculation:
    // Desktop (>= 1024px): Top-Left corner
    // Tablet & Mobile (< 1024px): Top-Right corner
    function adjustResponsiveViewport() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspect = w / h;

      camera.aspect = aspect;
      camera.position.z = aspect < 0.85 ? (6.2 / aspect) * 0.82 : 6.2;
      camera.updateProjectionMatrix();

      const vFovRad = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFovRad * 0.5) * camera.position.z;
      const visibleWidth = visibleHeight * aspect;

      const isTabletOrBelow = w < 1024;
      const logoScale = w < 640 ? visibleHeight * 0.115 : visibleHeight * 0.145;

      const topPadPx = w >= 640 ? 54 : 48;
      const anchorY = visibleHeight * 0.5 - (topPadPx / h) * visibleHeight;

      let anchorX: number;
      if (isTabletOrBelow) {
        // Form on the TOP-RIGHT corner on tablet and mobile
        const rightPadPx = w >= 640 ? 74 : 46;
        anchorX = visibleWidth * 0.5 - (rightPadPx / w) * visibleWidth;
      } else {
        // Form on the TOP-LEFT corner on desktop
        const leftPadPx = 108;
        anchorX = -visibleWidth * 0.5 + (leftPadPx / w) * visibleWidth;
      }

      particleMaterial.uniforms.uLogoAnchor.value.set(anchorX, anchorY, 0);
      particleMaterial.uniforms.uLogoScale.value = logoScale;

      const pr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(pr);
      composer.setSize(w, h);
      bloomPass.resolution.set(w, h);
      particleMaterial.uniforms.uPixelRatio.value = pr;
    }

    // 9. Window Interactivity: Scroll, Pointer Move & Parallax
    let simTime = 0;
    let flowTime = 0;
    const flowSpeed = 0.10; // 10% Flow speed (reduced as requested)
    let targetScrollDisperse = 0.0;
    let currentScrollDisperse = 0.0;

    const mouseNDC = new THREE.Vector2(999, 999);
    const targetCamOffset = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3(999, 999, 0);

    function handleScroll() {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      targetScrollDisperse = progress;
    }

    function updatePointer(clientX: number, clientY: number) {
      mouseNDC.x = (clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(clientY / window.innerHeight) * 2 + 1;

      targetCamOffset.x = mouseNDC.x * 0.22;
      targetCamOffset.y = mouseNDC.y * 0.16;

      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(zPlane, mouseWorld);
      particleMaterial.uniforms.uMouseWorld.value.copy(mouseWorld);
    }

    const onPointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onPointerLeave = () => {
      mouseWorld.set(999, 999, 0);
      particleMaterial.uniforms.uMouseWorld.value.set(999, 999, 0);
      targetCamOffset.set(0, 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", adjustResponsiveViewport);

    handleScroll();
    adjustResponsiveViewport();

    // 10. Animation Loop with Tab Visibility Check & Throttle
    const clock = new THREE.Clock();
    let isTabVisible = !document.hidden;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        clock.getDelta(); // reset delta so there's no sudden jump
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    function animate() {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return; // Pause rendering loop when tab is backgrounded

      const dt = Math.min(clock.getDelta(), 0.05);

      currentScrollDisperse += (targetScrollDisperse - currentScrollDisperse) * 0.08;
      particleMaterial.uniforms.uScrollDisperse.value = currentScrollDisperse;

      simTime += dt * flowSpeed;
      flowTime += dt * flowSpeed;
      particleMaterial.uniforms.uTime.value = simTime;
      particleMaterial.uniforms.uFlowTime.value = flowTime;

      const swayX = Math.sin(flowTime * 0.35) * 0.07;
      const swayY = Math.cos(flowTime * 0.28) * 0.05;
      camera.position.x += (targetCamOffset.x + swayX - camera.position.x) * 0.05;
      camera.position.y += (targetCamOffset.y + swayY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      composer.render();
    }

    animate();

    // 11. Memory Cleanup
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);

      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", adjustResponsiveViewport);

      geometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (domElement.parentNode === mount) {
        mount.removeChild(domElement);
      }
    };
  }, [imageSrc]);

  return (
    <div
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-black select-none ${className}`}
    >
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 pointer-events-none">
          <div className="h-6 w-6 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}
