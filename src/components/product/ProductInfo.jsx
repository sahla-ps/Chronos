import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useCart } from "../../context/CartContext";

const perks = [
  { id: 1, icon: ShieldCheck, label: "Authenticity Guaranteed" },
  { id: 2, icon: Truck, label: "Free Shipping" },
  { id: 3, icon: RefreshCw, label: "30-Day Returns" },
];

function ProductInfo({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  return (
    <div>
      <span className="inline-block bg-brand-red px-2 py-0.5 text-[12px] uppercase text-white">
        Sale
      </span>

      <h1 className="mt-5 font-tech text-[20px] font-semibold uppercase tracking-[0.12em]">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-[13px] text-neutral-500">
        <div className="flex text-neutral-500">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={12}
              strokeWidth={1.5}
              fill={n <= Math.round(product.rating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <span>
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      <p className="mt-3 flex items-baseline gap-3">
        <span className="text-[22px] font-medium">
          ${product.price.toLocaleString()}
        </span>
        <span className="text-[18px] text-neutral-400 line-through">
          ${product.oldPrice.toLocaleString()}
        </span>
      </p>

      <p className="mt-4 text-[13px] text-neutral-500">{product.short}</p>

      {/* Quantity, Buy Now, cart */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-[30px] items-center border border-neutral-300 text-[12px]">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="h-full w-7 cursor-pointer"
          >
            -
          </button>
          <span className="w-6 text-center">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty(qty + 1)}
            className="h-full w-7 cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Buy Now: add quietly (no drawer), then go to checkout */}
        <button
          onClick={() => {
            addItem(product, qty, false);
            navigate("/checkout");
          }}
          className="h-[30px] flex-1 cursor-pointer bg-gold text-[11px] font-medium uppercase transition-opacity hover:opacity-90"
        >
          Buy Now
        </button>

        {/* Bag button: add and open the drawer */}
        <button
          onClick={() => addItem(product, qty)}
          aria-label="Add to cart"
          className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-neutral-300"
        >
          <ShoppingBag size={14} />
        </button>
      </div>

      {/* Perks */}
      <ul className="mt-8 flex justify-between border-t border-neutral-200 pt-6">
        {perks.map((perk) => {
          const Icon = perk.icon;
          return (
            <li key={perk.id} className="flex flex-col items-center gap-2">
              <Icon size={16} strokeWidth={1.5} />
              <span className="font-tech text-[9px] uppercase tracking-[0.12em] text-neutral-500">
                {perk.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductInfo;