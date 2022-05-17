import {Canvas} from "./Canvas";
import {settings} from "../settings";
import {random} from "../Helpers/random";

export class Apple extends Canvas {

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx, null);
        this.position = this.generatePosition();
        this.draw();
    }

    private generatePosition() {
        const randomColumn = random(settings.food.radius, this.canvas.width / (settings.food.radius * 2) - 1);
        const randomRow = random(settings.food.radius, this.canvas.height / (settings.food.radius * 2) - 1);
        return {
            x: (randomColumn * settings.snake.unit) - settings.food.radius * 2,
            y: (randomRow * settings.snake.unit) - settings.food.radius * 2
        };
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = settings.food.color;
        this.ctx.arc(this.position.x + settings.food.radius, this.position.y + settings.food.radius, settings.food.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    reset() {
        this.clear();
        this.position = this.generatePosition();
        this.draw();
    }

    clear() {
        this.ctx.clearRect(this.position.x, this.position.y, settings.food.radius * 2, settings.food.radius * 2);
    }
}