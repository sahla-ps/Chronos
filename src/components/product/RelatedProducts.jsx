import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../home/ProductCard";
import { products } from "../../data/products";

function RelatedProducts({ currentId }) {
  const related = products.filter((p) => p.id !== currentId).slice(0, 3);

  return (
    <section className="mt-24">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-[28px] font-normal md:text-[36px]">
          You May Also Like
        </h2>
        <Link to="/collections" className="flex items-center gap-2 text-[14px]">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {related.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            tall
            image={p.image}
            name={p.name}
            price={`$${p.price.toLocaleString()}`}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;