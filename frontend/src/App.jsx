
import Login from './compounds/login/login.jsx'
import Signup from './compounds/login/Signup.jsx'
import { Routes,Route,Navigate } from 'react-router-dom'
import  AuthProvider  from './context/AuthProvider.jsx'


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/' element={<Signup></Signup>}></Route>
        

      </Routes>
    </AuthProvider>
  )
}

export default App
