
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function createRandomColorStrSVG(strOriSvg, palette) {
    let strSvg = strOriSvg;
    for (const color of palette) {
        const src = `rgb(${color.r},${color.g},${color.b})`;
        // const dst = `hsl(${randomInt(360)} ${randomInt(100)}% ${randomInt(100)}%)`;
        const dst = `hsl(${randomInt(360)} 100% ${randomInt(25) + randomInt(25) + randomInt(25) + randomInt(25)}%)`;
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
                // const strSvg = strOriSvg.replaceAll("rgb(55,45,50)", "rgb(255,0,0)") // 髪、服など
                //                         .replaceAll("rgb(115,79,71)", "rgb(0,255,0)") // 影
                //                         .replaceAll("rgb(166,114,102)", "rgb(0,0,255)") // 皮膚
                //                         .replaceAll("rgb(254,253,253)", "rgb(255,255,255)"); // 背景
        
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
