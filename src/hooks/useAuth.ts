import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    function onStorage() {
      setToken(localStorage.getItem("token"));
    }

    window.addEventListener("auth-change", onStorage);
    return () => window.removeEventListener("auth-change", onStorage);
  }, []);

  const login = (user: string, pass: string) => {
    if (user === "admin" && pass === "123") {
      const fakeToken = "fake-jwt-token";
      localStorage.setItem("token", fakeToken);

      window.dispatchEvent(new Event("auth-change"));

      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("auth-change"));
  };

  const isAuthenticated = !!token;

  return { token, login, logout, isAuthenticated };
}
