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

export const fragmentShaderPass0 = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;
precision highp int;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform float uTime;
uniform float uMix;uniform vec2 uResolution;uvec2 pcg2d(uvec2 v) {
v = v * 1664525u + 1013904223u;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
v ^= v >> 16;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
return v;
}float randFibo(vec2 p) {
uvec2 v = floatBitsToUint(p);
v = pcg2d(v);
uint r = v.x ^ v.y;
return float(r) / float(0xffffffffu);
}vec4 applyLayerMix(vec4 color, vec4 bg, float amount) {
color.rgb = mix(bg.rgb, color.rgb, amount);
color.a = max(bg.a, amount);
return color;
}out vec4 fragColor;
const float PI = 3.14159265359;vec3 getAbberatedColor(vec3 color, vec3 left, vec3 center, vec3 right) {
return vec3(left.r, mix(color.g, center.g, 1.0), right.b);
}vec3 getBlurredChroma(vec3 color, vec2 uv) {
vec4 left = vec4(0);
vec4 right = vec4(0);
vec4 center = vec4(0);float totalWeight = 0.0;
vec2 aberrated = vec2(1.0, 0.0) * 0.3000 * 0.006;
for (float i = 0.0; i <= 6.0; i += 1.0) {
float weight = mix(exp(-0.5 * (i * i) / 9.0), i / 9.0, 0.5);
totalWeight += weight;
vec2 offset = aberrated * i;
left += texture(uTexture, uv - offset) * weight;
right += texture(uTexture, uv + offset) * weight;
}
left /= totalWeight;
right /= totalWeight;
center = texture(uTexture, uv);
color.rgb = getAbberatedColor(color.rgb, left.rgb, center.rgb, right.rgb);return color;
}void main() {
vec2 uv = vTextureCoord;
float aspectRatio = uResolution.x/uResolution.y;
float delta = fract((floor(uTime)/20.));
float noise = randFibo(uv + vec2(1, 2) + delta);
vec4 color = texture(uTexture, uv);
vec4 bg = color;float jitter = 0.0;
if(int(gl_FragCoord.y) % 2 == 0) {
jitter = (randFibo(gl_FragCoord.xy + uTime * 0.01) - 0.5) * 0.005;
}uv.x += jitter * 0.5000 * 2.0;
color.rgb = getBlurredChroma(color.rgb, uv);
color.rgb = pow(color.rgb, vec3(1.2));
color.rgb = mix(color.rgb, smoothstep(0.05, 0.95, color.rgb), 0.0000);float scan = mod(gl_FragCoord.y, 2.0);
color.rgb *= (1.0 - 0.5000 * scan * 0.5 + 0.5000 * 0.5);
color = applyLayerMix(color, bg, uMix);
vec3 grain = vec3(
noise,
randFibo(uv + vec2(2, 3) + delta),
randFibo(uv + vec2(3, 4) + delta)
);
color.rgb += (grain - 0.5) * mix(0.1, 0.5, 0.2000);color = applyLayerMix(color, bg, uMix);
fragColor = color;}`;

export const fragmentShaderPass1 = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;
precision highp int;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform sampler2D uBgTexture;
uniform float uTime;
uniform float uMix;uniform vec2 uResolution;uvec2 pcg2d(uvec2 v) {
v = v * 1664525u + 1013904223u;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
v ^= v >> 16;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
return v;
}float randFibo(vec2 p) {
uvec2 v = floatBitsToUint(p);
v = pcg2d(v);
uint r = v.x ^ v.y;
return float(r) / float(0xffffffffu);
}vec4 applyLayerMix(vec4 color, vec4 bg, float amount) {
color.rgb = mix(bg.rgb, color.rgb, amount);
color.a = max(bg.a, amount);
return color;
}out vec4 fragColor;
const float PI = 3.14159265359;void main() {
vec2 uv = vTextureCoord;
float aspectRatio = uResolution.x/uResolution.y;
float delta = fract((floor(uTime)/20.));
float noise = randFibo(uv + vec2(1, 2) + delta);
vec4 color = texture(uTexture, uv);
vec4 bg = color;float jitter = 0.0;
if(int(gl_FragCoord.y) % 2 == 0) {
jitter = (randFibo(gl_FragCoord.xy + uTime * 0.01) - 0.5) * 0.005;
}bg = texture(uBgTexture, uv);
vec3 grain = vec3(
noise,
randFibo(uv + vec2(2, 3) + delta),
randFibo(uv + vec2(3, 4) + delta)
);
color.rgb += (grain - 0.5) * mix(0.1, 0.5, 0.2000);color = applyLayerMix(color, bg, uMix);
fragColor = color;}`;
