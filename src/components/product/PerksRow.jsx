import { ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";

const perks = [
  { id: 1, icon: ShieldCheck, title: "Authenticity Guaranteed", text: "Every piece verified by our experts" },
  { id: 2, icon: Truck, title: "White Glove Delivery", text: "Complimentary worldwide shipping" },
  { id: 3, icon: RefreshCw, title: "30-Day Returns", text: "No questions asked returns" },
  { id: 4, icon: Award, title: "Warranty", text: "Coverage on all timepieces" },
];

function PerksRow() {
  return (
    <div className="mt-24 grid grid-cols-2 gap-8 pb-20 md:grid-cols-4">
      {perks.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="flex flex-col items-center text-center">
            <Icon size={22} strokeWidth={1.5} />
            <h3 className="mt-3 font-tech text-[13px] font-semibold uppercase tracking-[0.15em]">
              {item.title}
            </h3>
            <p className="mt-1 text-[11px] text-neutral-500">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PerksRow;