import './index.scss';
import { getCanvasSizes } from '@scripts/constants';
import { initApp } from '@scripts/app';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    if (canvas === null) {
        throw new Error('Target canvas element not found');
    }

    getCanvasSizes(canvas);
    initApp(canvas);
});
