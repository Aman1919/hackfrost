import React from "react";
import { useEffect } from "react";
import { useAuthStore } from "../store";
import { authenticateUser } from "../fetch/auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser,setLoading } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    console.log('fetching')

    if (token) {
      authenticateUser(token)
        .then((data) => {
          setUser(data.user, token);
        })
        .catch((err) => {
          console.error("Authentication failed", err);
          clearUser();
        });
    } else {
      clearUser();
    }
    setLoading(false);

  }, [setUser, clearUser]);

  return <>{children}</>;
};

export default AuthWrapper;
