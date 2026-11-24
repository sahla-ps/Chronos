import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product, qty = 1, openDrawer = true) => {
  setItems((current) => {
      const existing = current.find((i) => i.id === product.id);
      if (existing) {
        return current.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...current,
        { id: product.id, name: product.name, price: product.price, image: product.image, qty },
      ];
    });
    if (openDrawer) setIsOpen(true);
  };

  const changeQty = (id, qty) => {
    if (qty < 1) return;
    setItems((current) => current.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((i) => i.id !== id));
  };

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = {
    items, count, subtotal, isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem, changeQty, removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}