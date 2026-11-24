import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function CollectionCard({ id, product, image, name, price }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toggle, isLiked } = useWishlist();
  const liked = isLiked(id);

  return (
    <article className="group text-center">
      <div className="relative flex h-[300px] items-center justify-center border border-neutral-200 bg-white md:h-[334px]">
        <button
          onClick={() => toggle(id)}
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 cursor-pointer text-gold"
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
        </button>

        <img src={image} alt={name} className="h-[216px] object-contain" />

        <div className="absolute inset-x-[42px] bottom-6 hidden items-center gap-2 group-hover:flex">
          {/* Buy Now: add quietly (no drawer), then go to checkout */}
          <button
            onClick={() => {
              addItem(product, 1, false);
              navigate("/checkout");
            }}
            className="h-[25px] flex-1 cursor-pointer bg-gold text-[10px] font-medium uppercase"
          >
            Buy Now
          </button>

          {/* Bag button: add and open the drawer */}
          <button
            onClick={() => addItem(product)}
            aria-label="Add to cart"
            className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center bg-neutral-200"
          >
            <ShoppingBag size={12} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-[13px] tracking-wide">
        <Link to={`/product/${id}`} className="hover:underline">
          {name}
        </Link>
      </h3>
      <p className="mt-1 text-[13px] text-neutral-500">{price}</p>
    </article>
  );
}

export default CollectionCard;