const fs = require('fs');
const svgToImg = require('svg-to-img');

(async () => {
  createPng('#ff0012', '#fc0032', 'tmb_L1.png');
  createPng('#ff0012', '#ae1999', 'tmb_L2.png');
  createPng('#ff0012', '#00c555', 'tmb_L3.png');
  createPng('#ff0012', '#ffc100', 'tmb_L4.png');
  createPng('#ff0012', '#006fc9', 'tmb_L5.png');
  createPng('#ff0012', '#ff7d0a', 'tmb_L9N.png');
  createPng('#ff0012', '#ff7d0a', 'tmb_L9S.png');
  createPng('#ff0012', '#00a6f2', 'tmb_L10N.png');
  createPng('#ff0012', '#00a6f2', 'tmb_L10S.png');
  createPng('#ff0012', '#fc0032', 'tmb_L11.png');
  createPng('#ff0012', '#91dc60', 'tmb_FM.png');
})();

function createPng(outter_color, id_color, filename) {
  svgToImg.from(drawWagon(outter_color, id_color)).toPng({
    path: filename,
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
