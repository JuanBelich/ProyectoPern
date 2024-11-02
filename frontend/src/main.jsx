
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'  //BrowserRouter lo que hace es generar un contexto, nos da las rutas que necesitamos
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from '../src/context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render( //estos son los datos del usuario para saber si esta autentificado
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
//cuando esta en homepage el usuario todavia no esta registrado 