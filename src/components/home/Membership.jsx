import { ScanFace, ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";

const features = [
  { id: 1, icon: ShieldCheck, title: "Authenticity Guaranteed", description: "Every piece verified by our experts" },
  { id: 2, icon: Truck, title: "White Glove Delivery", description: "Complimentary worldwide shipping" },
  { id: 3, icon: RefreshCw, title: "30-Day Returns", description: "No questions asked returns" },
  { id: 4, icon: Award, title: "Warranty", description: "Coverage on all timepieces" },
];

function Membership() {
  return (
    <section className="bg-white px-6 text-black md:px-[75px]">
      <div className="px-0 py-16 text-center md:px-[10px]">
        <p className="text-[12px] uppercase tracking-wide text-brand-red">
          Exclusive Membership
        </p>

        <h2 className="mx-auto mt-2 max-w-[600px] font-display text-[28px] font-normal leading-tight md:text-[36px]">
          Join the Circle of
          <span className="block text-neutral-500">Distinguished Collectors</span>
        </h2>

        <p className="mx-auto mt-5 max-w-[380px] text-[13px] leading-snug text-neutral-500">
          Gain access to private viewings, first looks at rare acquisitions, and
          exclusive events in the world's finest venues.
        </p>

        <button className="mt-8 inline-flex cursor-pointer items-center gap-2 bg-gold px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-black transition-opacity hover:opacity-90">
          <ScanFace size={16} />
          Request Membership
        </button>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex flex-col items-center">
                <Icon size={20} strokeWidth={1.5} />
                <h3 className="mt-3 font-tech text-[13px] font-semibold uppercase tracking-[0.15em]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[10px] text-neutral-500">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Membership;