import { useEffect } from "react";
import { useLoginMutation } from "../lib/graphql/generated";
import graphqlClient from "../lib/graphql/graphqlClient";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthProvider";

export const useLogin = () => {
  const { isLoading, mutate, data } = useLoginMutation(graphqlClient);
  const {} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.login.__typename == "User") {
      localStorage.setItem("user", JSON.stringify(data.login));
      // redirect to home
      navigate("/", { replace: true });
    }
  }, [data]);

  return { login: mutate, isLoading, data };
};
