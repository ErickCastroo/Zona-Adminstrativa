import { Routes, Route } from 'react-router-dom'
import { Rutas } from '@/config/routes.jsx'
import { useAuth } from '@/contexts/AuthContext/useAuth'

function App() {
  const routes = Rutas()
  const auth = useAuth()


  return (
      <Routes>
        {routes && routes.map(route => {

          if (route.nestedRoutes) {
            return (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.nestedRoutes.map(nestedRoute => (
                  <Route key={nestedRoute.path} path={nestedRoute.path} element={nestedRoute.element} />
                ))}
              </Route>
            )
          } else {
            return (
              <Route key={route.path} path={route.path} element={route.element} />
            )
          }
          
        })}
      </Routes>
  )
}

export { App }