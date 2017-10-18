import GameObject from './GameObject';
import { IBaseCollection } from '../base/baseCollectionInterface';

let _id = 0;

class GameObjectCollection implements IBaseCollection<GameObject> {
    public id: number = _id++;
    public items: GameObject[] = [];

    get length(): number {
        return this.items.length;
    }

    public addItem(item: GameObject): void {
        this.items.push(item);
    }

    public findItemById(id: string): GameObject {
        return null;
    }

    public hasItem(item: GameObject): boolean {
        return this.items.indexOf(item) !== -1;
    }

    public removeItemById(id: string): void {

    }

    public sortByIsColliding(): void {
        this.items.sort((a: GameObject, b: GameObject) => {
            return a.isColliding
                ? -1
                : 1;
        });
    }
}

export default GameObjectCollection;
