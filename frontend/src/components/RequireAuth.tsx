import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthProvider";

// Redireciona para a página de login se required for igual a true e o usuário não estiver logado;
// Redireciona para a página home se required for igual a false e o usuário estiver logado;
export const RequireAuth = ({
  children,
  redirect = "/login",
  required = true,
}: {
  children: JSX.Element;
  required?: boolean;
  redirect?: string;
}) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (required ? !isLoggedIn : isLoggedIn) {
      navigate(redirect, { replace: true, state: { from: location } });
    }
  }, [isLoggedIn]);

  return children;
};
