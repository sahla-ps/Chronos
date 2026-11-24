import { useState } from "react";
import Popup from "../components/Collections/Popup"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FiltersSidebar from "../components/Collections/FiltersSidebar";
import ProductsArea from "../components/Collections/ProductsArea";

function Collections() {
    const [maxPrice, setMaxPrice] = useState(25000);
    const [showPopup, setShowPopup] = useState(
  () => sessionStorage.getItem("seenPopup") !== "yes");

  const closePopup = () => {
  sessionStorage.setItem("seenPopup", "yes");
  setShowPopup(false)};

  return (
    <>
      <Navbar solid />
      <main>
        <section className="border-b border-neutral-200 bg-white px-6 py-16 text-center text-black">
          <p className="text-[11px] uppercase tracking-wide">Discover</p>
          <h1 className="mt-2 font-display text-[32px] font-normal md:text-[40px]">
            Our Collection
          </h1>
          <p className="mt-3 text-[13px] text-neutral-500">
            12 exquisite pieces curated for the discerning collector
          </p>
        </section>

        <div className="grid md:grid-cols-[300px_minmax(0,1fr)]">
          <FiltersSidebar
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onReset={() => setMaxPrice(25000)}
          />
          <ProductsArea maxPrice={maxPrice} />
        </div>
        
      </main>
      {showPopup && <Popup onClose={closePopup} />}
      <Footer />
    </>
  );
}

export default Collections;