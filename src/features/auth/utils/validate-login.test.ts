import { validateLogin } from "@/features/auth/utils/validate-login";

describe("validateLogin", () => {
    it("returns error when email is empty", () => {
        expect(validateLogin({ email: "", password: "123456" })).toEqual({
            isValid: false,
            error: "Email and password are required.",
        });
    });

    it("returns error when password is empty", () => {
        expect(validateLogin({ email: "admin@example.com", password: "" })).toEqual(
            {
                isValid: false,
                error: "Email and password are required.",
            }
        );
    });

    it("returns error for invalid email format", () => {
        expect(validateLogin({ email: "adminexample.com", password: "123456" })).toEqual(
            {
                isValid: false,
                error: "Please enter a valid email address.",
            }
        );
    });

    it("returns error for short password", () => {
        expect(validateLogin({ email: "admin@example.com", password: "123" })).toEqual(
            {
                isValid: false,
                error: "Password must be at least 6 characters.",
            }
        );
    });

    it("returns error for wrong credentials", () => {
        expect(validateLogin({ email: "wrong@example.com", password: "123456" })).toEqual(
            {
                isValid: false,
                error: "Invalid email or password.",
            }
        );
    });

    it("returns success for valid credentials", () => {
        expect(
            validateLogin({
                email: "admin@example.com",
                password: "123456",
            })
        ).toEqual({
            isValid: true,
            error: "",
        });
    });

    it("normalizes email before validation", () => {
        expect(
            validateLogin({
                email: " ADMIN@EXAMPLE.COM ",
                password: "123456",
            })
        ).toEqual({
            isValid: true,
            error: "",
        });
    });
});