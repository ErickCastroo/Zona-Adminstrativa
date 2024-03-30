import React,{useState, useEffect} from 'react';
import { FaRobot } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";

import { useAuth } from "@/contexts/AuthContext/useAuth";

function EstadisticasUsuarios() {

  const { usuario } = useAuth();

const [Admins, setAdmins] = useState('')
const [entrenadores, setEntrenadores] = useState('')


useEffect(() => {
  getRoles()
}, [])

const getRoles = async () => {
  setAdmins('2')
  setEntrenadores('41')
}


  return (
    <div className="flex flex-col md:flex-row gap-4">
      <BoxWrapper iconColor="bg-sky-500" icon={<RiAdminLine className="text-2xl text-white" />} title="Total de admin" value={Admins} change="" />
      <BoxWrapper iconColor="bg-orange-600" icon={<GrUserAdmin className="text-2xl text-white" />} title="Total entrenadores" value={entrenadores} change="" />
      <BoxWrapper iconColor="bg-green-600" icon={<FaRobot className="text-2xl text-white" />} title="estado del Chat-Bot" value="entrenando" change="" />
    </div>
  );
}

function BoxWrapper({ iconColor, icon, title, value, change }) {
  return (
    <div className="bg-white dark:bg-slate-900  rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      <div className={`rounded-full md:h-12 md:w-12 h-10 w-10 flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      <div className="pl-4">
        <span className="text-sm dark:text-slate-200 text-gray-500 font-light">{title}</span>
        <div className="flex items-center">
          <strong className="text-xl dark:text-slate-200 text-gray-700 font-semibold">{value}</strong>
          <span className={`text-sm ${change.startsWith('-') ? 'text-red-500' : 'text-green-500'} pl-2`}>{change}</span>
        </div>
      </div>
    </div>
  );
}
export { EstadisticasUsuarios }


















// pendiente de backend para obtener la cantidad de admins y entrenadores solo que tenemos que modificar el backend para que nos devuelva la cantidad de admins y entrenadores


// import React, { useState, useEffect } from 'react';
// import { FaRobot } from 'react-icons/fa';
// import { RiAdminLine } from 'react-icons/ri';
// import { GrUserAdmin } from 'react-icons/gr';
// import { useAuth } from '@/contexts/AuthContext/useAuth';

// function EstadisticasUsuarios() {
//   const { usuario } = useAuth();
//   const [adminsCount, setAdminsCount] = useState(0);
//   const [trainersCount, setTrainersCount] = useState(0);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${back_url}/usuarios`, {
//         headers: {
//           Authorization: `Bearer ${usuario.token}`,
//         },
//       });
//       if (response.ok) {
//         const userData = await response.json();
//         const admins = userData.filter((user) => user.rol === 1);
//         const trainers = userData.filter((user) => user.rol === 0); 
//         setAdminsCount(admins.length);
//         setTrainersCount(trainers.length);
//       } else {
//         console.error('Error al obtener los datos de usuarios');
//       }
//     } catch (error) {
//       console.error('Error en la petición fetch para obtener los datos de usuarios', error);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-4">
//       <BoxWrapper
//         iconColor="bg-sky-500"
//         icon={<RiAdminLine className="text-2xl text-white" />}
//         title="Total de admin"
//         value={adminsCount}
//         change=""
//       />
//       <BoxWrapper
//         iconColor="bg-orange-600"
//         icon={<GrUserAdmin className="text-2xl text-white" />}
//         title="Total entrenadores"
//         value={trainersCount}
//         change=""
//       />
//       <BoxWrapper
//         iconColor="bg-green-600"
//         icon={<FaRobot className="text-2xl text-white" />}
//         title="Estado del Chat-Bot"
//         value="entrenando"
//         change=""
//       />
//     </div>
//   );
// }

// function BoxWrapper({ iconColor, icon, title, value, change }) {
//   return (
//     <div className="bg-white dark:bg-slate-900 rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
//       <div className={`rounded-full md:h-12 md:w-12 h-10 w-10 flex items-center justify-center ${iconColor}`}>
//         {icon}
//       </div>
//       <div className="pl-4">
//         <span className="text-sm dark:text-slate-200 text-gray-500 font-light">{title}</span>
//         <div className="flex items-center">
//           <strong className="text-xl dark:text-slate-200 text-gray-700 font-semibold">{value}</strong>
//           <span className={`text-sm ${change.startsWith('-') ? 'text-red-500' : 'text-green-500'} pl-2`}>{change}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { EstadisticasUsuarios };
