import {Body} from "./Body";
import {direction} from "../Types/direction";
import {settings} from "../settings";
import {Canvas} from "./Canvas";
import {position} from "../Types/position";
import {Apple} from "./Apple";
import {Score} from "./Score";
import {compare} from "../Helpers/compare";

export class Snake extends Canvas {
    private current: { direction: direction };
    private tail: Body[];
    private readonly apples: Apple[];
    private readonly score: Score;
    private readonly replay: (message: string) => void;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, current: { direction: direction }, apples: Apple[], score: Score, replay: (message: string) => void) {
        super(canvas, ctx, {
            x: canvas.width / 2 - ((Math.ceil(settings.snake.initialCount / 2) + 1) * settings.snake.unit),
            y: canvas.height / 2 - settings.snake.unit
        });
        this.score = score;
        this.current = current;
        this.tail = [];
        for (let i = 0; i < settings.snake.initialCount; i++) {
            this.tail.push(new Body(this.canvas, this.ctx, {
                x: this.position.x + i * settings.snake.unit,
                y: this.position.y
            }));
        }
        this.apples = apples;
        this.draw();
        this.replay = replay;

    }

    draw() {
        this.update();
        this.isEating();
        this.tail.forEach((item) => {
            item.draw();
        });
        this.isGoingOutside();
        this.isBitingItsTail();
    }

    update() {
        this.tail.shift();
        this.position = {
            x: this.tail[this.tail.length - 1]?.position.x,
            y: this.tail[this.tail.length - 1]?.position.y
        };
        switch (this.current.direction) {
            case direction.down:
                this.position.y += settings.snake.unit;
                break;
            case direction.up:
                this.position.y -= settings.snake.unit;
                break;
            case direction.left:
                this.position.x -= settings.snake.unit;
                break;
            case direction.right:
                this.position.x += settings.snake.unit;
                break;
        }
        this.tail.push(new Body(this.canvas, this.ctx, this.position));
    }

    private isGoingOutside() {
        if (this.position.x > this.canvas.width - settings.snake.unit ||
            this.position.x < 0 ||
            this.position.y > this.canvas.height - settings.snake.unit ||
            this.position.y < 0) {
            this.replay(settings.forms.messages.goOut);
        }
    }

    private isEating() {
        this.apples.forEach((food: Apple) => {
            if (compare(this.position,food.position)) {
                food.reset();
                this.growingUp();
                this.score.increment();
                return;
            }
        });
    }

    private isBitingItsTail() {
        if (this.tail.length > 0) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                if (compare(this.tail[i].position, this.tail[this.tail.length - 1].position)) {
                    this.replay(settings.forms.messages.selfEating);
                }
            }
        }
    }

    private growingUp() {
        const newPosition: position = {
            x: this.tail[this.tail.length - 1]?.position.x,
            y: this.tail[this.tail.length - 1]?.position.y
        };
        switch (this.current.direction) {
            case direction.down:
                newPosition.y += settings.snake.unit;
                break;
            case direction.up:
                newPosition.y -= settings.snake.unit;
                break;
            case direction.left:
                newPosition.x -= settings.snake.unit;
                break;
            case direction.right:
                newPosition.x += settings.snake.unit;
                break;
        }
        this.tail.push(new Body(this.canvas, this.ctx, newPosition));
    }

    reset() {
        this.position = {
            x: this.canvas.width / 2 - ((Math.ceil(settings.snake.initialCount / 2) + 1) * settings.snake.unit),
            y: this.canvas.height / 2 - settings.snake.unit
        }
        this.current.direction = direction.right;
        this.tail = [];
        for (let i = 0; i < settings.snake.initialCount; i++) {
            this.tail.push(new Body(this.canvas, this.ctx, {
                x: this.position.x + i * settings.snake.unit,
                y: this.position.y
            }));
        }
    }

    clear() {
        this.tail.forEach((body: Body) => {
            body.clear()
        });
    }
}
