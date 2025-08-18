
import Login from './compounds/login/login.jsx'
import Signup from './compounds/login/Signup.jsx'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from './compounds/dashboard/Home.jsx'


function App() {
  return (
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Signup></Signup>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        

      </Routes>
  )
}

export default App
