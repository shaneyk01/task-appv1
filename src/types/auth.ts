export interface User {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithRedirect: () => void;
  logout: (options?: { returnTo?: string }) => void;
}
