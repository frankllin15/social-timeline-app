import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "dark";
  // color?: "primary" | "secondary";
};

const variants = {
  primary: "bg-blue-500 hover:bg-blue-700",
  dark: "bg-zinc-900 hover:bg-zinc-800",
};

export const Button = ({
  children,
  className,
  onClick,
  type = "button",
  color,
  loading,
  variant = "primary",
  ...props
}: Props) => {
  return (
    <button
      className={`${className} ${variants[variant]} 
       bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-12`}
      onClick={onClick}
      disabled={loading}
      type={type}
      {...props}
    >
      {loading ? "Carregando" : children}
    </button>
  );
};
