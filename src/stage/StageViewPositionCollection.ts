import StageViewPosition from './StageViewPosition';

interface Collection {
    items: StageViewPosition[];
    length: number;
    addItem: (item: StageViewPosition) => void;
    findItemById: (itemId: string) => StageViewPosition;
}

class StageViewPositionCollection implements Collection {
    public items: StageViewPosition[] = [];

    get length() {
        return this.items.length;
    }

    addItem(item: StageViewPosition): void {
        this.items.push(item);
    }

    findItemById(itemId: string): StageViewPosition {
        return this.items.find((item) => item.id === itemId);
    }
}

export default StageViewPositionCollection;
