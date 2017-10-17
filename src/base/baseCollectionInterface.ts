export interface IBaseCollection<T> {
    id: number;
    items: T[];
    length?: number;
    addItem: (item: T) => void;
    findItemById: (id: string) => void;
    hasItem: (item: T) => boolean;
    removeItemById: (id: string) => void;
}
