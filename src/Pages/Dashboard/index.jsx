import React, { useEffect,useState } from 'react'
import {NavLink} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

function Dasboard() {
  const location = useLocation()
  const {token} = location.state ||''
  const [usuarios, setUsuarios] = useState([])
  console.log(token)

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        if(!token || token === ''){
          console.error('no existe el token')
          return
        }
        
        const response = await fetch('http://localhost/fastapi/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          // Lanza un error si la respuesta no es exitosa
          throw new Error(`Error en la petición: ${response.status}`);
        }
        // Parsea la respuesta a formato JSON
        const jsonData = await response.json();
        setUsuarios(jsonData)
        console.log(jsonData)
        // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.log(error)
      }
    }
    obtenerUsuarios()
  }, [])
  


  return (
    <div>
    <h1>Dashboard</h1>
    {/* <button onClick={handleClick}> soy un boton :D</button> */}
    <ul>
      <li>
        <NavLink to={'/login'}>Login</NavLink>
      </li>
    </ul>      
  </div>
  )
}

export  {Dasboard}