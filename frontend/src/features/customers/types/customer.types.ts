export type CustomerStatus = "active" | "inactive";

export type Customer = {
    id: string;
    name: string;
    email: string;
    company: string;
    phone: string;
    status: CustomerStatus;
    createdAt: string;
};