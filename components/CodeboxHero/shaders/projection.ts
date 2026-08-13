export const vertexShader = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision mediump float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}`;

export const fragmentShader = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform float uTime;uniform vec2 uMousePos;const float PI = 3.14159265359;vec3 getRayDirection(vec2 uv, vec2 mousePos, float aspect) {
vec2 screenPos = (uv - 0.5) * 2.0;
screenPos.x *= aspect;
screenPos.y *= -1.0;
float minFOV = radians(20.0);
float maxFOV = radians(120.0);
float fov = mix(minFOV, maxFOV, 0.0000);
vec3 rayDir = normalize(vec3(screenPos.x * tan(fov/2.0),
screenPos.y * tan(fov/2.0),
-1.0));
float rotX = (mousePos.y - 0.5) * PI;
float rotY = (mousePos.x - 0.5) * PI * 2.0;
mat3 rotateY = mat3(
cos(rotY), 0.0, -sin(rotY),
0.0, 1.0, 0.0,
sin(rotY), 0.0, cos(rotY)
);
mat3 rotateX = mat3(
1.0, 0.0, 0.0,
0.0, cos(rotX), sin(rotX),
0.0, -sin(rotX), cos(rotX)
);
return normalize(rotateX * rotateY * rayDir);
}vec2 directionToUVHorizontal(vec3 dir) {
float longitude = atan(dir.z, dir.x);
float latitude = acos(dir.y);
vec2 uv;
uv.x = longitude / (2.0 * PI) + 0.5;
uv.y = latitude / PI;
uv.x += 0.25;
return uv;
}vec2 directionToUVVertical(vec3 dir) {
float longitude = atan(dir.z, dir.y);
float latitude = acos(dir.x);
vec2 uv;
uv.y = longitude / PI * -1.;
uv.x = (latitude / (2.0 * PI) + 0.5) * -1.;
uv.x = fract(uv.x + 0.25);
return uv;
}out vec4 fragColor;vec2 applyRepeat(vec2 uv) {
return uv;
}vec2 distortUV(vec2 uv) {
float aspect = 2.;
vec2 mPos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos-0.5), -0.0100 * 0.5);
vec3 rayDir = getRayDirection(uv, mPos, aspect);
vec2 uvHorizontal = directionToUVHorizontal(rayDir);
vec2 uvVertical = directionToUVVertical(rayDir);
vec2 sphereUV = mix(uvHorizontal, uvVertical, 0.5000);
float minFOV = radians(20.0);
float maxFOV = radians(120.0);
float currentFOV = mix(minFOV, maxFOV, 0.0000);
float fovCompensation = tan(currentFOV/2.0);
float compensatedScale = (mix(-0.1, 0.4, 0.3000) * 12.0 + 2.0) * (1.0/fovCompensation);
sphereUV = (sphereUV - 0.5) * compensatedScale + 0.5;sphereUV += vec2(0.0, 0) * uTime * 0.005;return applyRepeat(sphereUV);
}void main() {
vec2 uv = vTextureCoord;
uv = distortUV(uv);
vec4 col = texture(uTexture, uv);
fragColor = col;}`;
