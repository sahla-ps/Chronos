import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ id, image, name, price, tall = false }) {
  const [liked, setLiked] = useState(false)
  return (
    <article className="text-center">
      <div
        className={`relative flex items-center justify-center border border-neutral-200 bg-white ${
          tall ? "h-[400px] md:h-[470px]" : "h-[316px]"
        }`}
      >

        <button
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 cursor-pointer text-gold"
        >
          <Heart size={tall ? 22 : 16} fill={liked ? "currentColor" : "none"} />
        </button>

        <img
          src={image}
          alt={name}
          className={`object-contain ${tall ? "h-[300px]" : "h-[230px]"}`}
        />
      </div>

      <h3 className="mt-4 text-[13px] tracking-wide">
        {id ? (
          <Link to={`/product/${id}`} className="hover:underline">
            {name}
          </Link>
        ) : (
          name
        )}
      </h3>
      <p className="mt-1 text-[13px] text-neutral-500">{price}</p>
    </article>
  );
}

export default ProductCard;