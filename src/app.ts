import GamePieceModel from './GamePieceModel';

class App {
    public gamePieceCollection: GamePieceModel[];

    constructor() {
        this.init();
    }

    public init(): void {
        this.gamePieceCollection = [
            new GamePieceModel(),
            new GamePieceModel(),
        ]
    }
}

const app = new App();
console.log(app);

