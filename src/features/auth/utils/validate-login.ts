import { MOCK_USER } from "@/features/auth/utils/auth-session";

type ValidateLoginInput = {
    email: string;
    password: string;
};

export function validateLogin({ email, password }: ValidateLoginInput) {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedEmail || !trimmedPassword) {
        return {
            isValid: false,
            error: "Email and password are required.",
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        return {
            isValid: false,
            error: "Please enter a valid email address.",
        };
    }

    if (trimmedPassword.length < 6) {
        return {
            isValid: false,
            error: "Password must be at least 6 characters.",
        };
    }

    if (
        normalizedEmail !== MOCK_USER.email ||
        trimmedPassword !== MOCK_USER.password
    ) {
        return {
            isValid: false,
            error: "Invalid email or password.",
        };
    }

    return {
        isValid: true,
        error: "",
    };
}