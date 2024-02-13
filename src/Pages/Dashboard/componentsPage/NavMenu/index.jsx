import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModalUser } from '@/components/Modal/Modals/ModalUser';

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
];

const component = ({ nombre, openModal, setModalVisible, setModalContent }) => {
  return [
    {
      title: `Crear ${nombre}`,
      onClick: () => openModal(<ModalUser closeModal={() => setModalVisible(false)} />),
      description: `Crear una nueva ${nombre}`,
    },
    {
      title: `Borrar ${nombre}`,
      onClick: () => openModal(<ModalUser closeModal={() => setModalVisible(false)} />),
      description: `Borrar una ${nombre}`,
    },
    {
      title: `Editar ${nombre}`,
      onClick: () => openModal(<ModalUser closeModal={() => setModalVisible(false)} />),
      description: `Editar una ${nombre}`,
    },
    {
      title: `Ver ${nombre}`,
      onClick: () => openModal(<ModalUser closeModal={() => setModalVisible(false)} />),
      description: `Ver una ${nombre}`,
    },
  ];
};

function NavMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          {rutas?.map((ruta) => (
            <NavigationMenuItem key={ruta.nombre} className="text-slate-900 dark:text-slate-200">
              <NavigationMenuTrigger className='dark:bg-slate-800'>{ruta.nombre}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
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
                  {component({ nombre: ruta.nombre, openModal, setModalVisible, setModalContent }).map((component, index) => (
                    <ListItem
                      key={index}
                      title={component.title}
                      onClick={component.onClick}
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

      {modalVisible && (
        <div>
          {modalContent}
        </div>
      )}
    </div>
  );
}

const ListItem = React.forwardRef(({ title, onClick, children, ...props }, ref) => {
  return (
    <li>
      <a
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        )}
        onClick={onClick}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});

ListItem.displayName = "ListItem";

export { NavMenu };
