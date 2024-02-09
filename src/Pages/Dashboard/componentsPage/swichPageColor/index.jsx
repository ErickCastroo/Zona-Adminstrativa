import React, { useState, useEffect } from "react";

function Switch() {
  const [tema, setTema] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (tema === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [tema]);

  const handlercambiarTema = () => {
    setTema((temaInicial) => (temaInicial === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <button
        className={`
    mt-2 px-4 py-2 flex items-center rounded-full dark:bg-slate-800 dark:text-slate-200  transition-colors focus:outline-none focus:ring focus:border-primary
    ${
      tema === "dark"
        ? "bg-primary text-neutral-200 active:bg-neutral-200 active:text-neutral-900"
        : "bg-neutral-200 text-neutral-900 active:bg-primary active:text-neutral-200"
    }
  `}
        onClick={handlercambiarTema}
      >
        <span className="flex-1">
          {tema === "dark" ? "Modo Oscuro" : "Modo Claro"}
        </span>
      </button>
    </div>
  );
}

export { Switch };
