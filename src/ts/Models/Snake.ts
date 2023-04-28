import {BodyItem} from "./BodyItem";
import {settings} from "../settings";
import {Canvas} from "../framework-2023/Canvas";
import {Animatable} from "../framework-2023/Types/Animatable";

export class Snake implements Animatable{
    private bodyItems: Array<BodyItem>;

    constructor(canvas: Canvas) {
        this.bodyItems = [];
        for (let i = 0; i < settings.snake.initialCount; i++) {
            this.bodyItems.push(new BodyItem({
                canvas: canvas,
                position: {
                    x: (canvas.width/2)-(settings.snake.unit*Math.floor(settings.snake.initialCount/2))+i*settings.snake.unit,
                    y: canvas.height/2-settings.snake.unit
                },
            }))

        }
    }

    draw() {
        this.bodyItems.forEach((bodyItem)=> {
            bodyItem.draw();

        })
    }

    clear(): void {
        this.bodyItems.forEach((bodyItem)=> {
            // bodyItem.clear();
        })
    }

    update(): void {
    }
}