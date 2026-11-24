import React from 'react'

import { Globe, Search, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

function Navbar({ solid = false }) {

  const { count: wishCount } = useWishlist();
  const { pathname } = useLocation();
  const { count, openCart } = useCart();
  const collectionsActive =
    pathname.startsWith("/collections") || pathname.startsWith("/product");

  return (
    <nav className={`z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center px-6 py-6 text-white md:px-[85px] ${solid ? "relative bg-maroon" : "absolute inset-x-0 top-0"}`}>
      <ul className="hidden gap-6 text-[13px] md:flex">
        <li><Link to="/collections" className={collectionsActive ? "text-brand-red" : ""}>Collections</Link></li>
        {/* <li><Link to="/collections">Collections</Link></li> */}
        <li><a href="#timepieces">Timepieces</a></li>
        <li><a href="#accessories">Accessories</a></li>
        <li><a href="#fine-art">Fine Art</a></li>
      </ul>
      <Link to="/" className="col-start-2 font-logo text-[30px] tracking-[0.14em] text-cream">CHRONOS</Link>

      <div className="col-start-3 flex items-center justify-end gap-5 text-[11px]">
        <button className="flex items-center gap-1.5 cursor-pointer">
          <Globe size={16} />
          <span>English</span>
          <small className="text-[8px]">▾</small>
        </button>
        <button aria-label="Search" className="cursor-pointer"><Search size={16} /></button>

        <Link to="/wishlist" aria-label="Wishlist" className="relative">
          <Heart size={16} />
          {wishCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-black">
              {wishCount}
            </span>
          )}
        </Link>

        <button onClick={openCart} aria-label="Cart" className="relative cursor-pointer">
          <ShoppingBag size={16} />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-black">
              {count}
            </span>
          )}
        </button>
        <Link
          to="/account"
          aria-label="Account"
          className={pathname.startsWith("/account") ? "text-brand-red" : ""}
        >
          <User size={16} />
        </Link>
      </div>
    </nav>

  )
}


export default Navbar