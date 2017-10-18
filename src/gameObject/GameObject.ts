import Rectangle from '../quadTree/Rectangle';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';
import { STAGE } from '../stage/stageConfig';

class GameObject extends Rectangle {
    public static count: number = 0;

    public id: number = GameObject.count++;
    public radius: number = calculateRandomNumberInRange(5, 15);
    public isColliding: boolean = false;

    private _vx: number = 1;
    private _vy: number = 1;

    constructor(x: number, y: number) {
        super(x, y, 30, 30);

        this.height = this.radius * 2;
        this.width = this.radius * 2;
        this._vx = new Date().getTime() % 4 === 0 ? calculateRandomNumberInRange(1, 2) : calculateRandomNumberInRange(-2, -1);
        this._vy = new Date().getTime() % 4 === 0 ? calculateRandomNumberInRange(1, 2) : calculateRandomNumberInRange(-2, -1);
    }

    public update(): void {
        this.x += this._vx;
        this.y += this._vy;

        this._verifyPositionAndVelocity();
    }

    public isCollidingWithItem(compareItem: GameObject): boolean {
        const dx: number = this.x - compareItem.x;
        const dy: number = this.y - compareItem.y;
        const radii: number = this.radius + compareItem.radius + 5;

        return (( dx * dx ) + ( dy * dy )) < (radii * radii);
    }

    public setIsColliding(nextValue: boolean): void {
        this.isColliding = nextValue;
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
