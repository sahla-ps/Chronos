import { useEffect } from "react";
import { X } from "lucide-react";
import popupImg from "../../assets/popup.png";

function Popup({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-[840px] overflow-hidden border border-neutral-200 bg-white text-black shadow-2xl md:grid-cols-[42%_1fr]"
      >
        <img
          src={popupImg}
          alt="A watchmaker adjusting a gold watch"
          className="h-[200px] w-full object-cover md:h-full"
        />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer text-neutral-500 hover:text-black"
        >
          <X size={20} strokeWidth={1.25} />
        </button>

        <div className="flex items-center px-8 py-12 md:px-10">
          <p className="text-center font-tech text-[12px] font-medium uppercase leading-[2.2] tracking-[0.12em]">
            Designed with precision and timeless elegance, our timepieces
            reflect exceptional craftsmanship and refined detail. Each watch
            blends classic aesthetics with modern performance. Created to
            endure, they are made for those who value sophistication beyond
            trends.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;