// fragment shader
varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_scrollHeight;

void main() {
   vec2 uv = vUv;
   
   // Smaller grid for more subtle effect
   vec2 gridSize = vec2(200.0, 200.0);
   vec2 squareID = floor(uv * gridSize);
   
   // More subtle movement
   vec2 moveDir = vec2(
       sin(squareID.y * 0.8 + u_scrollHeight) * u_scrollHeight,
       cos(squareID.x * 0.8 + u_scrollHeight) * u_scrollHeight
   );
   
   // Reduced movement amount
   float moveAmount = 0.9;
   vec2 distortedUV = uv + (moveDir * moveAmount);
   
   // Strict UV clamping
   distortedUV = clamp(distortedUV, 0.0, 1.0);
   
   vec4 baseColor = texture2D(u_texture, distortedUV);
   
   // More precise background color check to prevent artifacts
   if (baseColor.r > 0.928 && baseColor.g > 0.909 && baseColor.b > 0.815 && 
       baseColor.r < 0.930 && baseColor.g < 0.911 && baseColor.b < 0.817) {
       discard;
   }
   
   gl_FragColor = baseColor;
}