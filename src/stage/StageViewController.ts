import GameObject from '../gameObject/GameObject';
import GameObjectCollection from '../gameObject/GameObjectCollection';
import QuadTree from '../quadTree/QuadTree';
import Rectangle from '../quadTree/Rectangle';
import { calculateRandomNumberInRange } from '../util/calculateRandomNumberInRange';
import { STAGE } from './stageConfig';

const CIRCLE_RADIANS: number = Math.PI * 2;
const DEFAULT_FILL_STYLE: string = 'rgba(255, 255, 255, 0.1)';
const IS_COLLIDING_FILL_STYLE: string = 'rgba(217, 83, 77, 0.8)';

class StageController {
    public element: HTMLCanvasElement = null;

    private _ctx: CanvasRenderingContext2D = null;
    private _isEnabled: boolean = false;
    private _collection: GameObjectCollection = null;
    private _quadTree: QuadTree = null;
    private _animationHandler: () => void = this._draw.bind(this);

    constructor(element: HTMLCanvasElement) {
        return this.setupChildren(element)
            .enable();
    }

    public setupChildren(element: HTMLCanvasElement): this {
        this.element = element;
        this._ctx = element.getContext('2d');
        this._collection = new GameObjectCollection();
        this._quadTree = new QuadTree(new Rectangle(0, 0, 600, 600), 100, 4);

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
        this._ctx.fillStyle = DEFAULT_FILL_STYLE;
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
            const x = calculateRandomNumberInRange(0, STAGE.WIDTH);
            const y = calculateRandomNumberInRange(0, STAGE.HEIGHT);
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
        this._updatePositions();
        this._updateCollisions();
    }

    private _drawGameObjects(): void {
        this._clearCanvas();
        this._collection.sortByIsColliding();

        let prevIsColliding = false;

        for (let i = 0; i < this._collection.length; i++) {
            const item = this._collection.items[i];

            this._setFillStyleForItemState(item, prevIsColliding);

            this._ctx.beginPath();
            this._ctx.arc(item.x, item.y, item.radius, 0, CIRCLE_RADIANS, false);
            this._ctx.fill();
            this._ctx.stroke();

            prevIsColliding = item.isColliding;
        }
    }

    private _setFillStyleForItemState(item: GameObject, prevIsColliding: boolean): void {
        if (item.isColliding === prevIsColliding) {
            return;
        }

        this._ctx.fillStyle = item.isColliding
            ? IS_COLLIDING_FILL_STYLE
            : DEFAULT_FILL_STYLE;
    }

    private _updatePositions(): void {
        for (let i = 0; i < this._collection.length; i++) {
            const item = this._collection.items[i];

            item.update();
        }
    }

    private _updateCollisions(): void {
        this._quadTree.clear();
        this._quadTree.insert(this._collection.items.slice(0));

        for (let i = 0; i < this._collection.length; i++) {
            const item: GameObject = this._collection.items[i];

            this._updateConflictsForItem(item);
        }
    }

    private _updateConflictsForItem(item: GameObject): void {
        // .retrieve() is recursive and will internally return QuadTreeNodes, using cast here to inform compiler of final type
        const itemList: GameObject[] = this._quadTree.retrieve(item) as GameObject[];

        // if (itemList.length !== this._collection.length) {
        //     console.log(item.id, itemList.length);
        // }

        for (let i = 0; i < itemList.length; i++) {
            const compareItem = itemList[i];

            if (item.id === compareItem.id || item.isColliding && compareItem.isColliding) {
                continue;
            }

            const nextIsColliding: boolean = item.isCollidingWithCompareItem(compareItem);

            if (!item.isColliding) {
                item.setIsColliding(nextIsColliding);
            }

            if (!compareItem.isColliding) {
                compareItem.setIsColliding(nextIsColliding);
            }
        }
    }
}

export default StageController;
