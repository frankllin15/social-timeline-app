import {
  CreateUserInput,
  LoginMutationVariables,
} from "./../../lib/graphql/generated";
import { createContext } from "react";
import { User } from "../../lib/graphql/generated";

export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (variables: LoginMutationVariables) => void;
  isLoginLoading: boolean;
  register: (input: CreateUserInput) => void;
  isRegisterLoading: boolean;
  logout: () => void;
};

const context = createContext<AuthContextType>({} as AuthContextType);

export default context;
