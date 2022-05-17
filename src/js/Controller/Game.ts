import {settings} from "../settings";
import {Snake} from "../Models/Snake";
import {Animation} from "../Models/Animation";
import {direction} from "../Types/direction";
import {Apple} from "../Models/Apple";
import {Score} from "../Models/Score";


export class Game {
    private readonly snakeCanvas: HTMLCanvasElement;
    private readonly snakeCtx: CanvasRenderingContext2D;
    private readonly foodCanvas: HTMLCanvasElement;
    private readonly snake: Snake;
    private readonly animation: Animation;
    private readonly status: { start: boolean };
    private readonly current: { direction: direction };
    private readonly apples: Apple[];
    private readonly foodCtx: CanvasRenderingContext2D;
    private readonly score: Score;
    private readonly formPlay: HTMLFormElement;
    private readonly message: HTMLParagraphElement;
    private readonly scoreInput: HTMLInputElement;

    constructor() {
        this.message = document.querySelector(settings.forms.messageSelector) as HTMLParagraphElement;
        this.scoreInput = document.querySelector(settings.forms.inputSelector) as HTMLInputElement;
        this.snakeCanvas = document.querySelector(settings.canvas.snake.domSelector) as HTMLCanvasElement;
        this.foodCanvas = document.querySelector(settings.canvas.food.domSelector) as HTMLCanvasElement;
        this.snakeCtx = this.snakeCanvas.getContext(settings.canvas.snake.ctx, {alpha: true}) as CanvasRenderingContext2D;
        this.foodCtx = this.foodCanvas.getContext(settings.canvas.food.ctx, {alpha: true}) as CanvasRenderingContext2D;
        this.formPlay = document.querySelector(settings.forms.domSelector) as HTMLFormElement;
        this.status = {start: false};
        this.apples = [];
        this.current = {direction: direction.right};
        this.animation = new Animation(this.status);
        this.score = new Score(document.querySelector(settings.score.domSelector));
        this.snake = new Snake(this.snakeCanvas, this.snakeCtx, this.current, this.apples, this.score, this.replay.bind(this));
        this.animation.addIDrawable(this.snake);
        this.addEventListeners();

    }


    addEventListeners() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowDown" :
                    if (this.current.direction != direction.up) {
                        this.current.direction = direction.down;
                    }
                    break;
                case "ArrowUp" :
                    if (this.current.direction != direction.down) {
                        this.current.direction = direction.up;
                    }
                    break;
                case "ArrowLeft" :
                    if (this.current.direction != direction.right) {
                        this.current.direction = direction.left;
                    }
                    break;
                case "ArrowRight" :
                    if (this.current.direction != direction.left) {
                        this.current.direction = direction.right;
                    }
                    break;
            }

        });
        this.formPlay.addEventListener('submit', (event) => {
            event.preventDefault();
            this.reset(event);
        });
    }

    private reset(event: SubmitEvent) {
        // @ts-ignore
        event.currentTarget.classList.add(settings.forms.hideClass);
        this.apples.forEach((food) => {
            food.clear();
        });
        this.snake.clear();
        this.snake.reset();
        this.apples.length = 0;
        this.animation.clear();
        this.score.clear();
        this.status.start = true;
        this.apples.push(new Apple(this.foodCanvas, this.foodCtx));
        this.animation.animate();
    }

    replay(message: string) {
        this.status.start = false;
        this.formPlay.classList.remove(settings.forms.hideClass);
        this.message.textContent = message;
        this.scoreInput.value = this.score.score().toString();
    }

}