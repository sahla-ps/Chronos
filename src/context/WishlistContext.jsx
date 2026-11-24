import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);

  const toggle = (id) => {
    setIds((current) =>
      current.includes(id) ? current.filter((i) => i !== id) : [...current, id]
    );
  };

  const remove = (id) => setIds((current) => current.filter((i) => i !== id));
  const isLiked = (id) => ids.includes(id);

  const value = { ids, count: ids.length, toggle, remove, isLiked };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}