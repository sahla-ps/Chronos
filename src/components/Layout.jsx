import { Outlet, ScrollRestoration } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import CartDrawer from "./CartDrawer";

function Layout() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Outlet />
        <CartDrawer />
        <ScrollRestoration />
      </CartProvider>
    </WishlistProvider>
  );
}

export default Layout;