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
in vec2 vTextureCoord;uniform sampler2D uTexture;uniform vec2 uResolution;
out vec4 fragColor;const float PI = 3.14159265359;
const float TAU = 6.28318530718;float luma(vec4 color) {
return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}float getGaussianWeight(int index) {
switch(index) {
case 0: return 1.000000;
case 1: return 0.687719;
case 2: return 0.497017;
case 3: return 0.369784;
case 4: return 0.279890;
case 5: return 0.213571;
case 6: return 0.163045;
case 7: return 0.123612;
case 8: return 0.092212;
case 9: return 0.066840;
case 10: return 0.046045;
case 11: return 0.000000;
default: return 0.0;
}
}vec4 thresholdPass(vec4 color) {
color.rgb = pow(color.rgb, vec3(1.0/2.2));
color.rgb = 1.2 * (color.rgb - 0.5) + 0.5;
vec4 bloom = color * smoothstep(0.9700 - 0.1, 0.9700, luma(color));
return vec4(bloom.rgb, color.a);
}vec4 blur(vec2 uv, bool vertical, float radius, bool diamond, bool threshold) {
vec4 color = vec4(0.0);
float total_weight = 0.0;
float aspectRatio = uResolution.x/uResolution.y;vec2 dir;
if (diamond) {
dir = vertical ? vec2(1, 1) : vec2(1, -1);
} else {
dir = vertical ? vec2(0, 1) : vec2(1, 0);
}
dir.x /= aspectRatio;
vec4 center = texture(uTexture, uv);
if (threshold) center = thresholdPass(center);
float center_weight = getGaussianWeight(0);
color += center * center_weight;
total_weight += center_weight;radius *= (0.2 + 0.2620) * 1.8;
for (int i = 1; i <= 12; i++) {
float weight = getGaussianWeight(i);
float step = float(i)/12.;
float offset = mix(0.015, 0.025, radius) * step;
vec4 sample1 = texture(uTexture, uv + offset * dir);
vec4 sample2 = texture(uTexture, uv - offset * dir);
if (threshold) {
sample1 = thresholdPass(sample1);
sample2 = thresholdPass(sample2);
}
color += (sample1 + sample2) * weight;
total_weight += 2.0 * weight;
}return color / total_weight;
}vec4 blurPass(vec2 uv, bool vertical, float radius, bool diamond, bool threshold) {
return blur(uv, vertical, radius, diamond, threshold);
}vec4 getColor(vec4 color) {
return blurPass(vTextureCoord, false, 7.5, false, true);
}void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, uv);color = getColor(color);
fragColor = color;}`;

export const fragmentShaderPass1 = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;
precision highp int;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;uniform vec2 uResolution;
out vec4 fragColor;const float PI = 3.14159265359;
const float TAU = 6.28318530718;float luma(vec4 color) {
return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}float getGaussianWeight(int index) {
switch(index) {
case 0: return 1.000000;
case 1: return 0.687719;
case 2: return 0.497017;
case 3: return 0.369784;
case 4: return 0.279890;
case 5: return 0.213571;
case 6: return 0.163045;
case 7: return 0.123612;
case 8: return 0.092212;
case 9: return 0.066840;
case 10: return 0.046045;
case 11: return 0.000000;
default: return 0.0;
}
}vec4 thresholdPass(vec4 color) {
color.rgb = pow(color.rgb, vec3(1.0/2.2));
color.rgb = 1.2 * (color.rgb - 0.5) + 0.5;
vec4 bloom = color * smoothstep(0.9700 - 0.1, 0.9700, luma(color));
return vec4(bloom.rgb, color.a);
}vec4 blur(vec2 uv, bool vertical, float radius, bool diamond, bool threshold) {
vec4 color = vec4(0.0);
float total_weight = 0.0;
float aspectRatio = uResolution.x/uResolution.y;vec2 dir;
if (diamond) {
dir = vertical ? vec2(1, 1) : vec2(1, -1);
} else {
dir = vertical ? vec2(0, 1) : vec2(1, 0);
}
dir.x /= aspectRatio;
vec4 center = texture(uTexture, uv);
if (threshold) center = thresholdPass(center);
float center_weight = getGaussianWeight(0);
color += center * center_weight;
total_weight += center_weight;radius *= (0.2 + 0.2620) * 1.8;
for (int i = 1; i <= 12; i++) {
float weight = getGaussianWeight(i);
float step = float(i)/12.;
float offset = mix(0.015, 0.025, radius) * step;
vec4 sample1 = texture(uTexture, uv + offset * dir);
vec4 sample2 = texture(uTexture, uv - offset * dir);
if (threshold) {
sample1 = thresholdPass(sample1);
sample2 = thresholdPass(sample2);
}
color += (sample1 + sample2) * weight;
total_weight += 2.0 * weight;
}return color / total_weight;
}vec4 blurPass(vec2 uv, bool vertical, float radius, bool diamond, bool threshold) {
return blur(uv, vertical, radius, diamond, threshold);
}vec4 getColor(vec4 color) {
return blurPass(vTextureCoord, true, 7.5, false, false);
}void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, uv);color = getColor(color);
fragColor = color;}`;

export const fragmentShaderPass2 = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;
precision highp int;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform sampler2D uBgTexture;
out vec4 fragColor;const float PI = 3.14159265359;
const float TAU = 6.28318530718;float interleavedGradientNoise(vec2 st) {
return fract(52.9829189 * fract(dot(st, vec2(0.06711056, 0.00583715))));
}vec4 finalPass(vec4 bloomColor) {
float nx = interleavedGradientNoise(gl_FragCoord.xy) - 0.5;
vec2 jitter = vec2(nx) * 0.02 * (0.2620 + 0.1);
bloomColor = texture(uTexture, vTextureCoord + jitter);
bloomColor.rgb *= vec3(0.7019607843137254, 0.7529411764705882, 0.996078431372549);
vec4 sceneColor = texture(uBgTexture, vTextureCoord);
vec4 finalColor = mix(sceneColor, sceneColor + bloomColor, 0.5000 * 3.5);
return finalColor;
}vec4 getColor(vec4 color) {
return finalPass(color);
}void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, uv);color = getColor(color);
fragColor = color;}`;
