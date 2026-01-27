// fragment shader - chromatic aberration on scroll
varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_scrollHeight;
uniform float u_scrollVelocity;

void main() {
  vec2 uv = vUv;

  // Center point for radial chromatic aberration
  vec2 center = vec2(0.5, 0.5);
  vec2 dir = uv - center;

  // Chromatic aberration strength based on scroll velocity
  // Only active while scrolling, fades when stopped
  float strength = u_scrollVelocity * 0.02;

  // Sample each color channel at slightly different offsets
  float r = texture2D(u_texture, uv + dir * strength).r;
  float g = texture2D(u_texture, uv).g;
  float b = texture2D(u_texture, uv - dir * strength).b;
  float a = texture2D(u_texture, uv).a;

  vec4 color = vec4(r, g, b, a);

  // Check if it's our beige background color (check center sample)
  vec4 centerColor = texture2D(u_texture, uv);
  bool isBeige = centerColor.r > 0.928 && centerColor.g > 0.909 && centerColor.b > 0.815 &&
                 centerColor.r < 0.930 && centerColor.g < 0.911 && centerColor.b < 0.817;

  if (isBeige) {
      discard;
  } else {
      gl_FragColor = color;
  }
}
