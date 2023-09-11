// ソース元：https://note.kiriukun.com/entry/20181206-rgb-and-hsl-conversion
/**
 * RGBからHSLを算出して返却
 * @param  {Number} r - 赤 (0~255)
 * @param  {Number} g - 緑 (0~255)
 * @param  {Number} b - 青 (0~255)
 * @return {Object} h: 色相 (0~360), s: 彩度 (0~100), l: 明度 (0~100)
 */
const rgb2hsl = function (r, g, b) {
    const RGB_MAX = 255;
    const HUE_MAX = 360;
    const SATURATION_MAX = 100;
    const LIGHTNESS_MAX = 100;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;

    // Hue
    const hp = HUE_MAX / 6;
    if (max == min) {
        h = 0;
    } else if (r == max) {
        h = hp * ((g - b) / (max - min));
    } else if (g == max) {
        h = hp * ((b - r) / (max - min)) + HUE_MAX / 3;
    } else {
        h = hp * ((r - g) / (max - min)) + HUE_MAX * 2 / 3;
    }
    if (h < 0) {
        h += HUE_MAX;
    }

    // Saturation
    const cnt = (max + min) / 2;
    if (cnt < RGB_MAX / 2) {
        if (max + min <= 0) {
            s = 0;
        } else {
            s = (max - min) / (max + min) * SATURATION_MAX;
        }
    } else {
        s = (max - min) / (RGB_MAX * 2 - max - min) * SATURATION_MAX;
    }

    // Lightness
    l = (max + min) / RGB_MAX / 2 * LIGHTNESS_MAX;

    return {
        h: h,
        s: s,
        l: l
    };
};