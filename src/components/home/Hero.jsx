import React from 'react'

import heroBg from "../../assets/hero-bg.jpg";
import watch from "../../assets/watch.png";

const featured = {
  label: "Limited Edition",
  name: "Midnight Tourbillon",
  image: watch,
};

const cut = "[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%,0_20%)]";

function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center bg-cover bg-center px-6 font-sans text-white md:px-[85px]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="mt-10 max-w-[520px]">
        <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] backdrop-blur-sm">
          Curated Excellence Since 1892
        </span>

        <h1 className="mb-6 mt-4 font-display text-[40px] font-normal leading-[1.05] md:text-[56px]">
          Not just another
          <span className="block text-[46px] text-gold md:text-[64px]">
            luxury store.
          </span>
        </h1>

        <p className="mb-8 max-w-[380px] text-[13px] leading-normal">
          Discover an extraordinary collection of luxury timepieces, bespoke
          accessories, and museum-quality paintings crafted for the discerning
          collector.
        </p>

        <button className="cursor-pointer rounded-full border border-white/25 bg-black px-9 py-3.5 text-[13px] font-medium transition-colors hover:bg-white hover:text-black">
          Explore Collection
        </button>
      </div>

      <div className="absolute bottom-[60px] right-[90px] hidden md:block">
        <div className={`h-36 w-36 bg-[#2b2b2b] p-[3px] ${cut}`}>
          <img
            src={featured.image}
            alt={featured.name}
            className={`h-full w-full object-cover ${cut}`}
          />
        </div>
        <p className="mb-0.5 mt-2.5 font-tech text-[15px] font-semibold uppercase tracking-wide text-brand-red">
          {featured.label}
        </p>
        <p className="font-tech text-base font-medium">{featured.name}</p>
      </div>
    </section>
  );
}

export default Hero;


