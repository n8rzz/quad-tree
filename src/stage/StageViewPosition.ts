import PositionModel from '../position/PositionModel';
import  { GAME_BOARD_SIZE } from './stageConstants';

const ACTIVE_CLASSNAME = 'game-board-position_isActive';

class StageViewPosition {
    private _element: SVGRectElement;
    private _positionModel: PositionModel;
    private _isActive: boolean;

    public id: string;

    constructor(x: number, y: number) {
        this._element = null;
        this._positionModel = new PositionModel(x, y);
        this._isActive = false;

        this.id = `board-pos-${this._positionModel.y}-${this._positionModel.x}`;

        this.init();
    }

    get element(): SVGRectElement {
        return this._element;
    }

    get position(): PositionModel {
        return this._positionModel;
    }

    public init(): this {
        return this.createChildren()
            .enable();
    }

    public createChildren(): this {
        this._element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this._element.classList.add('game-board-position')
        this._element.setAttribute('id', this.id);
        this._element.setAttribute('x', `${GAME_BOARD_SIZE.POSITION_SIZE * this._positionModel.x}`);
        this._element.setAttribute('y', `${GAME_BOARD_SIZE.POSITION_SIZE * this._positionModel.y}`);
        this._element.setAttribute('height', `${GAME_BOARD_SIZE.POSITION_SIZE - 2}`);
        this._element.setAttribute('width', `${GAME_BOARD_SIZE.POSITION_SIZE - 2}`);

        return this;
    }

    public enable(): this {
        return this;
    }

    public addEventListener(type: string, callback: (event: any) => void): void {
        this._element.addEventListener(type, callback);
    }

    public toggleIsActive(): void {
        const nextState: boolean = !this._isActive;

        this._updateViewState(nextState);

        this._isActive = nextState;
    }

    private _hasActiveClassname(): boolean {
        return this._element.classList.contains(ACTIVE_CLASSNAME);
    }

    private _updateViewState(nextState: boolean): void {
        if (nextState && !this._hasActiveClassname()) {
            this._element.classList.add(ACTIVE_CLASSNAME);

            return;
        }

        this._element.classList.remove(ACTIVE_CLASSNAME);
    }
}

export default StageViewPosition;