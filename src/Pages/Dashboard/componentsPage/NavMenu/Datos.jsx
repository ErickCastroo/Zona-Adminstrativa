// Definir el componente funcional fuera de la función Datos
const componente = ({ nombre }) => {
  return [
    {
      title: `Crear ${nombre}`,
      href: "/docs/primitives/alert-dialog",
      description: "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: `Borrar ${nombre}`,
      href: "/docs/primitives/hover-card",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: `Editar ${nombre}`,
      href: "/docs/primitives/progress",
      description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: `Ver ${nombre}`,
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
  ];
};

function Datos() {
  const rutas = [
    { nombre: 'Usuarios' },
    { nombre: 'Intenciones' },
    // ... (resto del código)
  ];

  return (
    <div>
      <NavMenu component={componente} rutas={rutas} />
    </div>
  );
}

export { Datos };
