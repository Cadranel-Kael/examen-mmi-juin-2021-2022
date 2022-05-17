import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";

export class Animation {
    private readonly iDrawables: IDrawable[];
    private readonly status: { start: boolean };
    private last: DOMHighResTimeStamp;
    private now: DOMHighResTimeStamp;

    constructor(status: { start: boolean }) {
        this.iDrawables = [];
        this.last = performance.now();
        this.now = performance.now();
        this.status = status;
    }

    addIDrawable(iDrawable: IDrawable) {
        this.iDrawables.push(iDrawable);
    }

    animate() {
        if (this.status.start) {
            if (this.now - this.last > 1000 / settings.canvas.fps) {
                this.clear();
                this.iDrawables.forEach((iDrawable: IDrawable) => iDrawable.draw());
                this.last = this.now;
            }
            this.now = performance.now();
            window.requestAnimationFrame(() => {
                this.animate();
            });
        }
    }

    clear() {
        this.iDrawables.forEach((iDrawable: IDrawable) => iDrawable.clear());
    }
}