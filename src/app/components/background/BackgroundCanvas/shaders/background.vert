varying vec2 vUv;

uniform float u_scrollHeight;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}