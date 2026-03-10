import type { UserProfile } from "@/features/auth/types/auth.types";

export const mockProfile: UserProfile = {
    id: "user_001",
    fullName: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    department: "Operations",
    joinedAt: "2024-11-01",
    avatarUrl: "/avatar.jpeg",
};