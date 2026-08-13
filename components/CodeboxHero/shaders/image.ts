export const vertexShader = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec2 uMousePos;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
float angleX = uMousePos.y * 0.5 - 0.25;
float angleY = (1.-uMousePos.x) * 0.5 - 0.25;mat4 rotateX = mat4(1.0, 0.0, 0.0, 0.0,
0.0, cos(angleX), -sin(angleX), 0.0,
0.0, sin(angleX), cos(angleX), 0.0,
0.0, 0.0, 0.0, 1.0);
mat4 rotateY = mat4(cos(angleY), 0.0, sin(angleY), 0.0,
0.0, 1.0, 0.0, 0.0,
-sin(angleY), 0.0, cos(angleY), 0.0,
0.0, 0.0, 0.0, 1.0);mat4 rotationMatrix = rotateX * rotateY;
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vVertexPosition = (rotationMatrix * vec4(aVertexPosition, 1.0)).xyz;
vTextureCoord = (vec4(aTextureCoord, 0.0, 1.0)).xy;
}`;

export const fragmentShader = `#version 300 es
// Copyright (c) Unicorn Studio.
// Unauthorized copying, redistribution, or use in competing products is prohibited.
precision highp float;in vec2 vTextureCoord;
in vec3 vVertexPosition;uniform sampler2D uSourceImage;uniform vec2 uArtboardResolution;uniform vec2 uMousePos;
uniform sampler2D uBgTexture;const float TAU = 6.28318530718;
const float PI = 3.14159265359;out vec4 fragColor;vec2 rotate2D(vec2 p, float angle) {
float s = sin(angle);
float c = cos(angle);
return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}vec2 getAnchorOffsets() {
return vec2(0.5, 0.5);
}vec4 sampleImage(vec2 canvasUV, vec2 mouseOffset, vec2 mouseRotOffset) {
vec2 canvasPos = vec2(canvasUV.x * uArtboardResolution.x, (1.0 - canvasUV.y) * uArtboardResolution.y);
vec2 imageUV;float absWidth = 600.0000;
float absHeight = 367.3105 * uArtboardResolution.y;
absWidth = absWidth;
absHeight = (1 != 2 && 2 == 2) ? absWidth / 1.6335 : absHeight;vec2 elementSizePx = vec2(absWidth, absHeight);
vec2 elementPosPx = vec2(0.5000, 0.5000) * uArtboardResolution - getAnchorOffsets() * elementSizePx;vec2 centerPos = elementPosPx + (elementSizePx * 0.5);
vec2 relPos = canvasPos - centerPos + mouseOffset;
vec2 unrotatedRelPos = rotate2D(relPos, 0.0000 * -TAU);
vec2 elementPos = unrotatedRelPos + (elementSizePx * 0.5);
imageUV = elementPos / elementSizePx;
vec2 flippedUV = vec2(imageUV.x, 1.0 - imageUV.y);
vec4 color = textureLod(uSourceImage, flippedUV, 0.0);
if (imageUV.x >= 0.0 && imageUV.x <= 1.0 && imageUV.y >= 0.0 && imageUV.y <= 1.0) {
return color;
} else {
return vec4(0.0);
}
}vec4 getNormalOutput(vec4 color, vec4 background) {
return mix(background, color + background * (1.0 - color.a), 1.0000 * color.a);
}vec4 getOutputByMode(vec4 color, vec4 background) {
return getNormalOutput(color, background);
}vec4 applyImageAdjustments(vec4 color) {
vec3 exposureColor = clamp(color.rgb + -0.1700, 0.0, 1.0);
color.rgb = mix(color.rgb, exposureColor, color.a);vec3 contrasted = 0.9500 * (color.rgb - 0.5) + 0.5;
color.rgb = mix(color.rgb, contrasted, color.a);color.rgb *= color.a;color.rgb = clamp(color.rgb, 0.0, 1.0);
return color;
}vec4 getCompositeOutput(vec2 uv, vec2 mouseOffsetPx, vec2 mouseRotOffset) {
vec4 background = vec4(0);background = texture(uBgTexture, vTextureCoord);
vec4 color = sampleImage(uv, mouseOffsetPx, mouseRotOffset);
color = applyImageAdjustments(color);return getOutputByMode(color, background);
}void main() {
vec2 uv = vTextureCoord;
vec2 mouseOffsetUV = (uMousePos - 0.5) * 0.0000;
vec2 mouseOffsetPx = mouseOffsetUV;
vec2 mouseRotOffset = (uMousePos - 0.5) * 0.0000 * PI * 0.5;
uv -= mouseOffsetUV;
fragColor = getCompositeOutput(uv, mouseOffsetPx, mouseRotOffset);
}`;
