import type { User } from "../../../types/User";

export const getUserFromLocal = () => {
  const user: User | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
  return user;
}