class Rectangle {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;

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

    get subWidth(): number {
        return this.width / 2
    };

    get subHeight(): number {
        return this.height / 2
    };

    get horizontalMidpoint(): number {
        return this.x + this.subWidth;
    }

    get verticalMidpoint(): number {
        return this.y + this.subHeight;
    }

    public isTopQuad(): boolean {
        return this.y < this.horizontalMidpoint &&
            this.y + this.height < this.horizontalMidpoint;
    }

    public isBottomQuad(): boolean {
        return this.y > this.horizontalMidpoint;
    }

    public isLeftQuad(): boolean {
        return this.x < this.verticalMidpoint &&
            this.x + this.width < this.verticalMidpoint;
    }

    public isRightQuad(): boolean {
        return this.x > this.verticalMidpoint;
    }
}

export default Rectangle;
