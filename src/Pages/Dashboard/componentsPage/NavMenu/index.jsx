import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger} from "@/components/ui/navigation-menu";

//import todos los Modales del nav menu
//user
import { ModalUserCrear } from "@/components/Modal/Modals/ModalUsuarios/ModalCrear";
// import { ModalUserCrear } from "@/components/Modal/Modals/ModalUsuarios/ModalBorrar";
// import { ModalUserCrear } from "@/components/Modal/Modals/ModalUsuarios/ModalEditar";
// import { ModalUserCrear } from "@/components/Modal/Modals/ModalUsuarios/ModalVer";

// //intenciones
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalIntenciones/ModalCrear";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalIntenciones/ModalBorrar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalIntenciones/ModalEditar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalIntenciones/ModalVer";

// //respuestas
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalRespuestas/ModalCrear";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalRespuestas/ModalBorrar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalRespuestas/ModalEditar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalRespuestas/ModalVer";

// //historias
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalHistorias/ModalCrear";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalHistorias/ModalBorrar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalHistorias/ModalEditar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalHistorias/ModalVer";

// //pasos
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasos/ModalCrear";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasos/ModalBorrar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasos/ModalEditar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasos/ModalVer";

// //entretenimiento
// import { ModalTraining } from "@/components/Modal/Modals/ModalEntretenimiento/ModalCrear";
// import { ModalTraining } from "@/components/Modal/Modals/ModalEntretenimiento/ModalBorrar";
// import { ModalTraining } from "@/components/Modal/Modals/ModalEntretenimiento/ModalEditar";
// import { ModalTraining } from "@/components/Modal/Modals/ModalEntretenimiento/ModalVer";

// //reglas
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalReglas/ModalCrear";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalReglas/ModalBorrar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalReglas/ModalEditar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalReglas/ModalVer";

// //pasos reglas
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasosReglas/ModalCrear";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasosReglas/ModalBorrar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasosReglas/ModalEditar";
// import { ModalBorrarUser } from "@/components/Modal/Modals/ModalPasosReglas/ModalVer";







const rutas = [
  {
    nombre: 'Usuarios',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalBorrarUser closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalBorrarUser closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Intenciones',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Respuestas',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Historias',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Pasos',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Entretenimiento',
    modalCrear: (setModalVisible) => <ModalTraining closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalTraining closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalTraining closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalTraining closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Reglas',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
  },
  {
    nombre: 'Pasos Reglas ',
    modalCrear: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalEditar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalBorrar: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
    modalVer: (setModalVisible) => <ModalUserCrear closeModal={() => setModalVisible(false)} />,
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
