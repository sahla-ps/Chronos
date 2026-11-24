
import { ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";

const tags = ["Best Sellers", "New Arrivals", "Featured"];

const perks = [
  { id: 1, icon: ShieldCheck, title: "Authenticity Guaranteed", text: "Every piece verified by our experts" },
  { id: 2, icon: Truck, title: "White Glove Delivery", text: "Complimentary worldwide shipping" },
  { id: 3, icon: RefreshCw, title: "30-Day Returns", text: "No questions asked returns" },
  { id: 4, icon: Award, title: "Warranty", text: "Coverage on all timepieces" },
];

function FiltersSidebar({maxPrice, setMaxPrice, onReset}) {
 

  return (
    <aside className="border-b border-neutral-200 bg-white text-black md:border-b-0 md:border-r">
      {/* Top row */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-5">
        <h2 className="text-[15px] font-medium uppercase tracking-wide">Filters</h2>
        <button onClick={onReset} className="cursor-pointer text-[11px] text-neutral-500">Reset</button>
      </div>

      {/* Collections tags */}
      <div className="border-b border-neutral-200 px-8 py-8">
        <h3 className="text-[15px] uppercase tracking-wide">Collections</h3>
        <div className="mt-5 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="cursor-pointer bg-neutral-200 px-3 py-1.5 text-[11px] transition-colors hover:bg-neutral-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="border-b border-neutral-200 px-8 py-8">
        <h3 className="text-[13px]">Price Range</h3>

        <div className="mt-4 flex items-center justify-between text-[12px]">
          <span>$0</span>
          <span>$35,000</span>
        </div>

        <input
          type="range"
          min="0"
          max="35000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-2 w-full cursor-pointer accent-black"
        />

        <div className="mt-4 flex items-center justify-between gap-2 text-[11px]">
          <span className="rounded-full border border-neutral-200 px-4 py-1.5">$ 0.00</span>
          <span className="text-neutral-500">To</span>
          <span className="rounded-full border border-neutral-200 px-4 py-1.5">
            $ {maxPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Shipping & delivery */}
      <div className="px-8 py-8">
        <h3 className="text-[15px] uppercase tracking-wide">Shipping & Delivery</h3>

        <ul className="mt-6 space-y-6">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <li key={perk.id} className="flex items-start gap-4">
                <Icon size={20} strokeWidth={1.5} className="mt-1 shrink-0" />
                <div>
                  <p className="font-tech text-[12px] font-semibold uppercase tracking-[0.15em]">
                    {perk.title}
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-500">{perk.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default FiltersSidebar;