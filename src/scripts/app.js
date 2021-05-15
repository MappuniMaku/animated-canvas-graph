import { drawAxis, drawNewGraphWithPoints } from '@scripts/drawing-utils';
import { getRandomPoints, calculateTargetPoints } from '@scripts/helpers';
import { ANIMATION_DATA } from '@scripts/constants';

export const initApp = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let raf, currentPoints, targetPoints, isAnimationInProgress = false, animationFrame = 1, calculatedCurrentPoints;

    drawAxis(ctx);

    currentPoints = getRandomPoints();
    drawNewGraphWithPoints(ctx, currentPoints);

    const animateTransition = () => {
        drawNewGraphWithPoints(ctx, calculatedCurrentPoints);

        if (animationFrame > ANIMATION_DATA.FRAMES_COUNT) {
            isAnimationInProgress = false;
            window.cancelAnimationFrame(raf);
            animationFrame = 1;
            return;
        }

        calculatedCurrentPoints.forEach(point => {
            const { currentX, currentY, targetX, targetY } = point;
            const animationSpeed = animationFrame / ANIMATION_DATA.FRAMES_COUNT;

            point.x = currentX - (currentX - targetX) * animationSpeed;
            point.y = currentY - (currentY - targetY) * animationSpeed;
        });

        animationFrame++;

        raf = window.requestAnimationFrame(animateTransition);
    };

    canvas.addEventListener('click', () => {
        if (isAnimationInProgress) return;

        currentPoints = targetPoints || currentPoints;
        targetPoints = getRandomPoints();
        calculatedCurrentPoints = calculateTargetPoints(currentPoints, targetPoints);

        if (calculatedCurrentPoints === null) {
            drawNewGraphWithPoints(ctx, targetPoints);
            return;
        }

        isAnimationInProgress = true;
        animateTransition();
    });
};
