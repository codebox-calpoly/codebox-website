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
precision highp float;
in vec3 vVertexPosition;
in vec2 vTextureCoord;
uniform sampler2D uTexture;
uniform vec2 uResolution;
vec4 applyLayerMix(vec4 color, vec4 bg, float amount) {
color.rgb = mix(bg.rgb, color.rgb, amount);
color.a = max(bg.a, amount);
return color;
}const float TAU = 6.28318530718;out vec4 fragColor;
mat2 rot(float a) {
return mat2(cos(a),-sin(a),sin(a),cos(a));
}
void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, uv);
float displacement = 0.0;vec2 aspectRatio = vec2(uResolution.x/uResolution.y, 1.0);
vec2 skew = vec2(0.0000, 1.0 - 0.0000);
float halfRadius = 1.0000 * 0.5;
float innerEdge = halfRadius - 1.0000 * halfRadius * 0.5;
float outerEdge = halfRadius + 1.0000 * halfRadius * 0.5;
vec2 pos = vec2(0.5, 0.5);
vec2 scaledUV = uv * aspectRatio * rot(0.0000 * TAU) * skew;
vec2 scaledPos = pos * aspectRatio * rot(0.0000 * TAU) * skew;
float radius = distance(scaledUV, scaledPos);
float falloff = smoothstep(innerEdge + displacement, outerEdge + displacement, radius);
vec4 vignetteColor;vignetteColor = applyLayerMix(vec4(vec3(0, 0, 0), 1.0), color, falloff * 1.0000);
vec4 col = mix(color * (1.-falloff), vec4(vignetteColor.rgb, vignetteColor.a), 1.0000);
fragColor = col;}`;
