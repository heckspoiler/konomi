'use client';

import React, { useRef, useEffect, useState } from 'react';

import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Mesh,
  Texture,
  Vector3,
} from 'three';

import mobileBackground from '/public/images/background-mobile.png';

export default function BackgroundCanvas() {
  console.log(mobileBackground);
  return <div>Background Canvas</div>;
}
