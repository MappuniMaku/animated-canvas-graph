import { Drawer } from '@scripts/drawer';
import { getRandomPoints, calculateTargetPoints } from '@scripts/helpers';
import { CANVAS_SIZES, ANIMATION_DATA } from '@scripts/constants';

export const initApp = (canvas) => {
    canvas.width = CANVAS_SIZES.WIDTH;
    canvas.height = CANVAS_SIZES.HEIGHT;

    const ctx = canvas.getContext('2d');
    const drawer = new Drawer(ctx);

    let raf, currentPoints, targetPoints, isAnimationInProgress = false, animationFrame = 1, calculatedCurrentPoints;

    drawer.drawAxis();

    currentPoints = getRandomPoints();
    drawer.drawNewGraphWithPoints(currentPoints);

    const animateTransition = () => {
        drawer.drawNewGraphWithPoints(calculatedCurrentPoints);

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
            drawer.drawNewGraphWithPoints(targetPoints);
            return;
        }

        isAnimationInProgress = true;
        animateTransition();
    });
};
