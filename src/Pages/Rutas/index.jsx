import React from 'react'
import {useRoutes, BrowserRouter} from 'react-router-dom'

//importar las paginas
import { Dasboard } from '../Dashboard'
import { Login } from '../Login'

//importar los componentes


function Rutas() {

  const AppRoutes = () => {
    let routes = useRoutes([
      {
        path: '/',
        
        element:<Dasboard/>
      },

      {
        path: '/login',
        
        element:<Login/>
      },

    ])
    return routes
  }

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export  {Rutas}