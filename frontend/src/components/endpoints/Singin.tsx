import { InputHTMLAttributes, ReactElement, useState } from "react";
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

export const Singin = () => {
  const { register, isRegisterLoading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    register(form);
  }

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
      <h1 className="text-6xl text-white font-semebold">Cadastro</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md w-full rounded-md p-8 shadow-sm font-semibold text-lg text-white"
      >
        <label className="font-semibold text-lg text-white">
          Nome:
          <InputText
            required
            type="text"
            name="name"
            placeholder="Seu nome aqui"
            onChange={handleChange}
          />
        </label>
        <label className="font-semibold text-lg text-white">
          Email:
          <InputText
            required
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={handleChange}
          />
        </label>
        <label className="font-semibold text-lg text-white">
          Password:
          <InputText
            type="password"
            name="password"
            required
            placeholder="Crie uma senha"
            onChange={handleChange}
            min={4}
            max={12}
          />
        </label>
        <p className="py-4">
          Já possui cadastro?{" "}
          <a href="/login" className="text-blue-400">
            Faça login
          </a>
        </p>
        <Button type="submit" loading={isRegisterLoading}>
          Cadastrar
        </Button>
      </form>
    </div>
  );
};
