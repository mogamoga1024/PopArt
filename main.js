
// min以上max以下の整数を返す
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomColorStrSVG(strOriSvg, palette) {
    let strSvg = strOriSvg;
    let firstHue = 0;
    let secondHue = 0;
    for (let i = 0; i < palette.length; i++) {
        const color = palette[i];
        const src = `rgb(${color.r},${color.g},${color.b})`;
        let hue = randomInt(0, 360 - 1);
        // const saturation = 100 + randomInt(-10, 10) + randomInt(-10, 10) + randomInt(-10, 10);
        const saturation = 100;
        // let lightness = 50 + randomInt(-25, 25) + randomInt(-25, 25);
        let lightness = 50;
        for (let i = 0; i < 25; i++) {
            lightness += randomInt(-1, 1);
        }

        if (i === 0) {
            firstHue = hue;
        }
        else if (i === 1) {
            hue = firstHue + randomInt(-135, 135);
            lightness = 40;
            secondHue = hue;
        }
        else if (i === 2) {
            hue = secondHue + 30;
            lightness = 60;
        }
        else if (i === palette.length - 1) {
            hue = firstHue + 180 + randomInt(-20, 20);
        }

        const dst = `hsl(${hue} ${saturation}% ${lightness}%)`;
        strSvg = strSvg.replaceAll(src, dst);
    }
    return strSvg;
}

const options = {
    // ltres: 1,
    // qtres: 1,
    pathomit: 17,
    colorsampling: 0,
    numberofcolors: 4,
    blurradius: 5,
    // blurdelta: 20,
    colorquantcycles: 5,
    // linefilter: true,
    // strokewidth: 1,
    // layering: 0,
    // pal: [{r:0,g:0,b:0,a:255}, {r:0,g:0,b:255,a:255}, {r:255,g:255,b:0,a:255}]
};

ImageTracer.imageToTracedata(
    "野獣先輩.png",
    function (tracedata) {
        console.log(tracedata);
        ImageTracer.imageToSVG(
            "野獣先輩.png",
            function (strOriSvg) {
                const strSvg = strOriSvg.replaceAll("rgb(55,45,50)", "hsl(0 100% 50%)") // 髪、服など
                                        .replaceAll("rgb(115,79,71)", "hsl(30 100% 40%)") // 影
                                        .replaceAll("rgb(166,114,102)", "hsl(60 100% 50%)") // 皮膚
                                        .replaceAll("rgb(254,253,253)", "hsl(250 100% 50%)"); // 背景
                ImageTracer.appendSVGString(strSvg, "svg-container");
                for (let i = 0; i < 100; i++) {
                    ImageTracer.appendSVGString(createRandomColorStrSVG(strOriSvg, tracedata.palette), "svg-container");
                }
            },
            options
        );
    },
    options
);
