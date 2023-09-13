
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
            function (strOriSvg) {
                const addButton = document.querySelector("#add-svg-btn");
                addButton.canClick = true;
                const elMessage = document.querySelector("#message");

                const worker = new Worker("createRandomStrSVGWorker.js");
                worker.onmessage = function(e) {
                    const strSvg = e.data;
                    ImageTracer.appendSVGString(strSvg, "svg-container");
                    addButton.canClick = true;
                    addButton.style.display = "";
                    elMessage.style.display = "none";
                };
                worker.onerror = function(e) {
                    console.error(e);
                    elMessage.style.display = "";
                    elMessage.innerText = "エラー発生…重いかも…";
                };

                worker.postMessage({strOriSvg, palette: tracedata.palette});

                addButton.onclick = function() {
                    if (!addButton.canClick) {
                        return;
                    }
                    addButton.style.display = "none";
                    elMessage.style.display = "";
                    addButton.canClick = false;
                    worker.postMessage({strOriSvg, palette: tracedata.palette});
                }
            },
            options
        );
    },
    options
);
