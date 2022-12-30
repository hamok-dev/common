export function unmodifiableMap<K, V>(map: Map<K, V>): Map<K, V> {
    const result = new class implements Map<K, V> {
        
        public clear(): void {
            throw new Error("Unsupported Operation clear() on a map wrapped to be immutable");
        }
        
        public delete(key: K): boolean {
            throw new Error("Unsupported Operation delete() on a map wrapped to be immutable");
        }
        
        public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
            map.forEach(callbackfn);
        }
        
        public get(key: K): V | undefined {
            return map.get(key);
        }
        
        public has(key: K): boolean {
            return map.has(key);
        }
        
        public set(key: K, value: V): this {
            throw new Error("Unsupported Operation set() on a map wrapped to be immutable");
        }
        
        public get size(): number {
            return map.size;
        }

        public entries(): IterableIterator<[K, V]> {
            return map.entries();
        }
        
        public keys(): IterableIterator<K> {
            return map.keys();
        }
        
        public values(): IterableIterator<V> {
            return map.values();
        }
        
        public [Symbol.iterator](): IterableIterator<[K, V]> {
            return map.entries();
        }

        public get [Symbol.toStringTag](): string  {
            return map[Symbol.toStringTag];
        }
    }
    return result;
}

export const EMPTY_MAP = unmodifiableMap(new Map<any, any>());
export function emptyMap<K, V>(): Map<K, V> {
    return EMPTY_MAP as Map<K, V>;
}


export function unmodifiableSet<T>(set: Set<T>): Set<T> {
    const result: Set<T> = new class implements Set<T> {
        public add(value: T): this {
            throw new Error("Unsupported Operation add() on a set wrapped to be immutable");
        }

        public clear(): void {
            throw new Error("Unsupported Operation add() on a set wrapped to be immutable");
        }

        public delete(value: T): boolean {
            throw new Error("Unsupported Operation add() on a set wrapped to be immutable");
        }

        public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
            set.forEach(callbackfn);
        }

        public has(value: T): boolean {
            throw new Error("Method not implemented.");
        }
        public get size(): number {
            return set.size;
        }

        public [Symbol.iterator](): IterableIterator<T> {
            return set[Symbol.iterator]();
        }

        entries(): IterableIterator<[T, T]> {
            return set.entries();
        }

        keys(): IterableIterator<T> {
            return set.keys();
        }

        values(): IterableIterator<T> {
            return set.values();
        }

        public get [Symbol.toStringTag](): string  {
            return set[Symbol.toStringTag];
        }
    }
    return result;
}

export const EMPTY_SET = unmodifiableSet(new Set<any>());
export function emptySet<T>(): Set<T> {
    return EMPTY_SET as Set<T>;
}

export function equalSets<T>(setA: ReadonlySet<T>, ...sets: ReadonlySet<T>[]): boolean {
    if (sets.length < 1) return true;
    const setB = sets[0];
    for (const item of setA) {
        if (!setB.has(item)) return false;
    }
    for (const item of setB) {
        if (!setA.has(item)) return false;
    }
    return equalSets<T>(setB, ...sets.slice(1));
}
