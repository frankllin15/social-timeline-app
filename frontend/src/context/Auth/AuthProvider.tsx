import { useContext, useEffect, useState } from "react";
import {
  CreateUserInput,
  useCreateUserMutation,
  useLoginMutation,
  User,
} from "../../lib/graphql/generated";
import AuthContext from "./AuthContext";
import graphqlClient from "../../lib/graphql/graphqlClient";

export type LoginInput = {
  email: string;
  password: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    isLoading: isLoginLoading,
    mutate: login,
    data: loginData,
    reset: resetLogin,
  } = useLoginMutation(graphqlClient);
  const { mutate: createUser, isLoading: isRegisterLoading } =
    useCreateUserMutation(graphqlClient);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id && user.email) {
      setUser(JSON.parse(localStorage.getItem("user")!));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loginData?.login.__typename == "User") {
      setUser(loginData.login);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(loginData.login));
    }
  }, [loginData]);

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    resetLogin();
  };

  const register = (input: CreateUserInput) => {
    createUser(
      { input },
      {
        onSuccess(data) {
          if (data.createUser.__typename == "User") {
            setUser(data.createUser);
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(data.createUser));
          }
        },
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        isLoginLoading,
        user,
        isLoggedIn,
        logout,
        register,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
