import { PositionInterface } from './position.interface';

class PositionModel implements PositionInterface {
    public x: number;
    public y: number;
    public z: number;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

export default PositionModel;
