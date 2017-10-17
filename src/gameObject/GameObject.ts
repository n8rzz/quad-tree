import PositionModel from '../position/PositionModel';
import { GameObjectMovement } from './gameObjectMovementFactory';
import { gameObjectMovementFactory } from './gameObjectMovementFactory';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';

class GameObject extends PositionModel {
    public length: number = 1;
    public updatePositionHandler: (x: number, y: number) => void = this._updatePosition.bind(this);

    private _movement: GameObjectMovement = null;

    constructor(x: number, y: number) {
        super(x, y);

        this.length = calculateRandomNumberInRange(1, 10);
        this._movement = gameObjectMovementFactory();
    }

    public update(): void {
        this._movement.update(this);
    }

    private _updatePosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

export default GameObject;
