'use client';

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import mobileBackground from '/public/images/background-mobile_bgwred.png';
import desktopBackground from '/public/images/background-desktop_bgw_test.png';
import tabletBackground from '/public/images/background-tablet-new.png';
import tabletPortraitBackground from '/public/images/background-tablet-new-portrait.png';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 vUv;

  void main() {
    vUv = a_texCoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform float u_scrollVelocity;

  void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5);
    vec2 dir = uv - center;

    float strength = u_scrollVelocity * 0.02;

    float r = texture2D(u_texture, uv + dir * strength).r;
    float g = texture2D(u_texture, uv).g;
    float b = texture2D(u_texture, uv - dir * strength).b;
    float a = texture2D(u_texture, uv).a;

    vec4 color = vec4(r, g, b, a);

    vec4 centerColor = texture2D(u_texture, uv);
    bool isBeige = centerColor.r > 0.928 && centerColor.g > 0.909 && centerColor.b > 0.815 &&
                   centerColor.r < 0.930 && centerColor.g < 0.911 && centerColor.b < 0.817;

    if (isBeige) {
      discard;
    } else {
      gl_FragColor = color;
    }
  }
`;

function getBackgroundForSize(width: number, height: number): string {
  const isPortrait = height > width;

  if (width < MOBILE_BREAKPOINT) {
    return mobileBackground.src;
  } else if (width < TABLET_BREAKPOINT && width >= MOBILE_BREAKPOINT) {
    return isPortrait ? tabletPortraitBackground.src : tabletBackground.src;
  } else {
    return desktopBackground.src;
  }
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const scrollVelocityRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);

  const [background, setBackground] = useState<string>('');
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const pathname = usePathname();

  // Reset scroll on route change
  useEffect(() => {
    scrollVelocityRef.current = 0;
  }, [pathname]);

  // Handle orientation changes
  useEffect(() => {
    setIsPortrait(window.innerHeight > window.innerWidth);

    const handleOrientationChange = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  // Update background based on screen size
  useEffect(() => {
    const updateBackground = () => {
      setBackground(getBackgroundForSize(window.innerWidth, window.innerHeight));
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, [isPortrait]);

  // Scroll handling
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollVelocityRef.current = Math.min(scrollVelocityRef.current + scrollDelta * 0.01, 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main WebGL setup
  useEffect(() => {
    if (!canvasRef.current || !background) return;

    let isMounted = true;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    programRef.current = program;
    gl.useProgram(program);

    // Fullscreen quad vertices (position + texCoord)
    // Note: Y texCoords flipped (1->0, 0->1) because WebGL has origin at bottom-left
    const vertices = new Float32Array([
      // position    // texCoord
      -1, -1,        0, 1,
       1, -1,        1, 1,
      -1,  1,        0, 0,
       1,  1,        1, 0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord');

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 16, 8);

    // Load texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Placeholder pixel while image loads
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      if (!isMounted) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    image.src = background;

    // Get uniform locations
    const scrollVelocityLoc = gl.getUniformLocation(program, 'u_scrollVelocity');

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const render = () => {
      // Decay velocity
      scrollVelocityRef.current *= 0.95;
      if (scrollVelocityRef.current < 0.001) scrollVelocityRef.current = 0;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(scrollVelocityLoc, scrollVelocityRef.current);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationIdRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
    };
  }, [background]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
      }}
    />
  );
}
