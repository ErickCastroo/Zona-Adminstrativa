import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from './auth.service'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { obtenerUsuarioDesdeCookies } from '@/lib/utils'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [usuarioVerificado, setUsuarioVerificado] = useState(false)
  
  const navigate = useNavigate()
  

  useEffect(() => {
    try {
      const usuarioCookie = obtenerUsuarioDesdeCookies()
      if (usuarioCookie) {
        setUsuario(usuarioCookie)
      } else {
        setUsuario(null)
      }
      setUsuarioVerificado(true)
    } catch (error) {
      console.error('Error al obtener usuario desde cookies:', error)
      navigate('/login')
    }
  }, [])

  const login = async (correo, password) => {
    try {
      const response = await authLogin(correo, password)
      let tokenDecoded = jwtDecode(response.token)
      const expDate = new Date(tokenDecoded.exp * 1000)

      const usuarioResponse = {
        token: response.token,
        id: tokenDecoded.sub,
        rol: tokenDecoded.rol,
        nombre: response.nombre
      }

      Cookies.set('usuario', JSON.stringify(usuarioResponse), { expires: expDate })
      setUsuario(usuarioResponse)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    Cookies.remove('usuario')
    setUsuario(null)
    navigate('/login')
  }

  const auth = { usuario, usuarioVerificado, login, logout }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }