// fragment shader
varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_scrollHeight;

void main() {
  vec2 uv = vUv;
  
  vec2 gridSize = vec2(200.0, 200.0);
  vec2 squareID = floor(uv * gridSize);
  
  vec2 moveDir = vec2(
      sin(squareID.y * 0.8 + u_scrollHeight) * u_scrollHeight,
      cos(squareID.x * 0.8 + u_scrollHeight) * u_scrollHeight
  );
  
  float moveAmount = 0.9;
  vec2 distortedUV = uv + (moveDir * moveAmount);
  
  distortedUV = clamp(distortedUV, 0.0, 1.0);
  
  vec4 baseColor = texture2D(u_texture, distortedUV);
  
  // Check if it's our beige background color
  bool isBeige = baseColor.r > 0.928 && baseColor.g > 0.909 && baseColor.b > 0.815 && 
                 baseColor.r < 0.930 && baseColor.g < 0.911 && baseColor.b < 0.817;
  
  if (isBeige) {
      discard;
  } else {
      // For colors darker than beige, fade them based on scroll
      float fadeAmount = 1.0 - (u_scrollHeight * 0.5); // Adjust the 0.5 to control fade speed
      fadeAmount = clamp(fadeAmount, 0.2, 1.0); // Don't let it fade completely
      
      // Only fade colors that are darker than the beige
      if (baseColor.r < 0.928 || baseColor.g < 0.909 || baseColor.b < 0.815) {
          baseColor.rgba *= fadeAmount;
      }
      
      gl_FragColor = baseColor;
  }
}