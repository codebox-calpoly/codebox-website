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
in vec2 vTextureCoord;uniform sampler2D uTexture;vec3 getFilteredColor(vec3 color) {
return color;
}float hueToRgb(float p, float q, float t) {
if (t < 0.0) t += 1.0;
if (t > 1.0) t -= 1.0;
if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
if (t < 1.0 / 2.0) return q;
if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
return p;
}vec3 hslToRgb(vec3 hsl) {
float h = hsl.x;
float s = hsl.y;
float l = hsl.z;
vec3 rgb = vec3(l);
if (s != 0.0) {
float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
float p = 2.0 * l - q;
rgb.r = hueToRgb(p, q, h + 1.0 / 3.0);
rgb.g = hueToRgb(p, q, h);
rgb.b = hueToRgb(p, q, h - 1.0 / 3.0);
}
return rgb;
}vec3 rgbToHsl(vec3 rgb) {
float max = max(max(rgb.r, rgb.g), rgb.b);
float min = min(min(rgb.r, rgb.g), rgb.b);
float h, s, l = (max + min) / 2.0;if (max == min) {
h = s = 0.0;
} else {
float d = max - min;
s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min);
if (max == rgb.r) {
h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6.0 : 0.0);
} else if (max == rgb.g) {
h = (rgb.b - rgb.r) / d + 2.0;
} else if (max == rgb.b) {
h = (rgb.r - rgb.g) / d + 4.0;
}
h /= 6.0;
}return vec3(h, s, l);
}out vec4 fragColor;void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, uv);if(color.a <= 0.001) {
fragColor = vec4(0);
return;
}color.rgb = rgbToHsl(color.rgb);
color.x = fract(color.x + 1.0000);
color.y = clamp(color.y * 1.0000, 0.0, 1.0);
color.z = clamp(color.z + 0.0000, 0.0, 1.0);
color.rgb = hslToRgb(color.rgb);
color.rgb = getFilteredColor(color.rgb);color.rgb = 1.2500 * (color.rgb - 0.5) + 0.5;color.r = clamp(color.r + 0.0000, 0.0, 1.0);
color.b = clamp(color.b - 0.0000, 0.0, 1.0);color.g = clamp(color.g - 0.0000, 0.0, 1.0);
color.r = clamp(color.r + 0.0000 * 0.5, 0.0, 1.0);
color.b = clamp(color.b + 0.0000 * 0.5, 0.0, 1.0);color = vec4(clamp(color.rgb, 0.0, 1.0), color.a);
fragColor = color;}`;
