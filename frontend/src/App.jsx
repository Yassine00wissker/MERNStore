
import Login from './compounds/login/Login.jsx'
import Signup from './compounds/login/Signup.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './compounds/dashboard/Home.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import CartPage from './compounds/dashboard/CartPage.jsx'
import NaveBar from './compounds/dashboard/NaveBar.jsx'
import { ToastContainer } from "react-toastify";
import Checkout from './utils/Checkout.jsx'

function App() {


  return (
    <><AuthProvider>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={<CartPage></CartPage>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Signup></Signup>}></Route>
        <Route path='/products' element={<Home></Home>}></Route>

      </Routes>
    </AuthProvider>
    <ToastContainer />
    </>
  )
}
export default App
