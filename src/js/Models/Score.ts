export class Score {
    private element: HTMLElement;
    private _score: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this._score = 0;
    }

    increment() {
        this._score++;
        this.element.textContent = this._score.toString();
    }

    clear() {
        this._score = -1;
        this.increment();
    }

    score(): number {
        return this._score;
    }
}