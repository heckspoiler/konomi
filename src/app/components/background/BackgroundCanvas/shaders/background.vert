      varying vec2 vUv;
        uniform float u_scrollHeight;
        attribute vec3 randomDirection;


        void main() {
          vUv = uv;
          
 
          vec3 pos = position + (randomDirection * u_scrollHeight / 4.0);
          
          gl_Position = projectionMatrix * 5.0 * modelViewMatrix * vec4(pos, 1.0);
        }
      