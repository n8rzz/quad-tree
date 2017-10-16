import StageViewController from './stage/StageViewController';

class App {
    private _onGameBoardClickHandler: (gameBoardPositionId: string, event: MouseEvent) => void = this._onClick.bind(this);

    public stageViewController: StageViewController;

    constructor() {
        this.init();
    }

    public init(): this {
        return this.setupHandlers()
            .createChildren()
            .enable();
    }

    public setupHandlers(): this {
        return this;
    }

    public createChildren(): this {
        const element: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;
        this.stageViewController = new StageViewController(element);

        return this;
    }

    public enable(): this {
        return this;
    }

    private _onClick(gameBoardPositionId: string, event: MouseEvent): void {
        console.log(gameBoardPositionId, event);
    }
}

const app = new App();
console.log(app);

