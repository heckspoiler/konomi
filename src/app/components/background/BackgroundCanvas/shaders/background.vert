      varying vec2 vUv;
        uniform float u_scrollHeight;
        attribute vec3 randomDirection;


        void main() {
          vUv = uv;
          
          // Use the pre-calculated random direction for this vertex
          vec3 pos = position + (randomDirection * u_scrollHeight / 0.5);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      