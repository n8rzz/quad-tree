interface PositionInterface {
    x: number;
    y: number;
}

class PositionModel implements PositionInterface {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default PositionModel;
