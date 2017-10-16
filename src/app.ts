import StageViewController from './stage/StageViewController';

class App {
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
}

const app = new App();
console.log(app);

