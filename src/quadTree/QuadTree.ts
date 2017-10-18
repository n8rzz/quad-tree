import Rectangle from './Rectangle';

enum NODE_POSITION {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

class QuadTreeNode {
    public bounds: Rectangle = null;
    public children: any[] = [];
    public nodes: any[] = [];
    public maxChildren: number = 4;
    public maxDepth: number = 4;
    public depth: number = 0;

    constructor(bounds: Rectangle, depth: number, maxDepth: number, maxChildren: number) {
        this.bounds = bounds;

        if (maxChildren) {
            this.maxChildren = maxChildren;
        }

        if (maxDepth) {
            this.maxDepth = maxDepth;
        }

        if (depth) {
            this.depth = depth;
        }
    }

    clear(): void {
        this.children.length = 0;

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    }

    findIndex(item: any): number {
        let index = NODE_POSITION.TOP_LEFT;

        if (this.bounds.isLeftQuad() && this.bounds.isBottomQuad()) {
            index = NODE_POSITION.BOTTOM_LEFT;
        } else if (this.bounds.isTopQuad()) {
            index = NODE_POSITION.TOP_RIGHT;
        } else {
            index = NODE_POSITION.BOTTOM_RIGHT;
        }

        return index;
    }

    insert(item: any): void {
        if (this.nodes.length) {
            const index = this.findIndex(item);

            this.nodes[index].insert(item);

            return;
        }

        this.children.push(item);

        if (!(this.depth >= this.maxDepth) && this.children.length > this.maxChildren) {
            this.subdivide();

            for (let i = 0; i < this.children.length; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    }

    retrieve(item: any): any[] {
        if (this.nodes.length) {
            const index = this.findIndex(item);

            return this.nodes[index].retrieve(item);
        }

        return this.children;
    }

    subdivide(): void {
        const nextDepth = this.depth + 1;

        this.nodes[NODE_POSITION.TOP_LEFT] = new QuadTreeNode(
            new Rectangle(
                this.bounds.subWidth,
                this.bounds.subHeight,
                this.bounds.x + this.bounds.subWidth,
                this.bounds.y + this.bounds.subHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );

        this.nodes[NODE_POSITION.TOP_RIGHT] = new QuadTreeNode(
            new Rectangle(
                this.bounds.x + this.bounds.subWidth,
                this.bounds.y,
                this.bounds.subWidth,
                this.bounds.subHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );

        this.nodes[NODE_POSITION.BOTTOM_LEFT] = new QuadTreeNode(
            new Rectangle(
                this.bounds.x,
                this.bounds.y + this.bounds.subHeight,
                this.bounds.subWidth,
                this.bounds.subHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );

        this.nodes[NODE_POSITION.BOTTOM_RIGHT] = new QuadTreeNode(
            new Rectangle(
                this.bounds.x + this.bounds.subWidth,
                this.bounds.y + this.bounds.subHeight,
                this.bounds.subWidth,
                this.bounds.subHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );
    }
}

class QuadTree {
    public root: QuadTreeNode = null;

    constructor(bounds: Rectangle, maxDepth: number, maxChildren: number) {
        this.root = new QuadTreeNode(bounds, 0, maxDepth, maxChildren);
    }

    clear(): void {
        this.root.clear();
    }

    insert(itemOrList: any[]|any): void {
        if (!(itemOrList instanceof Array)) {
            this.root.insert(itemOrList);

            return;
        }

        for (let i = 0; i < itemOrList.length; i++) {
            this.root.insert(itemOrList[i]);
        }
    }

    retrieve(item: any): any[] {
        const items: any[] = this.root.retrieve(item).slice(0)

        return items;
    }
}

export default QuadTree;
