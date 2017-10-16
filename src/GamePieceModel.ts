import PositionModel from './position/PositionModel';

let _ID = 0;

class GamePieceModel extends PositionModel {
    public id: number;

    constructor() {
        super();

        this.id = _ID++;
    }

    updatePosition(): void {}
}

export default GamePieceModel;
