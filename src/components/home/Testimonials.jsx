import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "The Royal Chronograph exceeded every expectation. The attention to detail and the personalized service from Chronos made this acquisition truly special. A masterpiece for my collection.",
    name: "Alexander Rothschild",
    role: "Private Collector, Geneva",
  },
  {
    id: 2,
    quote:
      "From the first consultation to white glove delivery, every step felt considered. Chronos understands what a serious collector looks for.",
    name: "Isabelle Laurent",
    role: "Art Dealer, Paris",
  },
  {
    id: 3,
    quote:
      "I have bought from many houses over the years. None match the authenticity and care I found here.",
    name: "Marcus Whitfield",
    role: "Horology Enthusiast, London",
  },
  {
    id: 4,
    quote:
      "The painting arrived perfectly packaged, with full provenance. It now hangs at the center of my living room.",
    name: "Yuki Tanaka",
    role: "Private Collector, Tokyo",
  },
  {
    id: 5,
    quote:
      "Exceptional service and a truly curated selection. I recommend Chronos to everyone in my circle.",
    name: "Omar Al-Farsi",
    role: "Investor, Dubai",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-[#f0f0f0] px-6 py-16 text-black md:px-[75px]">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <Quote size={36} strokeWidth={1.25} className="text-gold" />

        <p className="mt-8 font-display text-[18px] leading-snug md:text-[20px]">
          "{current.quote}"
        </p>

        <div className="mt-6 flex gap-0.5 text-gold">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={12} fill="currentColor" strokeWidth={0} />
          ))}
        </div>

        <p className="mt-4 text-[13px] font-medium">{current.name}</p>
        <p className="text-[10px] text-neutral-500">{current.role}</p>

        <div className="mt-8 flex items-center gap-3">
          <button onClick={prev} aria-label="Previous" className="cursor-pointer text-neutral-600">
            <ChevronLeft size={14} />
          </button>

          <div className="flex gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1 w-1 cursor-pointer rounded-full ${
                  i === index ? "bg-gold" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>

          <button onClick={next} aria-label="Next" className="cursor-pointer text-neutral-600">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;