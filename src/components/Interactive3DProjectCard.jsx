import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Interactive3DProjectCard({ project }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Pick shape and color based on project type
    let mainMesh;
    let particles;

    if (project.id === 'netflix-analysis') {
      // Data Torus knot
      const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 100, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xe50914,
        emissive: 0x831010,
        roughness: 0.25,
        metalness: 0.85,
        wireframe: true
      });
      mainMesh = new THREE.Mesh(geo, mat);
    } else if (project.id === 'house-price-prediction') {
      // 3D Polyhedron / Dodecahedron architecture
      const geo = new THREE.DodecahedronGeometry(1.5, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x065f46,
        roughness: 0.2,
        metalness: 0.9,
        wireframe: true
      });
      mainMesh = new THREE.Mesh(geo, mat);
    } else {
      // Enterprise System: Octahedron + Ring
      const group = new THREE.Group();
      const geo = new THREE.OctahedronGeometry(1.4, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x1d4ed8,
        roughness: 0.2,
        metalness: 0.85,
        wireframe: true
      });
      const core = new THREE.Mesh(geo, mat);
      group.add(core);

      const rGeo = new THREE.TorusGeometry(2.0, 0.04, 16, 60);
      const rMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);

      mainMesh = group;
    }

    scene.add(mainMesh);

    // Ambient halo points
    const pGeo = new THREE.BufferGeometry();
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.7
    });
    particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xffffff, 1.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (mainMesh) {
        mainMesh.rotation.x = t * 0.45;
        mainMesh.rotation.y = t * 0.65;
      }
      if (particles) {
        particles.rotation.y = -t * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [project.id]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '180px',
        position: 'relative',
        cursor: 'grab'
      }}
    />
  );
}

