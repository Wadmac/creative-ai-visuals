/**
 * Auth stub — the portfolio is a public site and does not require
 * user authentication or a Convex backend. This hook returns a
 * stable no-op object so existing consumers compile without changes.
 */
export function useAuth() {
  return {
    isLoading: false as const,
    isAuthenticated: false as const,
    user: null,
    signIn: async () => {},
    signOut: async () => {},
  };
}
