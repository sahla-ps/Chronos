import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import CollectionCard from "./CollectionCard";
import { products } from "../../data/products";

const tabs = ["All Collections", "Timepieces", "Accessories", "Fine Art"];

function ProductsArea({ maxPrice }) {
  const [activeTab, setActiveTab] = useState("All Collections");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);

  const visible = products
    .filter((p) => activeTab === "All Collections" || p.category === activeTab)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => p.price <= maxPrice);

  const sorted = [...visible];
  if (sort === "low") sorted.sort((a, b) => a.price - b.price);
  if (sort === "high") sorted.sort((a, b) => b.price - a.price);
  if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

  const shown = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <section className="bg-white text-black">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-neutral-200 px-6 py-5 md:px-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setVisibleCount(6);
            }}
            className={`cursor-pointer border px-3 py-1.5 text-[12px] transition-colors ${
              activeTab === tab
                ? "border-gold bg-gold"
                : "border-neutral-300 text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-end gap-3 px-6 pt-8 md:px-8">
        <label className="flex h-8 w-full items-center gap-2 border border-neutral-300 px-3 sm:w-[220px]">
          <Search size={12} className="text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(6);
            }}
            placeholder="Search here"
            className="w-full text-[11px] outline-none placeholder:text-neutral-500"
          />
        </label>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setVisibleCount(6);
          }}
          className="h-8 border border-neutral-300 px-2 text-[11px] text-neutral-600 outline-none"
        >
          <option value="default">Sort by</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="name">Name</option>
        </select>

        <SlidersHorizontal size={14} className="text-neutral-500" />
      </div>

      {/* Grid */}
      <div className="px-6 py-8 md:px-8">
        {sorted.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-neutral-500">
            No pieces match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
            {shown.map((product) => (
              <CollectionCard
                key={product.id}
                id={product.id}
                product={product}
                image={product.image}
                name={product.name}
                price={`$${product.price.toLocaleString()}`}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              className="cursor-pointer bg-gold px-6 py-2.5 text-[11px] font-medium uppercase tracking-wide transition-opacity hover:opacity-90"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsArea;