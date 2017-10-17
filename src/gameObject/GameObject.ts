import PositionModel from '../position/PositionModel';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';

class GameObject extends PositionModel {
    public length: number = 1;

    constructor(x: number, y: number) {
        super(x, y);

        this.length = calculateRandomNumberInRange(1, 10);
    }

    public updatePosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

export default GameObject;
