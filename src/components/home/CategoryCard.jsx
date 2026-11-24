import { ArrowRight } from "lucide-react";



function CategoryCard({ icon: Icon, image, title, description, count }) {
  return (
    <article className="relative min-h-[185px] overflow-hidden rounded-[20px] bg-gradient-to-b from-[#0b1020] to-[#05070f] p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      {/* Red glow at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(ellipse_at_bottom,rgba(229,23,31,0.9),transparent_70%)]" />

      {/* Cut-out image, top right */}
      <img
        src={image}
        alt=""
        className="absolute right-0 top-0 h-[110px] w-auto object-contain"
      />

      {/* Content */}
      <div className="relative flex h-full flex-col">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Icon size={16} />
        </span>

        <h3 className="mt-5 text-[18px]">{title}</h3>
        <p className="mt-1 max-w-[220px] text-[10px] text-white/60">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between text-[10px] font-medium">
          <span>{count} items</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </article>
  );
}

export default CategoryCard;