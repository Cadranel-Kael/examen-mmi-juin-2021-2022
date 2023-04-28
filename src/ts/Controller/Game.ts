import {IBodyItem} from "../Types/IBodyItem";
import {BodyItem} from "../Models/BodyItem";
import {Canvas} from "../framework-2023/Canvas";
import {settings} from "../settings";
import {Snake} from "../Models/Snake";

export class Game {
    private snakeCanvas: Canvas;
    private foodCanvas: Canvas;
    private snake: Snake;

    constructor() {
        this.snakeCanvas = new Canvas(document.querySelector(settings.canvas.snake.domSelector), settings.canvas.size);
        this.foodCanvas = new Canvas(document.querySelector(settings.canvas.food.domSelector), settings.canvas.size);

        this.snake = new Snake(this.snakeCanvas);
        this.snake.draw();

    }
}