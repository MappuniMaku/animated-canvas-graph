import { CANVAS_SIZES, POINTS_DATA } from '@scripts/constants';

export const getRandomPoints = () => {
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
