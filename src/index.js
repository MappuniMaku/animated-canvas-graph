import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const CANVAS_SIZES = {
        WIDTH: canvas.width,
        HEIGHT: canvas.height,
        PADDING: canvas.width * 0.05,
    };

    const POINTS_DATA = {
        MIN_NUMBER: 2,
        MAX_NUMBER: 10,
    };

    const ctx = canvas.getContext('2d');

    const drawAxis = () => {
        const padding = CANVAS_SIZES.PADDING;

        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, CANVAS_SIZES.HEIGHT - padding);
        ctx.lineTo(CANVAS_SIZES.WIDTH - padding, CANVAS_SIZES.HEIGHT - padding);
        ctx.stroke();
    };

    const getRandomPoints = () => {
        const padding = CANVAS_SIZES.PADDING * 2;

        const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

        const pointsNumber = getRandomInt(POINTS_DATA.MIN_NUMBER, POINTS_DATA.MAX_NUMBER);

        const horizontalStep = (CANVAS_SIZES.WIDTH - padding * 2) / (pointsNumber - 1);

        let currentHorizontalCoordinate = padding;

        const resultArr = [];

        for (let i = 0; i < pointsNumber; i++) {
            resultArr.push({
                x: currentHorizontalCoordinate,
                y: getRandomInt(padding, CANVAS_SIZES.HEIGHT - padding),
            });

            currentHorizontalCoordinate += horizontalStep;
        }

        return resultArr;
    };

    const drawPoint = (x, y) => {
        const point = new Path2D();
        point.arc(x, y, 5, 0, Math.PI * 2);
        ctx.stroke(point);
        ctx.fillStyle = 'white';
        ctx.fill(point);
    };

    const drawGraph = (pointsArr) => {
        ctx.beginPath();

        for (let i = 0; i < pointsArr.length; i++) {
            const point = pointsArr[i];
            const { x, y } = point;

            if (i === 0) {
                ctx.moveTo(x, y);
                continue;
            }

            ctx.lineTo(x, y);
        }

        ctx.stroke();
    };

    drawAxis();

    const draw = () => {
        const points = getRandomPoints();

        drawGraph(points);
        points.forEach(point => {
            drawPoint(point.x, point.y);
        });
    };

    draw();

    const clearGraph = () => {
        const padding = CANVAS_SIZES.PADDING;
        ctx.clearRect(padding, padding, CANVAS_SIZES.WIDTH - padding * 2, CANVAS_SIZES.HEIGHT - padding * 2);
    };

    canvas.addEventListener('click', () => {
        clearGraph();
        draw();
    });
});
