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
