'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Mesh,
} from 'three';

import mobileBackground from '/public/images/background-mobile.png';

import vertexShader from './shaders/background.vert';
import fragmentShader from './shaders/background.frag';

import getScrollPercentage from '../../../../../helpers/getScrollPercentage';

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [background, setBackground] = useState<string>(mobileBackground.src);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(getScrollPercentage());
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

    const shaderUniforms = {
      u_texture: { value: texture },
    };

    const planeGeometry = new PlaneGeometry(2 * aspectRatio, 2);
    const planeMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: shaderUniforms,
    });

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
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  window.addEventListener('scroll', () => {
    console.log(scrollHeight);
  });

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
