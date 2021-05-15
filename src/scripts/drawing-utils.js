import { CANVAS_SIZES } from '@scripts/constants';

export const drawAxis = (ctx) => {
    const padding = CANVAS_SIZES.PADDING;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, CANVAS_SIZES.HEIGHT - padding);
    ctx.lineTo(CANVAS_SIZES.WIDTH - padding, CANVAS_SIZES.HEIGHT - padding);
    ctx.stroke();
};

export const drawPoint = (ctx, x, y) => {
    const point = new Path2D();
    point.arc(x, y, 5, 0, Math.PI * 2);
    ctx.stroke(point);
    ctx.fillStyle = 'white';
    ctx.fill(point);
};

export const drawGraph = (ctx, pointsArr) => {
    ctx.beginPath();

    for (let i = 0; i < pointsArr.length; i++) {
        const point = pointsArr[i];
        const {x, y} = point;

        if (i === 0) {
            ctx.moveTo(x, y);
            continue;
        }

        ctx.lineTo(x, y);
    }

    ctx.stroke();
};

export const clearGraph = (ctx) => {
    const padding = CANVAS_SIZES.PADDING;
    ctx.clearRect(padding + 1, padding - 1, CANVAS_SIZES.WIDTH - padding * 2, CANVAS_SIZES.HEIGHT - padding * 2);
};

export const draw = (ctx, points) => {
    clearGraph(ctx);

    drawGraph(ctx, points);
    points.forEach(point => {
        drawPoint(ctx, point.x, point.y);
    });
};
