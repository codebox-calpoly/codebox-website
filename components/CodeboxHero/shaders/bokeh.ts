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
in vec3 vVertexPosition;
in vec2 vTextureCoord;
uniform sampler2D uTexture;
uniform vec2 uPos;uniform vec2 uMousePos;
uniform vec2 uResolution;float ease (int easingFunc, float t) {
return t;
}const float TAU = 6.28318530718;
const int SAMPLES = 40;
const float GOLDEN_ANGLE = 2.39996322972865332;
const vec2 GOLDEN_ROTATION = vec2(-0.73736887808, 0.67549029426);vec2 rotateVec2(vec2 value, vec2 rotation) {
return vec2(
value.x * rotation.x - value.y * rotation.y,
value.x * rotation.y + value.y * rotation.x
);
}float interleavedGradientNoise(vec2 st) {
return fract(52.9829189 * fract(dot(st, vec2(0.06711056, 0.00583715))));
}vec4 bokehBlur(vec2 uv, float blurRadius, float intensity) {
float aspectRatio = uResolution.x / uResolution.y;
vec3 accumulatedColor = vec3(0.0);
vec3 accumulatedWeights = vec3(0.0);
vec2 pixelSize = vec2(1.0 / aspectRatio, 1.0) * blurRadius * 0.075;
float accumulatedAlpha = 0.;
float noiseAngle = interleavedGradientNoise(gl_FragCoord.xy);
float jitter = fract(noiseAngle / TAU);
float baseAngle = jitter + (0.5 + noiseAngle) * GOLDEN_ANGLE;
vec2 sampleDirection = vec2(cos(baseAngle), sin(baseAngle));
for (int i = 0; i < SAMPLES; i++) {
float sampleRadius = sqrt((float(i) + 0.5 + jitter) / float(SAMPLES));
vec2 sampleOffset = sampleDirection * sampleRadius * pixelSize;
vec4 colorSample = texture(uTexture, uv + sampleOffset);
vec3 bokehWeight = vec3(5.0) + pow(colorSample.rgb, vec3(9.0)) * intensity;
accumulatedAlpha += colorSample.a;
accumulatedColor += colorSample.rgb * bokehWeight;
accumulatedWeights += bokehWeight;
sampleDirection = rotateVec2(sampleDirection, GOLDEN_ROTATION);
}return vec4(accumulatedColor / accumulatedWeights, accumulatedAlpha / float(SAMPLES));
}out vec4 fragColor;float getStrength(vec2 uv) {
vec2 mPos = uPos + mix(vec2(0), (uMousePos-0.5), 0.0000);
float aspectRatio = uResolution.x/uResolution.y;
float dist = ease(0, max(0.,1.-distance(uv * vec2(aspectRatio, 1), mPos * vec2(aspectRatio, 1)) * 4. * (1. - 0.6500)));return dist;
}vec4 blurPass(vec2 uv) {
if(1.2600 <= 0.0005) {
return texture(uTexture, uv);
}float strength = getStrength(uv);
return bokehBlur(uv, 1.2600 * strength, 150.0);
}vec4 getColor(vec2 uv) {
return blurPass(uv);
}void main() {
vec2 uv = vTextureCoord;
vec4 color = vec4(0);
color = getColor(uv);
fragColor = color;}`;

export const fragmentShaderPass1 = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;
in vec3 vVertexPosition;
in vec2 vTextureCoord;
uniform sampler2D uTexture;
uniform sampler2D uBgTexture;
uniform sampler2D uBlueNoise;
uniform vec2 uPos;uniform vec2 uMousePos;
uniform vec2 uResolution;float ease (int easingFunc, float t) {
return t;
}const float TAU = 6.28318530718;
const int SAMPLES = 40;
const float GOLDEN_ANGLE = 2.39996322972865332;
const vec2 GOLDEN_ROTATION = vec2(-0.73736887808, 0.67549029426);float getBlueNoiseOffset(vec2 st) {
ivec2 texSize = ivec2(512, 512);
vec4 blueNoise = texelFetch(uBlueNoise, ivec2(fract(st * (uResolution)/vec2(texSize) * vec2(texSize.x/texSize.y, 1.0)) * vec2(texSize)) % texSize, 0);
return mod((blueNoise.r - 0.5) * TAU, TAU);
}float interleavedGradientNoise(vec2 st) {
return fract(52.9829189 * fract(dot(st, vec2(0.06711056, 0.00583715))));
}out vec4 fragColor;float getStrength(vec2 uv) {
vec2 mPos = uPos + mix(vec2(0), (uMousePos-0.5), 0.0000);
float aspectRatio = uResolution.x/uResolution.y;
float dist = ease(0, max(0.,1.-distance(uv * vec2(aspectRatio, 1), mPos * vec2(aspectRatio, 1)) * 4. * (1. - 0.6500)));return dist;
}vec4 composite(vec2 uv) {
vec4 color = vec4(0.);
float strength = getStrength(uv);
vec4 bg = texture(uBgTexture, uv);if(1.2600 <= 0.0005) {
return bg;
}if(strength <= 0.0005) {
return bg;
}float ign = interleavedGradientNoise(gl_FragCoord.xy);
float blueNoiseOffset = getBlueNoiseOffset(uv);
float blueNoiseStrength = 0.005 * 1.2600 * strength;
vec2 offset = vec2(cos(blueNoiseOffset), sin(blueNoiseOffset)) * min(blueNoiseStrength, 0.01);vec2 pixelSize = vec2(1.0 + (1.0 + ign)) / uResolution;
vec4 s1 = texture(uTexture, uv + offset);
vec4 s2 = texture(uTexture, uv + offset + pixelSize);
vec4 s3 = texture(uTexture, uv + offset - pixelSize);
vec4 s4 = texture(uTexture, uv + offset + vec2(-pixelSize.x, pixelSize.y));
vec4 s5 = texture(uTexture, uv + offset + vec2(pixelSize.x, -pixelSize.y));return (s1 + s2 + s3 + s4 + s5) * 0.2;
}vec4 getColor(vec2 uv) {
return composite(uv);
}void main() {
vec2 uv = vTextureCoord;
vec4 color = vec4(0);
color = getColor(uv);
fragColor = color;}`;
