import { useState } from "react";
import { Heart } from "lucide-react";

function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 md:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-[72px] w-[72px] cursor-pointer border p-1 md:h-[95px] md:w-[95px] ${
              active === i ? "border-black" : "border-neutral-200"
            }`}
          >
            <img
              src={img}
              alt={`${name}, view ${i + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Big image */}
      <div className="relative flex h-[340px] flex-1 items-center justify-center border border-neutral-200 md:h-[420px]">
        
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
          className="absolute right-5 top-5 cursor-pointer text-black"
        >
         <Heart size={26} fill={liked ? "currentColor" : "none"} />
        </button>

        <img src={images[active]} alt={name} className="h-[80%] object-contain" />
      </div>
    </div>
  );
}

export default ProductGallery;