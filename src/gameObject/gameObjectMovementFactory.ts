import GameObject from './GameObject';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';
import { STAGE } from '../stage/stageConfig';

function isPositionOutsideView(x: number, y: number): boolean {
    return x < 0 || x > STAGE.WIDTH &&
        y < 0 || y > STAGE.HEIGHT ;
}

export class GameObjectMovement {
    update(item: GameObject): void {}
}

class DripMovement extends GameObjectMovement {
    constructor() {
        super();
    }

    public update(item: GameObject): void {
        let nextX = item.x;
        let nextY = item.y + 1;

        if (isPositionOutsideView(nextX, nextY)) {
            nextX = calculateRandomNumberInRange(0, STAGE.WIDTH);
            nextY = -1;
        }

        item.updatePositionHandler(nextX, nextY);
    }
}

class FastSlideLeftMovement extends GameObjectMovement {
    constructor() {
        super();
    }

    public update(item: GameObject): void {
        let nextX = item.x + calculateRandomNumberInRange(4, 6);
        let nextY = item.y + 1;

        if (isPositionOutsideView(nextX, nextY)) {
            nextX = -1;
            nextY = calculateRandomNumberInRange(0, STAGE.HEIGHT);
        }

        item.updatePositionHandler(nextX, nextY);
    }
}

class FastSlideRightMovement extends GameObjectMovement {
    constructor() {
        super();
    }

    public update(item: GameObject): void {
        let nextX = item.x - calculateRandomNumberInRange(4, 8);
        let nextY = item.y + 1;

        if (isPositionOutsideView(nextX, nextY)) {
            nextX = STAGE.WIDTH + 1;
            nextY = calculateRandomNumberInRange(0, STAGE.HEIGHT);
        }

        item.updatePositionHandler(nextX, nextY);
    }
}

class FastFallMovement extends GameObjectMovement {
    constructor() {
        super();
    }

    public update(item: GameObject): void {
        let nextX = item.x + 1;
        let nextY = item.y + calculateRandomNumberInRange(4, 8);

        if (isPositionOutsideView(nextX, nextY)) {
            nextX = calculateRandomNumberInRange(0, STAGE.WIDTH);
            nextY = -1;
        }

        item.updatePositionHandler(nextX, nextY);
    }
}

const MAP = [
    DripMovement,
    FastSlideLeftMovement,
    FastSlideRightMovement,
    FastFallMovement
];

export function gameObjectMovementFactory(): GameObjectMovement {
    const movementConstructorIndex = calculateRandomNumberInRange(0, MAP.length - 1);

    return new MAP[movementConstructorIndex]();
}
