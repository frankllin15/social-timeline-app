import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full text-white bg-zinc-900  p-4 md:px-12 lg:px-20">
      {/* <div> */}
      <p className="text-end">
        © {new Date().getFullYear()}, Developed whith{" "}
        <span className="text-red-600">&#9829;</span> by{" "}
        <a
          className="font-semibold"
          target="__blank"
          href="https://github.com/frankllin15"
        >
          Frankllin
        </a>
      </p>
      {/* </div> */}
    </footer>
  );
};
