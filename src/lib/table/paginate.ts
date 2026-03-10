export function paginateItems<T>(items: T[], currentPage: number, pageSize: number) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return items.slice(startIndex, endIndex);
}