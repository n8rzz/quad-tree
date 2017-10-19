import Rectangle from './Rectangle';
import GameObject from '../gameObject/GameObject';
import QuadTreeNode from './QuadTreeNode';

class QuadTree {
    public root: QuadTreeNode = null;

    constructor(bounds: Rectangle, maxDepth: number, maxChildren: number) {
        this.root = new QuadTreeNode(bounds, 0, maxDepth, maxChildren);
    }

    public clear(): void {
        this.root.clear();
    }

    public insert(itemOrList: GameObject | GameObject[]): void {
        if (itemOrList instanceof Array) {
            this._insertItemlist(itemOrList);

            return;
        }

        this.root.insert(itemOrList);
    }

    public retrieve(item: GameObject): QuadTreeNode[] | GameObject[] {
        return this.root.retrieve(item).slice(0);
    }

    private _insertItemlist(itemList: GameObject[]): void {
        for (let i = 0; i < itemList.length; i++) {
            this.root.insert(itemList[i]);
        }
    }
}

export default QuadTree;
