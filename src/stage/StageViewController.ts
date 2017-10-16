import StageViewPosition from './StageViewPosition';
import  { GAME_BOARD_SIZE } from './stageConstants';

class StageViewController {
    private _$element: SVGElement;
    private _items: StageViewPosition[];
    private _onClickHandler: (event: MouseEvent) => void = this._onClick.bind(this);

    constructor($element: SVGElement) {
        this._$element = $element;
        this._items = [];

        this.init();
    }

    public init(): this {
        return this.createChildren()
            .enable();
    }

    public createChildren(): this {
        return this;
    }

    public enable(): this {
        this._createStageViewItems();

        return this;
    }

    private _createStageViewItems(): void {
        for (let i = 0; i < GAME_BOARD_SIZE.HEIGHT; i++) {
            for (let j = 0; j < GAME_BOARD_SIZE.WIDTH; j++) {
                const item: StageViewPosition = this._buildStageViewItemElement(i, j);

                this._items.push(item);
                this._$element.appendChild(item.element);
            }
        }
    }

    private _buildStageViewItemElement(heightIndex: number, widthIndex: number): StageViewPosition {
        const item = new StageViewPosition(heightIndex, widthIndex);
        item.addEventListener('click', this._onClickHandler);

        return item;
    }

    private _onClick(event: MouseEvent): void {
        const eventTarget: SVGRectElement = event.currentTarget as SVGRectElement
        const stageViewPosition: StageViewPosition = this._findItemById(eventTarget.id);

        stageViewPosition.toggleIsActive();
    }

    private _findItemById(id: string): StageViewPosition {
        return this._items.find((item) => item.id === id);
    }
}

export default StageViewController;
