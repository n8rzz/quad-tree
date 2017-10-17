import PositionModel from '../position/PositionModel';

class GameObject extends PositionModel {
    constructor(x: number, y: number) {
        super(x, y);
    }

    public updatePosition(x: number, y: number): void {

    }
}

export default GameObject;
