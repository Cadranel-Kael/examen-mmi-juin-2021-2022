import {settings} from "../settings";
import {Canvas} from "./Canvas";
import {position} from "../Types/position";

export class Body extends Canvas {
    protected color: string;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: position) {
        super(canvas, ctx, position);
        this.color = settings.snake.color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "white";
        this.ctx.rect(this.position.x, this.position.y, settings.snake.unit, settings.snake.unit);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clear() {
        // The stroke must be considered.
        this.ctx.clearRect(this.position.x -1, this.position.y-1, settings.snake.unit +2, settings.snake.unit +2);
    }
}