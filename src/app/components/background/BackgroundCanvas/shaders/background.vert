varying vec2 vUv;
uniform float u_scrollHeight;
attribute vec3 randomDirection;

// Add noise function for smoother transitions
float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vUv = uv;
    
    // Calculate distance from center
    vec2 center = vec2(0.5, 0.5);
    float dist = length(uv - center);
    
    // Create circular clusters
    float angle = atan(uv.y - center.y, uv.x - center.x);
    float cluster = sin(angle * 8.0) * 0.5 + 0.5; // Adjust the multiplier (8.0) to change number of clusters
    
    // Combine distance and cluster effect
    float distortionFactor = (1.0 - dist) * cluster;
    
    // Add some variation based on UV coordinates
    float variation = noise(uv * 5.0);
    
    // Create the displacement
    vec3 displacement = randomDirection * (u_scrollHeight * distortionFactor * (1.0 + variation));
    
    // Apply radial movement
    vec3 radialMove = normalize(position) * u_scrollHeight * distortionFactor;
    
    // Combine both effects
    vec3 finalPos = position + displacement + (radialMove * 0.5);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}