import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

import new1 from "../../assets/new-1.png";
import new2 from "../../assets/new-2.png";
import new3 from "../../assets/new-3.png";

const products = [
  { id: 1, image: new1, name: "Royal Chronograph Elite", price: "$12,500" },
  { id: 2, image: new2, name: "Women modern bijouterie", price: "$12,500" },
  { id: 3, image: new3, name: "Royal Chronograph Elite", price: "$12,500" },
];

function NewArrivals() {
  return (
    <section className="bg-white px-6 text-black md:px-[75px]">
      <div className="border-b border-neutral-200 px-0 py-16 md:px-[10px]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide">Just Arrived</p>
            <h2 className="mt-1 font-display text-[32px] font-normal md:text-[40px]">
              New Arrivals
            </h2>
            <p className="mt-3 max-w-[380px] text-[13px] leading-snug text-neutral-500">
              The latest additions to our collection, fresh from the world's
              most prestigious ateliers.
            </p>
          </div>

          <a href="#all" className="flex items-center gap-2 text-[14px]">
            View All <ArrowRight size={14} />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;