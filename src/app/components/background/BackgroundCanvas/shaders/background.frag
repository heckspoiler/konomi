varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_scrollHeight;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 458.5453123);
}

void main() {
    vec2 uv = vUv;
    float noise1 = random(uv * 10.0 + u_scrollHeight);
    
    vec2 distortedUV = uv + vec2(
        noise1 * u_scrollHeight * 0.05,
        noise1 * u_scrollHeight * 0.05
    );
    
    vec4 baseColor = texture2D(u_texture, distortedUV);
    float grain = (random(uv * 1.0 + u_scrollHeight) * 18.0 - 1.0) * u_scrollHeight * 0.2;
    
    vec4 finalColor = baseColor + vec4(grain);
    
    // Discard white pixels
    if (finalColor.r > 0.9 && finalColor.g > 0.9 && finalColor.b > 0.9) {
        discard;
    }
    
    gl_FragColor = finalColor;
}