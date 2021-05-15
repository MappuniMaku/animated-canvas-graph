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

export const calculateTargetPoints = (currentPoints, targetPoints) => {
    const currentPointsNumber = currentPoints.length;
    const targetPointsNumber = targetPoints.length;

    const formCurrentPoint = (currentIndex, targetIndex = currentIndex) => {
        currentPoints[currentIndex] = {
            ...currentPoints[currentIndex],
            currentX: currentPoints[currentIndex].x,
            currentY: currentPoints[currentIndex].y,
            targetX: targetPoints[targetIndex].x,
            targetY: targetPoints[targetIndex].y,
        };
    };

    if (targetPointsNumber === currentPointsNumber) {
        for (let i = 0; i < currentPointsNumber; i++) {
            formCurrentPoint(i);
        }

        return currentPoints;
    }

    if (targetPointsNumber < currentPointsNumber) {
        const requiredUnionsNumber = currentPointsNumber - targetPointsNumber;
        const possibleUnionsNumber = Math.floor((currentPointsNumber - 2) / 2);

        if (requiredUnionsNumber > possibleUnionsNumber) {
            const step = (currentPointsNumber - 1) / (targetPointsNumber - 1);
            const unionCenters = [];
            for (let i = 0; i < targetPointsNumber; i++) {
                unionCenters.push(Math.floor(step * i));
            }

            for (let i = 0; i < unionCenters.length; i++) {
                const centerIndex = unionCenters[i];

                if (i === unionCenters.length - 1) {
                    formCurrentPoint(centerIndex, i);
                    break;
                }

                for (let j = centerIndex; j < unionCenters[i + 1]; j++) {
                    formCurrentPoint(j, i);
                }
            }

            return currentPoints;
        }

        if (requiredUnionsNumber <= possibleUnionsNumber) {
            let isNextPointInUnion = false;
            let formedUnionsCount = 0;

            for (let i = 0; i < currentPointsNumber; i++) {
                if (i === 0) {
                    formCurrentPoint(i);
                    continue;
                }

                if (i === currentPointsNumber - 1) {
                    formCurrentPoint(i, targetPointsNumber - 1);
                    break;
                }

                if (isNextPointInUnion) {
                    isNextPointInUnion = false;
                    formCurrentPoint(i, i - formedUnionsCount);
                    continue;
                }

                if (formedUnionsCount < requiredUnionsNumber) {
                    formCurrentPoint(i, i - formedUnionsCount);
                    formedUnionsCount ++;
                    isNextPointInUnion = true;
                    continue;
                }

                formCurrentPoint(i, i - formedUnionsCount);
            }

            return currentPoints;
        }
    }

    return null;
};
