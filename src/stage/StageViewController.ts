import GameObject from '../gameObject/GameObject';

class StageController {
    public element: HTMLCanvasElement = null;

    private _ctx: CanvasRenderingContext2D = null;
    private _isEnabled: boolean = false;
    private _items: GameObject[] = [];

    constructor(element: HTMLCanvasElement) {
        return this.createHandlers()
            .setupChildren(element)
            .enable();
    }

    public createHandlers(): this {
        return this;
    }

    public setupChildren(element: HTMLCanvasElement): this {
        this.element = element;
        this._ctx = element.getContext('2d');
        this._items = this._buildGameObjects();

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
        return this;
    }

    public redraw(): this {
        return this;
    }

    public render(): this {
        return this.redraw();
    }

    private _buildGameObjects(): GameObject[] {
        const gameObjects: GameObject[] = [];
        const canvasHeight = 500;
        const canvasWidth = 500;
        const count = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * (canvasWidth - i + 1)) + i;
            const y = Math.floor(Math.random() * (canvasHeight - i + 1)) + i;
            const gameObject = new GameObject(x, y);

            gameObjects.push(gameObject);
        }

        return gameObjects;
    }
}

export default StageController;
