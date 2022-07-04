import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthProvider";
import { LogoutIcon } from "../icons/LogoutIcon";
import { Button } from "./Button";

export const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header className="flex justify-between h-16  items-center px-4 w-full  md:px-12 lg:px-20 bg-blue-500">
      <Link to="/">
        <span className="text-2xl text-white md:text-3xl font-bold">
          Social Timeline
        </span>
      </Link>
      {/* <nav>
        <ul className="flex items-center gap-4 h-16 text-white font-semibold">
          <li>
            <Link to="/">Inicio</Link>
          </li>
        </ul>
      </nav> */}
      <div>
        {isLoggedIn && (
          <button
            className="py-2 px-3    text-white hover:text-neutral-300 font-semibold"
            onClick={logout}
          >
            <i className="flex items-center gap-2">
              Sair
              <LogoutIcon className="h-7" />
            </i>
          </button>
        )}
      </div>
    </header>
  );
};
