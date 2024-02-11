// Importar React desde la biblioteca React
import React from "react";
// Importar la función cn desde el archivo "@/lib/utils"
import { cn } from "@/lib/utils";
// Importar componentes del archivo "@/components/ui/navigation-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

  const rutas = [ 
    {
      nombre: 'Usuarios',
    },
    {
      nombre: 'Intenciones',
    },
    {
      nombre: 'Respuestas',
    },
    {
      nombre: 'Historias',
    },
    {
      nombre: 'Pasos',
    },
    {
      nombre: 'Entretenimiento',
    },
    {
      nombre: 'Reglas',
    },
    {
      nombre: 'Pasos Reglas ',
    },
  ]
  
  // Array de objetos que representan los componentes con sus detalles
  const component = ({nombre}) => { 
    return [
      {
        title:`Crear ${nombre}`,
        href: "/docs/primitives/alert-dialog",
        description:`Crear una nueva ${nombre}`,
      },
      {
        title:`Borrar ${nombre}`,
        href: "/docs/primitives/hover-card",
        description:`Borrar una ${nombre}`,
      },
      {
        title:`Editar ${nombre}`,
        href: "/docs/primitives/progress",
        description:`Editar una ${nombre}`,
      },
      {
        title:`Ver ${nombre}`,
        href: "/docs/primitives/scroll-area",
        description: `Ver una ${nombre}`,
      },
    ];
  }


// Función principal que representa el menú de navegación
function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {rutas?.map((ruta) => (
          <NavigationMenuItem key={ruta.nombre} className="text-slate-900 dark:text-slate-200">
            <NavigationMenuTrigger>{ruta.nombre}</NavigationMenuTrigger>
            {/* Contenido del primer elemento del menú */}
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {/* Primer elemento de contenido */}
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    {/* Enlace y contenido del primer elemento */}
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:text-slate-200"
                      
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">{ruta.nombre}</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {`Opciones de ${ruta.nombre}`}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {component({nombre: ruta.nombre}).map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
    
  );
}

// Componente funcional ListItem, utilizado dentro de NavMenu
const ListItem = React.forwardRef(
  // Recibe propiedades y una referencia como argumentos
  ({ className, title, children, ...props }, ref) => {
    return (
      // Elemento de lista
      <li>
        {/* Enlace dentro de NavigationMenuLink */}
        <NavigationMenuLink asChild>
          <a
            // Aplicar clases de estilo dinámicamente usando cn
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            // Propiedades adicionales se aplican usando {...props}
            {...props}
          >
            {/* Contenido del ListItem */}
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

// Establecer un nombre para el componente ListItem
ListItem.displayName = "ListItem";

// Exportar el componente NavMenu y ListItem
export { NavMenu };