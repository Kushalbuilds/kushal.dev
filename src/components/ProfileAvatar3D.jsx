import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const THEME_HALO_COLORS = {
  blue: { r1: 0x38bdf8, r2: 0xa855f7, particles: 0x38bdf8 },
  red: { r1: 0xfb7185, r2: 0xf43f5e, particles: 0xff7849 },
  yellow: { r1: 0xfbbf24, r2: 0xf59e0b, particles: 0xfde047 }
};

export default function ProfileAvatar3D({ photoUrl, currentTheme = 'blue' }) {
  const mountRef = useRef(null);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Three.js animated background particle halo behind the portrait
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Clear previous if any
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const width = 280;
    const height = 280;

    const colors = THEME_HALO_COLORS[currentTheme] || THEME_HALO_COLORS.blue;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Dynamic glowing ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colors.r1,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.03, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colors.r2,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    // Orbiting particle halo
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 0.7;
      pos[i] = Math.cos(angle) * r;
      pos[i + 1] = Math.sin(angle) * r;
      pos[i + 2] = (Math.random() - 0.5) * 1.2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      color: colors.particles,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      ring1.rotation.z = t * 0.4;
      ring2.rotation.y = t * 0.35;
      ring2.rotation.x = Math.sin(t * 0.3) * 0.5 + Math.PI / 4;
      particles.rotation.z = -t * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentTheme]);

  // 3D Parallax Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -16; // tilt degrees
    const ry = ((x - centerX) / centerX) * 16;
    setTilt({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, rx, ry });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 50, y: 50, rx: 0, ry: 0 });
  };

  return (
    <div className="profile-3d-wrapper">
      {/* Three.js animated orbiting rings layer */}
      <div ref={mountRef} className="profile-canvas-halo" />

      {/* 3D Tilt Card Frame */}
      <div
        ref={cardRef}
        className={`profile-card-3d ${isHovered ? 'hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${isHovered ? '25px' : '0px'})`
        }}
      >
        <div className="profile-glass-border">
          <div className="profile-image-container">
            <img
              src={`${photoUrl || "/profile.jpg"}?v=2`}
              alt="Kushal K Hiremath - Software Engineer"
              className="profile-photo-img"
            />
            {/* Holographic light sheen reflection */}
            <div
              className="profile-sheen"
              style={{
                background: `radial-gradient(circle at ${tilt.x}% ${tilt.y}%, rgba(255,255,255,0.45) 0%, var(--border-glow) 40%, transparent 70%)`,
                opacity: isHovered ? 0.75 : 0.2
              }}
            />
          </div>
        </div>

        {/* Floating 3D Badge */}
        <div className="profile-3d-badge">
          <span className="badge-glow-dot"></span>
          <span>Open for Software Engineer Roles</span>
        </div>
      </div>
    </div>
  );
}
