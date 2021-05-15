import { CANVAS_SIZES } from '@scripts/constants';

export class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    clearGraph() {
        const padding = CANVAS_SIZES.PADDING;
        this.ctx.clearRect(
            padding + 1,
            padding - 1,
            CANVAS_SIZES.WIDTH - padding * 2,
            CANVAS_SIZES.HEIGHT - padding * 2
        );
    }

    drawAxis() {
        const padding = CANVAS_SIZES.PADDING;

        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, CANVAS_SIZES.HEIGHT - padding);
        this.ctx.lineTo(CANVAS_SIZES.WIDTH - padding, CANVAS_SIZES.HEIGHT - padding);
        this.ctx.stroke();
    }

    drawGraph(pointsArr) {
        this.ctx.beginPath();

        for (let i = 0; i < pointsArr.length; i++) {
            const point = pointsArr[i];
            const {x, y} = point;

            if (i === 0) {
                this.ctx.moveTo(x, y);
                continue;
            }

            this.ctx.lineTo(x, y);
        }

        this.ctx.stroke();
    }

    drawNewGraphWithPoints(points) {
        this.clearGraph();

        this.drawGraph(points);
        points.forEach(point => {
            this.drawPoint(point.x, point.y);
        });
    }

    drawPoint(x, y) {
        const point = new Path2D();
        point.arc(x, y, 5, 0, Math.PI * 2);
        this.ctx.stroke(point);
        this.ctx.fillStyle = 'white';
        this.ctx.fill(point);
    }
}
