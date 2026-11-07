'use client';

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import mobileBackground from '@public/images/background-mobile_bgwred.png';
import desktopBackground from '@public/images/background-desktop_bgw_test.png';
import tabletBackground from '@public/images/background-tablet-new.png';
import tabletPortraitBackground from '@public/images/background-tablet-new-portrait.png';

import { getBreakpoint } from '@helpers/breakpoints';

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

/** Velocity multiplier applied every frame; below the threshold we stop. */
const VELOCITY_DECAY = 0.95;
const VELOCITY_THRESHOLD = 0.001;

function getBackgroundForSize(width: number, height: number): string {
  switch (getBreakpoint(width)) {
    case 'mobile':
      return mobileBackground.src;
    case 'tablet':
      return height > width
        ? tabletPortraitBackground.src
        : tabletBackground.src;
    default:
      return desktopBackground.src;
  }
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
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

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | null {
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
  const scrollVelocityRef = useRef(0);
  /** Schedules a frame; set by the WebGL effect, called by scroll/resize. */
  const requestRenderRef = useRef<() => void>(() => {});

  const [background, setBackground] = useState('');

  const pathname = usePathname();

  // Reset the effect on route change.
  useEffect(() => {
    scrollVelocityRef.current = 0;
    requestRenderRef.current();
  }, [pathname]);

  // Pick the background for the viewport; setState bails out if unchanged.
  useEffect(() => {
    const update = () =>
      setBackground(
        getBackgroundForSize(window.innerWidth, window.innerHeight),
      );

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Scroll drives the chromatic-aberration effect.
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollVelocityRef.current = Math.min(
        scrollVelocityRef.current + scrollDelta * 0.01,
        1,
      );
      requestRenderRef.current();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WebGL setup – rebuilt when the background image changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !background) return;

    let isMounted = true;
    let frameId = 0;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    gl.useProgram(program);

    // Fullscreen quad (position + texCoord). Y texCoords are flipped because
    // WebGL's origin is bottom-left.
    const vertices = new Float32Array([
      -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0,
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

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Transparent placeholder pixel while the image loads.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );

    const scrollVelocityLoc = gl.getUniformLocation(
      program,
      'u_scrollVelocity',
    );

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const draw = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(scrollVelocityLoc, scrollVelocityRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Only animate while the scroll effect is decaying; otherwise stay idle.
    const tick = () => {
      frameId = 0;
      scrollVelocityRef.current *= VELOCITY_DECAY;
      if (scrollVelocityRef.current < VELOCITY_THRESHOLD) {
        scrollVelocityRef.current = 0;
      }
      draw();
      if (scrollVelocityRef.current > 0) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const requestRender = () => {
      if (!frameId && isMounted) frameId = requestAnimationFrame(tick);
    };
    requestRenderRef.current = requestRender;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      if (!isMounted) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      requestRender();
    };
    image.src = background;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      requestRender();
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      isMounted = false;
      requestRenderRef.current = () => {};
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
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
