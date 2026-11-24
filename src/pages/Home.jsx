import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import FeaturedPieces from "../components/home/FeaturedPieces";
import Categories from "../components/home/Categories";
import NewArrivals from "../components/home/NewArrivals";
import Membership from "../components/home/Membership";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/NewsLetter";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedPieces />
        <Categories />
        <NewArrivals />
        <Membership />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

export default Home;
