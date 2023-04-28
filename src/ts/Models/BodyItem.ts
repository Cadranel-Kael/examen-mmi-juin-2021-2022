import {Square} from "../framework-2023/shapes/Square";
import {IShape} from "../framework-2023/Types/IShape";
import {settings} from "../settings";
import {Rgb} from "../framework-2023/Colors/Rgb";
import {Hsl} from "../framework-2023/Colors/Hsl";
import {IBodyItem} from "../Types/IBodyItem";

export class BodyItem extends Square {
    private readonly borderColor: Rgb | Hsl | string;

    constructor(body: IBodyItem) {
        super({
            canvas: body.canvas,
            position: body.position,
            color: settings.snake.color,
            side: settings.snake.unit,
            speed: settings.snake.unit,
        });
        this.borderColor = settings.snake.borderColor;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = `${this.color}`;
        this.ctx.strokeStyle = `${this.borderColor}`;
        this.ctx.rect(this.position.x, this.position.y, this.side, this.side);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
}