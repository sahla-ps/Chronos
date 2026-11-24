import { Link } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { ids, remove } = useWishlist();
  const { addItem } = useCart();

  const liked = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Navbar solid />
      <main className="min-h-[60vh] bg-white px-6 py-10 text-black md:px-[94px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-neutral-500">
          <Link to="/">Home</Link> &gt; <span className="text-black">Wishlist</span>
        </nav>

        <div className="mt-6 border-t border-neutral-200 pt-12">
          {liked.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[14px] text-neutral-500">Your wishlist is empty.</p>
              <Link to="/collections" className="mt-4 inline-block text-[13px] underline">
                Browse the collection
              </Link>
            </div>
          ) : (
            <ul className="mx-auto max-w-[752px] space-y-4">
              {liked.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-5 rounded-[14px] border border-neutral-200 px-6 py-5"
                >
                  <div className="flex h-[44px] w-[34px] shrink-0 items-center justify-center overflow-hidden bg-neutral-100">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${p.id}`} className="text-[13px] hover:underline">
                      {p.name}
                    </Link>
                    <p className="mt-1 text-[13px] font-medium">${p.price.toLocaleString()}</p>
                  </div>

                  <button
                    onClick={() => addItem(p)}
                    className="flex h-[22px] cursor-pointer items-center gap-2 bg-maroon px-3 text-[11px] text-white transition-opacity hover:opacity-90"
                  >
                    <ShoppingBag size={11} /> Add to bag
                  </button>

                  <button
                    onClick={() => remove(p.id)}
                    aria-label={`Remove ${p.name}`}
                    className="ml-6 cursor-pointer text-neutral-500 hover:text-black"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Wishlist;