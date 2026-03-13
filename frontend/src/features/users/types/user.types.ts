export type User = {
    id: number;
    email: string;
    role: "admin" | "editor" | "staff";
    createdAt: string;
};

export type PaginatedUsersResponse = {
    data: User[];
};