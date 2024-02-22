import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger} from "@/components/ui/navigation-menu";

//import todos los Modales del nav menu
//user

import {
  ModalUserCrear,
  ModalUserBorrar,
  ModalUserEditar, 
  ModalUserVer 
} from "@/components/Modal/Modals/ModalUsuarios";

// //intenciones
import {
  ModalCrearIntencion,
  ModalBorrarIntencion, 
  ModalEditarIntencion
} from "@/components/Modal/Modals/ModalIntenciones";


// //respuestas
import {
  ModalResCrear,
  ModalResBorrar, 
  ModalResEditar, 
  ModalResVer 
} from "@/components/Modal/Modals/ModalRespuestas/";

// //historias
import{
  ModalCrearHistorias, 
  ModalBorrarHistorias, 
  ModalEditarHistorias, 
  ModalVerHistorias
} from "@/components/Modal/Modals/ModalHistorias/";

// //pasos
import {
  ModalCrearPasos,
  ModalBorrarPasos,
  ModalEditarPasos,
  ModalVerPasos
} from "@/components/Modal/Modals/ModalPasos/";


// //entretenimiento
import {
  ModalCrearEntrenamiento,
  ModalBorrarEntrenamiento,
  ModalEditarEntrenamiento,
  ModalVerEntrenamiento
} from "@/components/Modal/Modals/ModalEntrenamiento/";

// //reglas
import {
  ModalCrearPasosR,
  ModalBorrarPasosR,
  ModalEditarPasosR,
  ModalVerPasosR
} from "@/components/Modal/Modals/ModalPasosReglas/";


// //pasos reglas
import {
  ModalCrearReglas,
  ModalBorrarReglas,
  ModalEditarReglas,
  ModalVerReglas
} from "@/components/Modal/Modals/ModalReglas/";






const rutas = [
  {
    nombre: 'Usuarios',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserEditar closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserBorrar closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserVer closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Intenciones',
    modalCrear: (setModalVisible) => <ModalCrearIntencion closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalEditarIntencion closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarIntencion closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Respuestas',
    modalCrear: (setModalVisible) => <ModalResCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalResEditar closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalResBorrar closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalResVer closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Historias',
    modalCrear: (setModalVisible) => <ModalCrearHistorias closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalEditarHistorias closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarHistorias closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalVerHistorias closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Pasos',
    modalCrear: (setModalVisible) => <ModalCrearPasos closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalEditarPasos closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarPasos closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalVerPasos closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Entretenimiento',
    modalCrear: (setModalVisible) => <ModalCrearEntrenamiento closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalEditarEntrenamiento closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarEntrenamiento closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalVerEntrenamiento closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Reglas',
    modalCrear: (setModalVisible) => <ModalCrearReglas closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalEditarReglas closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarReglas closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalVerReglas closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Pasos Reglas ',
    modalCrear: (setModalVisible) => <ModalCrearPasosR closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalEditarPasosR closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarPasosR closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalVerPasosR closeModal={() => setModalVisible(false)} />,
  },
];

const component = ({ nombre, openModal, setModalVisible, modalBorrar = undefined, modalCrear = undefined, modalEditar = undefined, modalVer = undefined}) => [
  {
    title: `Crear ${nombre}`,
    onClick: modalCrear ? () => openModal(modalCrear(setModalVisible)) : undefined,
    description: `Crear una nueva ${nombre}`,
  },
  {
    title: `Borrar ${nombre}`,
    onClick: modalBorrar ? () => openModal(modalBorrar(setModalVisible)) : undefined,
    description: `Borrar una ${nombre}`,
  },
  {
    title: `Editar ${nombre}`,
    onClick: modalEditar ? () => openModal(modalEditar(setModalVisible)) : undefined,
    description: `Editar una ${nombre}`,
  },
  {
    title: `Ver ${nombre}`,
    onClick: modalVer ? () => openModal(modalVer(setModalVisible)) : undefined,
    description: `Ver una ${nombre}`,
  },
];

function NavMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };


  return (
    <div>
      {modalVisible && modalContent}
      
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
                  {component({ nombre: ruta.nombre, openModal, setModalVisible, setModalContent, modalCrear: ruta?.modalCrear, modalBorrar: ruta?.modalBorrar, modalEditar: ruta?.modalEditar, modalVer: ruta?.modalVer  }).map((component, index) => (
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
    </div>
  );
}

const ListItem = React.forwardRef(({ title, onClick, children, ...props }, ref) => (
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
));

ListItem.displayName = "ListItem";

export { NavMenu };
