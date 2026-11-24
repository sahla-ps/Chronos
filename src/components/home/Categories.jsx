import { Watch, Sparkles, Palette } from "lucide-react";
import CategoryCard from "./CategoryCard";

import catTimepieces from "../../assets/cat-timepieces.png";
import catAccessories from "../../assets/cat-accessories.png";
import catArt from "../../assets/cat-art.png";

const categories = [
  {
    id: 1,
    icon: Watch,
    image: catTimepieces,
    title: "Timepieces",
    description: "Swiss masterpieces and rare horological complications",
    count: 48,
  },
  {
    id: 2,
    icon: Sparkles,
    image: catAccessories,
    title: "Accessories",
    description: "Refined accoutrements for the distinguished gentleman",
    count: 124,
  },
  {
    id: 3,
    icon: Palette,
    image: catArt,
    title: "Fine Art",
    description: "Museum-quality paintings from acclaimed artists",
    count: 36,
  },
];

function Categories() {
  return (
    <section className="bg-white px-6 text-black md:px-[75px]">
      <div className="border-y border-neutral-200 px-0 py-16 md:px-[10px]">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-wide">Our Collections</p>
          <h2 className="mt-1 font-display text-[32px] font-normal md:text-[40px]">
            Explore Categories
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              icon={item.icon}
              image={item.image}
              title={item.title}
              description={item.description}
              count={item.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;