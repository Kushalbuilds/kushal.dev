import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const THEME_PALETTES = {
  blue: {
    primary: 0x38bdf8,
    secondary: 0x818cf8,
    accent: 0x3b82f6,
    fog: 0x0a0d17,
    codeColor: '#38bdf8',
    codeAlt: '#818cf8',
    grid: 0x38bdf8,
    particles: [new THREE.Color(0x38bdf8), new THREE.Color(0x818cf8), new THREE.Color(0x34d399), new THREE.Color(0x60a5fa)]
  },
  red: {
    primary: 0xfb7185,
    secondary: 0xf43f5e,
    accent: 0xe11d48,
    fog: 0x0f070a,
    codeColor: '#fb7185',
    codeAlt: '#f43f5e',
    grid: 0xf43f5e,
    particles: [new THREE.Color(0xfb7185), new THREE.Color(0xf43f5e), new THREE.Color(0xff7849), new THREE.Color(0xfdba74)]
  },
  yellow: {
    primary: 0xfbbf24,
    secondary: 0xf59e0b,
    accent: 0xd97706,
    fog: 0x0d0c06,
    codeColor: '#fbbf24',
    codeAlt: '#f59e0b',
    grid: 0xfbbf24,
    particles: [new THREE.Color(0xfde047), new THREE.Color(0xfbbf24), new THREE.Color(0xf59e0b), new THREE.Color(0x34d399)]
  }
};

const CODE_SYMBOLS = [
  'const dev = new SoftwareEngineer();',
  'import { Spring, React, Node } from "tech";',
  'git commit -m "feat: scalable architecture"',
  'std::vector<System*> pipelines;',
  'public class BackendCore extends Microservice',
  'func handleTraffic(req *Request) Response',
  'async function deployProduction()',
  'docker run -d -p 8080:8080 app:v2',
  '{ return data.stream().filter(isValid); }',
  'SELECT id, name, status FROM deployments;',
  '<Terminal stdout="system:healthy" />',
  'def optimize_query(cache=Redis):',
  '{ }', '< />', 'fn()', '=>', '0x1F', '++', '&&', '||',
  'git push', 'npm run build', 'API.ready()', 'thread.pool(8)', 'REST.status(200)'
];

export default function HeroScene({ currentTheme = 'blue' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const palette = THEME_PALETTES[currentTheme] || THEME_PALETTES.blue;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(palette.fog, 0.02);

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // --- 1. Floating Code & Syntax Sprites ---
    const floatingSprites = [];
    const spriteGroup = new THREE.Group();
    scene.add(spriteGroup);

    CODE_SYMBOLS.forEach((text, i) => {
      const isShortSymbol = text.length <= 6;
      const canvas = document.createElement('canvas');
      canvas.width = isShortSymbol ? 180 : 540;
      canvas.height = 70;
      const ctx = canvas.getContext('2d');

      // Subtle translucent container tag background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.roundRect(4, 4, canvas.width - 8, canvas.height - 8, 12);
      ctx.fill();

      // Border glow
      ctx.lineWidth = 2;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(129, 140, 248, 0.35)';
      ctx.stroke();

      // Syntax text
      ctx.font = isShortSymbol
        ? 'bold 30px "JetBrains Mono", monospace'
        : '600 21px "JetBrains Mono", monospace';
      ctx.fillStyle = i % 3 === 0 ? palette.codeColor : (i % 3 === 1 ? palette.codeAlt : '#e2e8f0');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;

      const mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: isShortSymbol ? 0.35 : 0.45,
        blending: THREE.AdditiveBlending
      });

      const sprite = new THREE.Sprite(mat);

      // Distribute in a 3D bubble around the perimeter so center text stays clean and readable
      const angle = (i / CODE_SYMBOLS.length) * Math.PI * 2;
      const dist = 14 + (i % 5) * 3;
      const x = Math.cos(angle) * dist + (Math.random() - 0.5) * 4;
      const y = Math.sin(angle) * (dist * 0.55) + (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 16;

      sprite.position.set(x, y, z);
      const scaleX = isShortSymbol ? 2.6 : 6.5;
      const scaleY = isShortSymbol ? 1.0 : 0.9;
      sprite.scale.set(scaleX, scaleY, 1);

      spriteGroup.add(sprite);

      floatingSprites.push({
        sprite,
        mat,
        baseX: x,
        baseY: y,
        baseZ: z,
        rotSpeed: 0.003 + Math.random() * 0.004,
        floatSpeed: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        baseOpacity: isShortSymbol ? 0.32 : 0.42
      });
    });

    // --- 2. Ambient Constellation / Floating Star Particles ---
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 65;
      particlePos[i + 1] = (Math.random() - 0.5) * 45;
      particlePos[i + 2] = (Math.random() - 0.5) * 35;

      const c = palette.particles[Math.floor(Math.random() * palette.particles.length)];
      particleColors[i] = c.r;
      particleColors[i + 1] = c.g;
      particleColors[i + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(particleGeo, particleMat);
    scene.add(starField);

    // --- 3. Subtle Digital Tech Grid (Floor & Horizon) ---
    const gridHelper = new THREE.GridHelper(70, 45, palette.grid, 0x1e293b);
    gridHelper.position.y = -10;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.12;
    scene.add(gridHelper);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(palette.primary, 2, 40);
    pointLight1.position.set(-15, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(palette.secondary, 2, 40);
    pointLight2.position.set(15, -10, 10);
    scene.add(pointLight2);

    // --- Mouse Parallax & Interactivity ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let clickRippleTime = -10;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const handleClick = () => {
      clickRippleTime = clock.getElapsedTime();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetMouseX += (mouseX - targetMouseX) * 0.04;
      targetMouseY += (mouseY - targetMouseY) * 0.04;

      // Parallax camera sway
      camera.position.x = targetMouseX * 3.5;
      camera.position.y = -targetMouseY * 2.5;
      camera.lookAt(0, 0, 0);

      // Starfield subtle rotation
      starField.rotation.y = t * 0.015;
      gridHelper.rotation.y = t * 0.008;

      // Floating code sprites gentle drift + click ripple
      const timeSinceClick = t - clickRippleTime;
      floatingSprites.forEach((item) => {
        const floatY = Math.sin(t * item.floatSpeed + item.phase) * 0.8;
        const floatX = Math.cos(t * (item.floatSpeed * 0.7) + item.phase) * 0.6;

        item.sprite.position.y = item.baseY + floatY + targetMouseY * 1.5;
        item.sprite.position.x = item.baseX + floatX + targetMouseX * 1.5;

        // Interactive ripple expansion if clicked recently
        if (timeSinceClick < 1.8) {
          const rippleFactor = Math.sin((timeSinceClick / 1.8) * Math.PI);
          item.mat.opacity = item.baseOpacity + rippleFactor * 0.45;
        } else {
          item.mat.opacity = item.baseOpacity + Math.sin(t * 1.5 + item.phase) * 0.08;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentTheme]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 1,
        cursor: 'default'
      }}
    />
  );
}
