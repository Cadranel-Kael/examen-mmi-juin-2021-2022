import {settings} from "../settings";
import {Animatable} from "../framework-2023/Types/Animatable";

export class Animation {
    private readonly iDrawables: Animatable[];
    private readonly status: { start: boolean };
    private last: DOMHighResTimeStamp;
    private now: DOMHighResTimeStamp;

    constructor(status: { start: boolean }) {
        this.iDrawables = [];
        this.last = performance.now();
        this.now = performance.now();
        this.status = status;
    }

    addAnimatable(iDrawable: Animatable) {
        this.iDrawables.push(iDrawable);
    }

    animate() {
        if (this.status.start) {
            if (this.now - this.last > 1000 / settings.canvas.fps) {
                this.clear();
                this.iDrawables.forEach((iDrawable: Animatable) => iDrawable.draw());
                this.last = this.now;
            }
            this.now = performance.now();
            window.requestAnimationFrame(() => {
                this.animate();
            });
        }
    }

    clear() {
        this.iDrawables.forEach((iDrawable: Animatable) => iDrawable.clear());
    }
}