// import { AuthRoute } from '@/contexts/AuthContext/AuthRoute'
// import { PublicRoute } from '@/contexts/AuthContext/PublicRoute'
// import { RolesPermitidos } from '@/contexts/AuthContext/RolesPermitidos'



// //importar las paginas
// import { Dasboard } from '@/Pages/Dashboard'
// import { Login } from '@/Pages/Login'

import { AuthRoute } from '@/contexts/AuthContext/AuthRoute'
import { PublicRoute } from '@/contexts/AuthContext/PublicRoute'
import { RolesPermitidos } from '@/contexts/AuthContext/RolesPermitidos'

import { Login } from '@/pages/Login'
import { Dashboard } from '@/Pages/Dashboard'

import { FaHome } from 'react-icons/fa'

function Rutas() {

  return [
    {
      path: '/',
      element: (
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
      ),
      name: 'home',
      icon: <FaHome />,
      private: true,
      public_only: false,
      allowed_roles: ['admin', 'usuario']
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
      name: 'login',
      icon: <FaHome />,
      private: false,
      public_only: true,
      allowed_roles: ['admin', 'usuario']
    },

    // {
    //   path: '*',
    //   element: <Error404 />,
    //   private: false,
    //   public_only: false
    // },
  ]
}

export { Rutas }