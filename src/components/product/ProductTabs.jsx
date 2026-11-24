import { useState } from "react";
import ReviewsPanel from "./ReviewsPanel";

const tabs = ["Description", "Specifications", "Reviews"];

const specs = [
  { label: "Case size", value: "42mm" },
  { label: "Case material", value: "18K rose gold" },
  { label: "Movement", value: "Swiss automatic" },
  { label: "Crystal", value: "Sapphire" },
  { label: "Water resistance", value: "100 meters" },
  { label: "Strap", value: "Crocodile leather" },
];

function ProductTabs({ product }) {
  const [active, setActive] = useState("Description");

  return (
    <section className="mt-20">
      {/* Tab buttons */}
      <div className="flex border-b border-neutral-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`-mb-px cursor-pointer border-b-2 px-10 py-4 text-[14px] uppercase tracking-wide ${
              active === tab
                ? "border-black font-medium text-black"
                : "border-transparent text-neutral-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className={
          active === "Reviews"
            ? ""
            : "max-w-[800px] px-10 py-8 text-[15px] leading-relaxed text-neutral-600"
        }
      >
        {active === "Description" && <p>{product.description}</p>}

        {active === "Specifications" && (
          <dl className="space-y-3">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex gap-4 border-b border-neutral-100 pb-3"
              >
                <dt className="w-44 text-black">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active === "Reviews" && <ReviewsPanel />}
      </div>
    </section>
  );
}

export default ProductTabs;