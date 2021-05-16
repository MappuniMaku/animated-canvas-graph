export const CANVAS_SIZES = {
    WIDTH: 800,
    HEIGHT: 500,
    PADDING: 40,
};

export const POINTS_DATA = {
    MIN_NUMBER: 2,
    MAX_NUMBER: 10,
};

export const ANIMATION_DATA = {
    FRAMES_COUNT: 20,
};

export const getCanvasSizes = canvas => {
    CANVAS_SIZES.WIDTH = canvas.offsetWidth;
    CANVAS_SIZES.HEIGHT = canvas.offsetWidth * 0.625;
    CANVAS_SIZES.PADDING = canvas.offsetWidth * 0.05;
};
