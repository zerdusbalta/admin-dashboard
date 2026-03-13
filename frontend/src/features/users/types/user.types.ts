export type User = {
    id: number;
    email: string;
    role: "admin" | "editor" | "staff";
    isPrimaryAdmin: boolean;
    createdAt: string;
};

export type PaginatedUsersResponse = {
    data: User[];
};