import { drawAxis, draw } from '@scripts/drawing-utils';
import { getRandomPoints } from '@scripts/helpers';

export const initApp = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let raf, currentPoints = [], targetPoints = [], isAnimationInProgress = false;

    drawAxis(ctx);

    currentPoints = getRandomPoints();
    draw(ctx, currentPoints);

    const animateTransition = () => {
        draw(ctx, targetPoints);

        raf = window.requestAnimationFrame(animateTransition);
    };

    canvas.addEventListener('click', () => {
        if (isAnimationInProgress) return;

        isAnimationInProgress = true;
        targetPoints = getRandomPoints();
        animateTransition();
    });
};
