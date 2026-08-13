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
precision highp int;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform float uIntensity;uniform vec2 uMousePos;
uniform vec2 uResolution;const float MAX_ITERATIONS = 32.0;float interleavedGradientNoise(vec2 st) {
return fract(52.9829189 * fract(dot(st, vec2(0.06711056, 0.00583715))));
}vec4 godRays(vec2 st) {
vec3 color = vec3(0);
float decay = mix(0.89, 0.965, 0.9500);
vec2 pos = vec2(0.5, 0.5) - mix(vec2(0), (vec2(1. - uMousePos.x, 1. - uMousePos.y) - 0.5), 0.1700);
float weight = 1.0;
vec2 stepDir = (pos - st) / MAX_ITERATIONS * (0.25 + min(1., 0.9500)) * 0.75;
float noise = interleavedGradientNoise(st * uResolution);
vec2 sampleUv = st + stepDir * noise;
vec2 perpDir = vec2(-stepDir.y, stepDir.x);
float intensity = 2.8 * uIntensity;for (float i = 0.0; i < MAX_ITERATIONS; i++) {
float theta = i/MAX_ITERATIONS;
sampleUv += stepDir + (perpDir * theta * sin((noise * 0.25) * (1.0 + theta) * 50.0)) * 0.0000 * 0.25;
vec4 samp = texture(uTexture, sampleUv);
float lum = dot(samp.rgb, vec3(0.299, 0.587, 0.114));
float thresh = smoothstep(0.0000 - 0.1, 0.0000, lum);
color += samp.rgb * thresh * weight * intensity;
weight *= decay;
if(weight < 0.05) break;
}
return vec4(color / MAX_ITERATIONS, 1.0);
}out vec4 fragColor;void main() {
vec2 uv = vTextureCoord;
vec4 bg = texture(uTexture, uv);if(uIntensity <= 0.01) {
vec4 color = bg;
fragColor = color;return;
}vec4 rays = godRays(uv);
rays.rgb *= vec3(0.0784313725490196, 0.9098039215686274, 0.5215686274509804);
vec4 color = vec4(bg.rgb + rays.rgb, bg.a + rays.r);
fragColor = color;}`;
