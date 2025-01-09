'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  BufferAttribute,
  Mesh,
} from 'three';

import mobileBackground from '/public/images/background-mobile_bgw.png';
import desktopBackground from '/public/images/background-desktop_bgw.png';

import vertexShader from './shaders/background.vert';
import fragmentShader from './shaders/background.frag';

import getScrollPercentage from '../../../../../helpers/getScrollPercentage';

const MOBILE_BREAKPOINT = 768;
const MOBILE_MULTIPLIER = 2;
const DESKTOP_MULTIPLIER = 2;

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const [background, setBackground] = useState<string>(mobileBackground.src);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [directionsMultiplier, setDirectionsMultiplier] = useState<number>(1);

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined'
      ? window.innerWidth <= MOBILE_BREAKPOINT
      : false
  );

  // Scroll handler effect
  useEffect(() => {
    const handleScroll = () => {
      const newScrollHeight = getScrollPercentage() / 100; // Convert to 0-1 range
      setScrollHeight(newScrollHeight);

      // Update the uniform if material exists
      if (materialRef.current) {
        materialRef.current.uniforms.u_scrollHeight.value = newScrollHeight;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update background based on screen size
    const updateBackground = () => {
      if (window.innerWidth < 1020) {
        setBackground(mobileBackground.src);
      } else {
        setBackground(desktopBackground.src);
      }
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  useEffect(() => {
    isMobile ? setDirectionsMultiplier(2) : setDirectionsMultiplier(42);
  }, [isMobile]);

  // Scene setup effect
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new OrthographicCamera(
      -aspectRatio,
      aspectRatio,
      1,
      -1,
      1,
      1000
    );
    camera.position.z = 1;

    const loader = new TextureLoader();
    const texture = loader.load(background);
    const planeGeometry = new PlaneGeometry(2 * aspectRatio, 2, 50, 50);
    const randomDirections = new Float32Array(
      planeGeometry.attributes.position.count * 3
    );

    for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
      randomDirections[i * (directionsMultiplier ?? 1)] =
        (Math.random() - 0.9) * 5; // x
      randomDirections[i * (directionsMultiplier ?? 1)] =
        (Math.random() - 0.1) * 1.5; // y
      randomDirections[i * (directionsMultiplier ?? 1)] = Math.random() * 1.5; // z
    }

    planeGeometry.setAttribute(
      'randomDirection',
      new BufferAttribute(randomDirections, 3)
    );

    const shaderUniforms = {
      u_texture: { value: texture },
      u_scrollHeight: { value: scrollHeight },
    };

    const planeMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: shaderUniforms,
    });

    // Store reference to material
    materialRef.current = planeMaterial;

    const planeMesh = new Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    const render = () => {
      renderer.render(scene, camera);
    };

    const animateScene = () => {
      requestAnimationFrame(animateScene);
      render();
    };

    const onWindowResize = () => {
      const newAspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -newAspectRatio;
      camera.right = newAspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };

    window.addEventListener('resize', onWindowResize);
    animateScene();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      materialRef.current = null;
    };
  }, [background]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
