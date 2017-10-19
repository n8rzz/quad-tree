class Rectangle {
    public x: number = -1;
    public y: number = -1;
    public width: number = -1;
    public height: number = -1;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get halfWidth(): number {
        return this.width / 2
    };

    get halfHeight(): number {
        return this.height / 2
    };

    get horizontalMidpoint(): number {
        return this.x + this.halfWidth;
    }

    get verticalMidpoint(): number {
        return this.y + this.halfHeight;
    }

    destroy(): void {
        this.x = -1;
        this.y = -1;
        this.width = -1;
        this.height = -1;
    }
}

export default Rectangle;
