import { InputHTMLAttributes, ReactElement, useEffect, useState } from "react";
import { useLoginMutation } from "../../lib/graphql/generated";
import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../context/Auth/AuthProvider";
import { Button } from "../ui/Button";

const InputText: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...props
}) => (
  <input
    {...props}
    className="bg-white text-black rounded-md py-2 px-2 text-lg w-full font-normal"
  />
);

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { user, login, isLoginLoading } = useAuth();

  function handleSubmit(e: any) {
    e.preventDefault();
    login(form);
  }

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
      <h1 className="text-6xl text-white font-semebold">Faça login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md w-full rounded-md p-8 shadow-sm font-semibold text-lg text-white"
      >
        <label className="">
          Email:
          <InputText
            onChange={handleChange}
            required
            type="email"
            name="email"
            placeholder="Digite seu email"
            autoComplete="email"
          />
        </label>
        <label className="font-semibold text-lg text-white">
          Password:
          <InputText
            onChange={handleChange}
            required
            type="password"
            name="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
          />
        </label>
        <p className="py-4">
          Ainda não possui cadastro?{" "}
          <a href="singin" className="text-blue-400">
            Crie aqui
          </a>
        </p>
        <Button
          loading={isLoginLoading}
          type="submit"
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Entrar
          {/* Login */}
        </Button>
      </form>
    </div>
  );
};
