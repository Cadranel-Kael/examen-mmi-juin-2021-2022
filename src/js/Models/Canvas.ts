import {IDrawable} from "../Interfaces/IDrawable";
import {position} from "../Types/position";

export abstract class Canvas implements IDrawable {
    protected readonly canvas: HTMLCanvasElement;
    protected readonly ctx: CanvasRenderingContext2D;
    public position: position;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: position) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.position = position;
    }

    abstract draw(): void;
    abstract clear(): void;

}