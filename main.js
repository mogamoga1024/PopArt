
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

ImageTracer.imageToSVG(
    "野獣先輩.png",
    function (svgstr) {
        // console.log(svgstr);
        ImageTracer.appendSVGString(svgstr, "svg");
    },
    options
);

ImageTracer.imageToTracedata(
    "野獣先輩.png",
    function (tracedata) {
        console.log(tracedata);
    },
    options
);
