// vertex shader
varying vec2 vUv;
uniform float u_scrollHeight;

void main() {
    vUv = uv;
    
    // Match grid size with fragment shader
    vec2 gridSize = vec2(0.0, 0.0);
    vec2 squareID = floor(vUv * gridSize);
    
    // More subtle movement matching fragment shader
    vec2 moveDir = vec2(
        sin(squareID.y * 0.3 + u_scrollHeight) * u_scrollHeight,
        cos(squareID.x * 0.3 + u_scrollHeight) * u_scrollHeight
    );
    
    // Very subtle movement
    float moveAmount = 0.02;
    vec3 movement = vec3(moveDir * moveAmount, 0.0);
    
    vec3 finalPos = position + movement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}