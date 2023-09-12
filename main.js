
// min以上max以下の整数を返す
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        ImageTracer.imageToSVG(
            "野獣先輩.png",
            async function (strOriSvg) {
                function appendRandomSVG() {
                    let strSvg = strOriSvg;
                    for (const color of tracedata.palette) {
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
                    ImageTracer.appendSVGString(strSvg, "svg-container");
                }

                const addButton = document.querySelector("#add-svg-btn");
                const elMessage = document.querySelector("#message");

                function appendManyRandomSVG() {
                    return new Promise(resolve => {
                        requestAnimationFrame(() => {
                            addButton.style.display = "none";
                            elMessage.style.display = "";
                            requestAnimationFrame(() => {
                                for (let i = 0; i < 100; i++) {
                                    appendRandomSVG();
                                }
                                addButton.style.display = "";
                                elMessage.style.display = "none";
                                resolve();
                            });
                        });
                    })
                }
                
                await appendManyRandomSVG();

                let canClick = true;
                addButton.addEventListener("click", async () => {
                    if (!canClick) {
                        return;
                    }
                    canClick = false;
                    await appendManyRandomSVG();
                    canClick = true;
                });
            },
            options
        );
    },
    options
);
