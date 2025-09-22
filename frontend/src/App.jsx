
import Login from './compounds/login/Login.jsx'
import Signup from './compounds/login/Signup.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './compounds/dashboard/Home.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import CartPage from './compounds/dashboard/CartPage.jsx'
import NaveBar from './compounds/dashboard/NaveBar.jsx'
import { ToastContainer } from "react-toastify";
import Checkout from './utils/Checkout.jsx'
import Dashboard from './compounds/saller/Dashboard.jsx'
import ListProducts from './compounds/saller/ListProducts.jsx'
import AddProduct from './compounds/saller/AddProduct.jsx'
import UpdateProduct from './compounds/saller/UpdateProduct.jsx'
import Orders from './compounds/saller/Orders.jsx'

function App() {


  return (
    <><AuthProvider>
      <Routes>
        <Route default path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={<CartPage></CartPage>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Signup></Signup>}></Route>
        <Route path='/products' element={<Home></Home>}></Route>


        <Route path='/saller' element={<Dashboard></Dashboard>}></Route>
        <Route path='/myproducts' element={<ListProducts></ListProducts>}></Route>
        <Route path='/myproducts/addproduct' element={<AddProduct></AddProduct>}></Route>
        <Route path='/myproducts/updateproduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path='/myproducts/orders/:idProduct' element={<Orders></Orders>}></Route>

      </Routes>
    </AuthProvider>
    <ToastContainer />
    </>
  )
}
export default App
