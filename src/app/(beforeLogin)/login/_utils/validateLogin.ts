import { LoginRequest } from "@/hooks/useAuth";

export default function validateLogin(
  loginData: LoginRequest,
  isPending: boolean
): boolean {
  const isEmptyFields = !loginData.email.trim() || !loginData.password.trim();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email);

  const isValidPassword = loginData.password.length >= 6;

  return isPending || isEmptyFields || !isValidEmail || !isValidPassword;
}
