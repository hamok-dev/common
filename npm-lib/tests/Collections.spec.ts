import * as Collections from "../src/Collections";
describe("Collections", () => {
    describe("unmodifiableMap", () => {
        const subject = Collections.unmodifiableMap<number, string>(
            new Map<number, string>([[1, "one"]])
        );
        it("When map::delete() is called Then it throws exception", () => {
            expect(() => subject.delete(1)).toThrowError()
        });

        it("When map::set() is called Then it throws exception", () => {
            expect(() => subject.set(2, "two")).toThrowError()
        });

        it("When map::clear() is called Then it throws exception", () => {
            expect(() => subject.clear()).toThrowError()
        });
    });

    describe("unmodifiableMap", () => {
        const subject = Collections.unmodifiableSet<number>(
            new Set<number>([1, 2, 3])
        );
        it("When set::delete() is called Then it throws exception", () => {
            expect(() => subject.delete(1)).toThrowError()
        });

        it("When set::add() is called Then it throws exception", () => {
            expect(() => subject.add(2)).toThrowError()
        });

        it("When set::clear() is called Then it throws exception", () => {
            expect(() => subject.clear()).toThrowError()
        });
    });

    describe("equalSets", () => {
        it("When set(1, 2) and set(1) are compared Then it return false", () => {
            expect(Collections.equalSets<number>(
                new Set<number>([1, 2]),
                new Set<number>([1]),
            )).toBe(false);
        });

        it("When set(1) and set(1, 2) are compared Then it return false", () => {
            expect(Collections.equalSets<number>(
                new Set<number>([1]),
                new Set<number>([1, 2]),
            )).toBe(false);
        });

        it("When set(1, 2) and set(1, 2) are compared Then it return true", () => {
            expect(Collections.equalSets<number>(
                new Set<number>([1, 2]),
                new Set<number>([1, 2]),
            )).toBe(true);
        });

        it("When set(1, 2) and set(1, 2) and set(1) are compared Then it return false", () => {
            expect(Collections.equalSets<number>(
                new Set<number>([1, 2]),
                new Set<number>([1, 2]),
                new Set<number>([1]),
            )).toBe(false);
        });

        it("When set(1, 2) and set(1, 2) and set(1, 2) are compared Then it return true", () => {
            expect(Collections.equalSets<number>(
                new Set<number>([1, 2]),
                new Set<number>([1, 2]),
                new Set<number>([1, 2]),
            )).toBe(true);
        });

    });
});