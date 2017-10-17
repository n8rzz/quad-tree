import GameObject from '../gameObject/GameObject';
import GameObjectCollection from '../gameObject/GameObjectCollection';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';
import { STAGE } from './stageConfig';

const CIRCLE_RADIANS = Math.PI * 2;
const IS_COLLIDING_STROKE_STYLE = 'rgba(217, 83, 77, 0.8)';

class StageController {
    public element: HTMLCanvasElement = null;

    private _ctx: CanvasRenderingContext2D = null;
    private _isEnabled: boolean = false;
    private _collection: GameObjectCollection = null;
    private _animationHandler: () => void = this._draw.bind(this);

    constructor(element: HTMLCanvasElement) {
        return this.setupChildren(element)
            .enable();
    }

    public setupChildren(element: HTMLCanvasElement): this {
        this.element = element;
        this._ctx = element.getContext('2d');
        this._collection = new GameObjectCollection();

        return this;
    }

    public enable(): this {
        if (this._isEnabled) {
            return this;
        }

        this._isEnabled = true;

        return this.layout()
            .render();
    }

    public layout(): this {
        this._ctx.strokeStyle = 'rgba(234, 234, 234, 0.8)';
        this._ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this._ctx.lineWidth = 1;

        this._buildGameObjects();

        return this;
    }

    public redraw(): this {
        this._drawGameObjects();
        this._animationHandler();

        return this;
    }

    public render(): this {
        return this.redraw();
    }

    private _buildGameObjects(): void {
        const gameObjects: GameObject[] = [];
        const count = calculateRandomNumberInRange(10, 100);

        for (let i = 0; i < count; i++) {
            const x = calculateRandomNumberInRange(i, STAGE.WIDTH);
            const y = calculateRandomNumberInRange(i, STAGE.HEIGHT);
            const gameObject = new GameObject(x, y);

            this._collection.addItem(gameObject);
        }
    }

    private _clearCanvas(): void {
        this._ctx.clearRect(0, 0, STAGE.WIDTH, STAGE.HEIGHT);
    }

    private _draw(): void {
        window.requestAnimationFrame(this._animationHandler);
        this._drawGameObjects();
    }

    private _drawGameObjects(): void {
        this._clearCanvas();

        for (let i = 0; i < this._collection.length; i++) {
            const item = this._collection.items[i];

            this._ctx.beginPath();
            this._ctx.arc(item.x, item.y, item.radius, 0, CIRCLE_RADIANS, false);
            this._ctx.fill();
            this._ctx.stroke();
        }

        this._updatePositions();
    }

    private _updatePositions(): void {
        for (let i = 0; i < this._collection.length; i++) {
            const item = this._collection.items[i];

            item.update();
        }
    }
}

export default StageController;
