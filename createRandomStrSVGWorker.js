
importScripts("rgb2hsl.js");

onmessage = function(e) {
    const [strOriSvg, palette] = e.data;
    let strSvg = "";
    for (let i = 0; i < 100; i++) {
        strSvg += createRandomStrSVG(strOriSvg, palette);
    }
    postMessage(strSvg);
};

// min以上max以下の整数を返す
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomStrSVG(strOriSvg, palette) {
    let strSvg = strOriSvg;
    for (const color of palette) {
        const src = `rgb(${color.r},${color.g},${color.b})`;
        const hslObj = rgb2hsl(color.r, color.g, color.b);

        hslObj.h = randomInt(1, 360);
        hslObj.s = 100;

        if (hslObj.l > 70) {
            hslObj.l = randomInt(50, 70);
        }
        else if (hslObj.l < 30) {
            hslObj.l = randomInt(30, 50);
        }

        const dst = `hsl(${hslObj.h} ${hslObj.s}% ${hslObj.l}%)`;
        strSvg = strSvg.replaceAll(src, dst);
    }
    return strSvg;
}
