import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";
import PerksRow from "../components/product/PerksRow";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <>
        <Navbar solid />
        <main className="bg-white px-6 py-32 text-center text-black">
          <h1 className="font-display text-[32px]">Product not found</h1>
          <Link to="/collections" className="mt-4 inline-block underline">
            Back to collections
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar solid />
      <main className="bg-white px-6 py-10 text-black md:px-[70px]">
        <div className="md:px-[58px]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-neutral-500">
            <Link to="/">Home</Link> &gt;{" "}
            <Link to="/collections">Collections</Link> &gt;{" "}
            <span>{product.category}</span> &gt;{" "}
            <span className="text-black">{product.name}</span>
          </nav>

          {/* Gallery and info */}
          <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
            <ProductGallery
              key={product.id}
              images={product.gallery}
              name={product.name}
            />
            <ProductInfo key={product.id} product={product} />
          </div>
        </div>

        {/* Description, Specifications, Reviews */}
        
        <ProductTabs key={product.id} product={product} />
        <RelatedProducts currentId={product.id} />
        <PerksRow />
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;