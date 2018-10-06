const fs = require('fs');
const svgToImg = require('svg-to-img');

(async () => {
  createPng('#ff0012', '#fc0032', 'L1.png');
  createPng('#ff0012', '#ae1999', 'L2.png');
  createPng('#ff0012', '#00c555', 'L3.png');
  createPng('#ff0012', '#ffc100', 'L4.png');
  createPng('#ff0012', '#006fc9', 'L5.png');
  createPng('#ff0012', '#ff7d0a', 'L9N.png');
  createPng('#ff0012', '#ff7d0a', 'L9S.png');
  createPng('#ff0012', '#00a6f2', 'L10N.png');
  createPng('#ff0012', '#00a6f2', 'L10S.png');
  createPng('#ff0012', '#fc0032', 'L11.png');
  createPng('#ff0012', '#007551', 'FM.png');
  createPng('#ff6800', '#896dc7', 'L6.png');
  createPng('#ff6800', '#bd5f00', 'L7.png');
  createPng('#ff6800', '#ff19b1', 'L8.png');
  createPng('#ff6800', '#00c9bc', 'R5.png');
  createPng('#ff6800', '#9c9fa5', 'R6.png');
  createPng('#ff6800', '#ff6800', 'S1.png');
  createPng('#ff6800', '#00cf33', 'S2.png');
  createPng('#ff6800', '#ff19b1', 'S3.png');
  createPng('#ff6800', '#8f841a', 'S4.png');
  createPng('#ff6800', '#2a90db', 'S5.png');
  createPng('#ff6800', '#2a90db', 'S6.png');
  createPng('#ff6800', '#00c4dd', 'S8.png');
  createPng('#ff6800', '#585963', 'R60.png');
  createPng('#ff6800', '#007b9c', 'R50.png');
  createPng('#ff6800', '#b8aae1', 'L12.png');
  createPng('#ff6800', '#b4003e', 'S7.png');
  createPng('#ff6800', '#ff0056', 'S9.png');
  createPng('#ff6800', '#003e82', 'FV.png');
  createPng('#ff6800', '#b4003e', 'S7T.png');
  createPng('#ff6800', '#2a90db', 'S5S.png');
  createPng('#009279', '#009279', 'T1.png');
  createPng('#009279', '#009279', 'T2.png');
  createPng('#009279', '#009279', 'T3.png');
  createPng('#ff4f00', '#0090d5', 'R1.png');
  createPng('#ff4f00', '#00a400', 'R2.png');
  createPng('#ff4f00', '#00a400', 'R2N.png');
  createPng('#ff4f00', '#00a400', 'R2S.png');
  createPng('#ff4f00', '#fd0000', 'R3.png');
  createPng('#ff4f00', '#f68900', 'R4.png');
  createPng('#ff4f00', '#cd6cb4', 'R7.png');
  createPng('#ff4f00', '#af0086', 'R8.png');
})();

function createPng(outter_color, id_color, filename) {
  svgToImg.from(drawWagon(outter_color, id_color)).toPng({
    path: 'trains/' + filename,
    background: 'rgba(0,0,0,0)',
    encoding: "base64"
  });
}

function drawWagon(outter_color, id_color) {
  const pixel_per_square = 50;
  const width = pixel_per_square * 8.05;
  const height = pixel_per_square * 4;
  //const outter_color = "#ff0000" // transport type
  const inner_color = '#ffffff';
  //const id_color = "#0000ff" // linia

    var svg = `<svg xmlns='http://www.w3.org/2000/svg' width="${width}" height="${height}">
    <rect x="${parseInt(pixel_per_square * 1)}" y="${parseInt(pixel_per_square * 0.5)}" rx="${parseInt(pixel_per_square * 0.5)}"
    ry="${parseInt(pixel_per_square * 0.5)}" width="${parseInt(pixel_per_square * 7)}" height="${parseInt(pixel_per_square * 3)}" 
    style="fill: ${inner_color}; 
    stroke: ${outter_color}; stroke-width: 25;"></rect>
    <rect x="62" y="${parseInt(pixel_per_square * 1)}" width="325"
    height="${parseInt(pixel_per_square * 2)}" style="fill: ${inner_color}; stroke: ${inner_color}; stroke-width: ${parseInt(pixel_per_square)};"></rect>
    <rect x="${parseInt(pixel_per_square * 2)}" y="${parseInt(pixel_per_square * 1.25)}" 
    width="${parseInt(pixel_per_square * 1.5)}" height="${parseInt(pixel_per_square * 1.5)}"
    style="fill: ${id_color}; stroke: ${id_color}; stroke-width: ${parseInt(pixel_per_square)};"></rect>
    <rect x="${parseInt(pixel_per_square * 5.5)}" y="${parseInt(pixel_per_square * 1.25)}" 
    width="${parseInt(pixel_per_square * 1.5)}" height="${parseInt(pixel_per_square * 1.5)}"
    style="fill: ${id_color}; stroke: ${id_color}; stroke-width: ${parseInt(pixel_per_square)};"></rect>
    <rect x="0" y="${parseInt(pixel_per_square * 1.2)}" width="${parseInt(pixel_per_square * 0.8)}" 
    height="${parseInt(pixel_per_square * 0.2)}" style="fill: rgb(0, 0, 0);"></rect>
    <rect x="0" y="${parseInt(pixel_per_square * 2.5)}" width="${parseInt(pixel_per_square * 0.8)}"
    height="${parseInt(pixel_per_square * 0.2)}" style="fill: rgb(0, 0, 0);"></rect>
    <rect x="0" y="${parseInt(pixel_per_square * 1)}" width="${parseInt(pixel_per_square * 0.2)}" 
    height="${parseInt(pixel_per_square * 0.6)}" style="fill: rgb(0, 0, 0);"></rect>
    <rect x="0" y="${parseInt(pixel_per_square * 2.3)}" width="${parseInt(pixel_per_square * 0.2)}"
    height="${parseInt(pixel_per_square * 0.6)}" style="fill: rgb(0, 0, 0);"></rect></svg>`;

    return svg;
}
