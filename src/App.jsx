import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/collections", element: <Collections /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/checkout", element: <Checkout/>},
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/account", element: <Account /> },
      { path: "/signup", element: <Signup />} ,
      { path: "/login", element: <Login />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}



export default App;