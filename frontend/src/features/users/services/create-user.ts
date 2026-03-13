import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

type CreateUserInput = {
    email: string;
    password: string;
    role: "admin" | "editor" | "staff";
};

export async function createUser(input: CreateUserInput) {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create user.");
    }

    return data;
}