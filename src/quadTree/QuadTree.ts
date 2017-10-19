import Rectangle from './Rectangle';
import GameObject from '../gameObject/GameObject';
import QuadTreeNode from './QuadTreeNode';

class QuadTree {
    public root: QuadTreeNode = null;

    constructor(bounds: Rectangle, maxDepth: number, maxChildren: number) {
        this.root = new QuadTreeNode(bounds, 0, maxDepth, maxChildren);
    }

    clear(): void {
        this.root.clear();
    }

    insert(itemOrList: GameObject | GameObject[]): void {
        if (!(itemOrList instanceof Array)) {
            this.root.insert(itemOrList);

            return;
        }

        for (let i = 0; i < itemOrList.length; i++) {
            this.root.insert(itemOrList[i]);
        }
    }

    retrieve(item: GameObject): QuadTreeNode[] | GameObject[] {
        return this.root.retrieve(item).slice(0);
    }
}

export default QuadTree;
