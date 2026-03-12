import { paginateItems } from "./paginate";

describe("paginateItems", () => {
    it("returns the first page items correctly", () => {
        const items = [1, 2, 3, 4, 5, 6];

        const result = paginateItems(items, 1, 2);

        expect(result).toEqual([1, 2]);
    });

    it("returns the second page items correctly", () => {
        const items = [1, 2, 3, 4, 5, 6];

        const result = paginateItems(items, 2, 2);

        expect(result).toEqual([3, 4]);
    });

    it("returns remaining items for the last page", () => {
        const items = [1, 2, 3, 4, 5];

        const result = paginateItems(items, 3, 2);

        expect(result).toEqual([5]);
    });

    it("returns an empty array when page exceeds range", () => {
        const items = [1, 2, 3];

        const result = paginateItems(items, 5, 2);

        expect(result).toEqual([]);
    });
});