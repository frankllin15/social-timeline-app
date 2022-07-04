import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateUserInput,
  useCreateUserMutation,
} from "../lib/graphql/generated";
import graphqlClient from "../lib/graphql/graphqlClient";

export const useSingin = () => {
  const { isLoading, mutate, data } = useCreateUserMutation(graphqlClient);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.createUser.__typename == "User") {
      localStorage.setItem("user", JSON.stringify(data.createUser));
      // redirect to home
      navigate("/", { replace: true });
    }
  }, [data]);
  return {
    singin: (input: CreateUserInput) => mutate({ input }),
    isLoading,
    data,
  };
};
