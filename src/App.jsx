import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { CartProvider } from "./components/ContextProvider/ContextProvider";
import MyOrder from "./components/MyOrder/MyOrder";
import PrivateRoute from "./components/AuthRoute/PrivateRoute";
import PublicRoute from "./components/AuthRoute/PublicRoute";
import NotFound from "./components/NotFound/NotFound";


function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/signUp" element={<PublicRoute> <SignUp /> </PublicRoute>} />
          <Route path="/myOrder" element={<PrivateRoute> <MyOrder /> </PrivateRoute>} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
