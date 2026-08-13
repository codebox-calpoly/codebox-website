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
in vec2 vTextureCoord;
in vec3 vVertexPosition;uniform sampler2D uTexture;
uniform float uTime;
uniform float uOpacity;
uniform vec2 uMousePos;
uniform vec2 uResolution;vec3 hash33(vec3 p3) {
p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
p3 += dot(p3, p3.yxz + 19.19);
return -1.0 + 2.0 * fract(vec3(
(p3.x + p3.y) * p3.z,
(p3.x + p3.z) * p3.y,
(p3.y + p3.z) * p3.x
));
}float perlin_noise(vec3 p) {
vec3 pi = floor(p);
vec3 pf = p - pi;vec3 w = pf * pf * (3.0 - 2.0 * pf);float n000 = dot(pf - vec3(0.0, 0.0, 0.0), hash33(pi + vec3(0.0, 0.0, 0.0)));
float n100 = dot(pf - vec3(1.0, 0.0, 0.0), hash33(pi + vec3(1.0, 0.0, 0.0)));
float n010 = dot(pf - vec3(0.0, 1.0, 0.0), hash33(pi + vec3(0.0, 1.0, 0.0)));
float n110 = dot(pf - vec3(1.0, 1.0, 0.0), hash33(pi + vec3(1.0, 1.0, 0.0)));
float n001 = dot(pf - vec3(0.0, 0.0, 1.0), hash33(pi + vec3(0.0, 0.0, 1.0)));
float n101 = dot(pf - vec3(1.0, 0.0, 1.0), hash33(pi + vec3(1.0, 0.0, 1.0)));
float n011 = dot(pf - vec3(0.0, 1.0, 1.0), hash33(pi + vec3(0.0, 1.0, 1.0)));
float n111 = dot(pf - vec3(1.0, 1.0, 1.0), hash33(pi + vec3(1.0, 1.0, 1.0)));float nx00 = mix(n000, n100, w.x);
float nx01 = mix(n001, n101, w.x);
float nx10 = mix(n010, n110, w.x);
float nx11 = mix(n011, n111, w.x);float nxy0 = mix(nx00, nx10, w.y);
float nxy1 = mix(nx01, nx11, w.y);float nxyz = mix(nxy0, nxy1, w.z);return nxyz;
}vec3 blend (int blendMode, vec3 src, vec3 dst) {
return src * dst;
}
vec4 applyLayerMix(vec4 color, vec4 bg, float amount) {
color.rgb = mix(bg.rgb, color.rgb, amount);
color.a = max(bg.a, amount);
return color;
}
uvec2 pcg2d(uvec2 v) {
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
}
float deband() {
return (randFibo(gl_FragCoord.xy) - 0.5) / 255.0;
}out vec4 fragColor;const float PI = 3.14159265359;
const float TAU = 6.28318530718;vec3 getNoiseColor(float t, vec3 col1, vec3 col2, float chroma) {
vec3 mid = 0.5 * (col1 + col2);
vec3 axisAmp = 0.5 * (col2 - col1);vec3 base = mid + axisAmp * cos(TAU * t);vec3 axis = length(axisAmp) > 0.0001 ? normalize(axisAmp) : vec3(1.0, 0.0, 0.0);
vec3 ref = abs(axis.x) > 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
vec3 tangent1 = normalize(cross(axis, ref));
vec3 tangent2 = normalize(cross(axis, tangent1));float richness = 0.24 * length(axisAmp) + 0.02;
vec3 ripple =
tangent1 * sin(TAU * (t * 2.0 + 0.123)) +
tangent2 * sin(TAU * (t * 2.0 + 0.437));vec3 col = base + (richness * chroma) * ripple;
col = clamp(col, -10.0, 10.0);
col = 1./(1. + exp(-col * 4. + 0.25) * 7.5);
return clamp(col, 0.0, 1.0);
}mat2 rot(float a) {
return mat2(cos(a),-sin(a),sin(a),cos(a));
}float getPerlinNoise(vec2 uv, float turbulence, float direction, float driftVal, float time, float scale, float phase) {
float turb = turbulence * 3.2;
vec2 skew = vec2(direction, 1. - direction);
vec2 d = vec2(0, driftVal * time * 0.0125) * mix(1., 14., scale);
float noise = perlin_noise(vec3(
uv * skew - d,
phase + time * 0.03
));return mix(0.5, noise * 0.5 + 0.5, turb);
}float getNoise(vec2 uv, float turbulence, float driftVal, float time, float scale, float direction, float phase) {
return getPerlinNoise(uv, turbulence, direction, driftVal, time, scale, phase);
}void main() {
vec2 uv = vTextureCoord;
float aspectRatio = uResolution.x/uResolution.y;
vec2 aspect = vec2(aspectRatio, 1.0);vec2 mPos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos-0.5), 0.0000);vec2 pos = mix(vec2(0.5, 0.5), mPos, 0.0000);
float scale = mix(1., 14., 0.3200);
vec2 drift = vec2(0, 1.0000 * uTime * 0.0125);
mat2 rotation = rot(0.0000 * 2. * PI);vec2 st = (uv - pos) * aspect * scale * rotation;
float noise = getNoise(st, 0.8500, 1.0000, uTime, 0.3200, 0.5000, 0.0000);
vec4 color = texture(uTexture, uv);
vec4 bg = color;
float shift = 0.0000 + (0.0000 * uTime * 0.01);
vec3 noiseColor = getNoiseColor(noise + shift, vec3(0.7215686274509804, 0.611764705882353, 1), vec3(0.1607843137254902, 0.1607843137254902, 0.1607843137254902), 0.6800);
color.rgb = noiseColor.rgb;float dither = deband();
color.rgb += dither * 0.5;color.rgb = blend(3, bg.rgb, color.rgb);color = applyLayerMix(clamp(color, 0.0, 1.0), bg, uOpacity);
fragColor = color;}`;
