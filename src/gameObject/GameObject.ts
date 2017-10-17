import PositionModel from '../position/PositionModel';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';
import { STAGE } from '../stage/stageConfig';

class GameObject extends PositionModel {
    public static count: number = 0;

    public id: number = GameObject.count++;
    public radius: number = 10;

    private _vx: number = 1;
    private _vy: number = 1;

    constructor(x: number, y: number) {
        super(x, y);

        this.radius = calculateRandomNumberInRange(5, 15);
        this._vx = this.id % 2 === 0 ? calculateRandomNumberInRange(1, 2) : calculateRandomNumberInRange(-2, -1);
        this._vy = this.id % 2 === 0 ? calculateRandomNumberInRange(1, 2) : calculateRandomNumberInRange(-2, -1);
    }

    public update(): void {
        this.x += this._vx;
        this.y += this._vy;

        this._verifyPositionAndVelocity();
    }

    private _isOutOfView(): boolean {
        return this.x <= 0 ||
            this.y <= 0 ||
            this.x > STAGE.WIDTH ||
            this.y > STAGE.HEIGHT;
    }

    private _isStopped(): boolean {
        return this._vx === 0 || this._vy === 0;
    }

    private _verifyPositionAndVelocity(): void {
        if (!this._isOutOfView() && !this._isStopped()) {
            return;
        }

        if (this.x <= 0 || this.x > STAGE.WIDTH) {
            this._vx *= -1;
        }

        if (this.y <= 0 || this.y > STAGE.HEIGHT) {
            this._vy *= -1;
        }

        return this.update();
    }
}

export default GameObject;
