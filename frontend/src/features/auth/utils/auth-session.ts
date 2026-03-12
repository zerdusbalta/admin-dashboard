export const AUTH_COOKIE_NAME = "admin-dashboard-session";

export const MOCK_USER = {
    email: "admin@example.com",
    password: "123456",
};

export const PAGE_TITLES: Record<string, { title: string; description: string }> = {
    "/": {
        title: "Dashboard",
        description: "Manage customers, orders and invoices",
    },
    "/customers": {
        title: "Customers",
        description: "View and manage your customer list",
    },
    "/orders": {
        title: "Orders",
        description: "View and manage customer orders",
    },
    "/invoices": {
        title: "Invoices",
        description: "View and manage invoice records",
    },
    "/profile": {
        title: "Profile",
        description: "View your account information and role details",
    },
};