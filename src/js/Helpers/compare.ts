import {position} from "../Types/position";

export function compare(p1: position, p2: position): boolean {
    return p1.x === p2.x && p1.y === p2.y;
}