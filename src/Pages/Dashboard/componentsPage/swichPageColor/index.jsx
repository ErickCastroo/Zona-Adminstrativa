import React, { useState, useEffect } from "react";

function Switch() {
  const [tema, setTema] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (tema === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [tema]);

  const handlerCambiarTema = () => {
    setTema((temaInicial) => (temaInicial === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex items-center mt-2">
      <label htmlFor="switch" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="switch"
            className="sr-only"
            checked={tema === "dark"}
            onChange={handlerCambiarTema}
          />
          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
              tema === "dark" ? "transform translate-x-full" : ""
            }`}
          ></div>
        </div>
        <div className="ml-3 text-gray-300 dark:text-gray-300">
          {tema === "dark" ? "Modo Oscuro" : "Modo Claro"}
        </div>
      </label>
    </div>
  );
}

export { Switch };
