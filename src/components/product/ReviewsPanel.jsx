import { useState } from "react";
import { Star } from "lucide-react";
// import avatar from "../../assets/avatar.png";   // uncomment when you have the file

const bars = [
  { score: "5.0", count: "14K reviews", width: 100 },
  { score: "4.0", count: "6K reviews", width: 78 },
  { score: "3.0", count: "4K reviews", width: 62 },
  { score: "2.0", count: "800K reviews", width: 38 },
  { score: "1.0", count: "9K reviews", width: 22 },
];

const reviews = [
  {
    id: 1,
    name: "Alexander Rity",
    time: "4 months ago",
    rating: 4,
    text: "An absolutely stunning timepiece. The craftsmanship is beyond reproach and it keeps perfect time. Worth every penny.",
    by: "James Harrison - 2024-12-15",
  },
  {
    id: 2,
    name: "Alexander Rity",
    time: "4 months ago",
    rating: 4,
    text: "An absolutely stunning timepiece. The craftsmanship is beyond reproach and it keeps perfect time. Worth every penny.",
    by: "James Harrison - 2024-12-15",
  },
  {
    id: 3,
    name: "Isabelle Laurent",
    time: "5 months ago",
    rating: 5,
    text: "Beautiful piece, and the delivery was flawless from start to finish.",
    by: "Isabelle Laurent - 2024-11-02",
  },
];

function Stars({ value, size = 10 }) {
  return (
    <span className="flex text-gold">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          strokeWidth={1.5}
          fill={n <= value ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

function ReviewsPanel() {
  const [count, setCount] = useState(2);
  const shown = reviews.slice(0, count);
  const hasMore = count < reviews.length;

  return (
    <div className="grid border-b border-neutral-300 md:grid-cols-[160px_minmax(0,1fr)]">
      {/* Left: score */}
      <div className="flex flex-col items-center border-b border-neutral-300 px-4 py-8 md:border-b-0 md:border-r">
        <p className="text-[40px] font-medium leading-none text-black">4.0</p>
        <div className="mt-3">
          <Stars value={4} size={16} />
        </div>
        <p className="mt-2 text-[13px] text-neutral-500">35K Ratings</p>
      </div>

      {/* Right */}
      <div className="px-6 py-8 md:px-12">
        {/* Bars */}
        <ul className="space-y-2">
          {bars.map((b) => (
            <li key={b.score} className="flex items-center gap-4 text-[11px]">
              <div className="w-[180px] md:w-[260px]">
                <div
                  className="h-[3px] bg-gold"
                  style={{ width: `${b.width}%` }}
                />
              </div>
              <span className="font-semibold text-black">{b.score}</span>
              <span className="text-neutral-500">{b.count}</span>
            </li>
          ))}
        </ul>

        {/* Review cards */}
        <ul className="mt-12">
          {shown.map((r, i) => (
            <li
              key={r.id}
              className={`flex gap-3 py-6 ${
                i > 0 ? "border-t border-neutral-300" : ""
              }`}
            >
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-neutral-700 text-[11px] text-white">
                {r.name[0]}
                {/* <img src={avatar} alt="" className="h-full w-full rounded-full object-cover" /> */}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-[13px] font-medium text-black">{r.name}</span>
                  <span className="text-[10px] text-neutral-500">{r.time}</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                    {r.rating.toFixed(1)} <Stars value={r.rating} size={9} />
                  </span>
                </div>
                <p className="mt-2 max-w-[560px] text-[11px] leading-relaxed text-neutral-500">
                  {r.text}
                </p>
                <p className="mt-3 text-[10px] text-neutral-500">{r.by}</p>
              </div>
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => setCount(reviews.length)}
            className="ml-[38px] cursor-pointer text-[10px] text-black underline"
          >
            Read more reviews
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewsPanel;