//Para hacer correr el servidor siempre tengo que entrar a la ruta de frontend cd frontend y ahi escribir npm run dev
//Este es el archivo de la app, la parte del front

import Navbar from './components/navbar/Navbar'
import { Container } from './components/ui'

import { ProtectedRoute } from './components/ProtectedRoute'

import { useAuth } from './context/AuthContext'
import { TareasProvider } from './context/TareasContext';

import { Routes, Route, Outlet } from 'react-router-dom' //Sirve para reagrupar todas las paginas que queremos para poder tener diferentes paginas y rutas, por ej una para el perfil, otra para tareas, etc 

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import TareasPage from './pages/TareasPage'
import TareaFormPage from './pages/TareaFormPage'
import NotFound from './pages/NotFound'




function App() {

  const { isAuth, loading } = useAuth();


  if (loading) {
      return <h1>Cargando ...</h1>;
    }


  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirecTo="/tareas" />}> {/*Si no esta autentificado puede ver todas estas rutas */}
            {/* RUTAS PUBLICAS - Esta es una sola ruta  */}
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={isAuth} redirecTo="/login" />} >  {/*Si esta autentificado ya puede ver todas estas rutas */}
            {/* RUTAS PRIVADAS - Estas son varias rutas */}
            <Route path='/perfil' element={<ProfilePage />} />

            <Route element={<TareasProvider>
              <Outlet />
            </TareasProvider>}>
              <Route path='/tareas' element={<TareasPage />} />
              <Route path='/tareas/crear' element={<TareaFormPage />} />
              <Route path='/tareas/:id/editar' element={<TareaFormPage />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>

    </>
  );
}

export default App 
