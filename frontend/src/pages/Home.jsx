


import { useEffect, useState } from "react";
import Product from "./Product";
import OurPolicy from "../Components/OurPolicy";
import NewLetterBox from "../Components/NewLetterBox";
import Footer from "../Components/Footer";

function Home() {
  const heroData = [
    { 
      text1: "30% OFF Limited Offer", 
      text2: "Style that", 
      img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
    },
    { 
      text1: "Discover the Best of Bold Fashion", 
      text2: "Limited Time Only!", 
      img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
    },
    { 
      text1: "Explore Our Best Collection", 
      text2: "Shop Now!", 
      img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
    },
    { 
      text1: "Choose your Perfect Fashion Fit", 
      text2: "Now on Sale!", 
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    }
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prevCount =>
        prevCount === heroData.length - 1 ? 0 : prevCount + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      {/* Hero Section */}
      <div className="w-[100vw] lg:h-[100vh] md:h-[70vh] sm:h-[60vh] relative">
        {/* Background Image */}
        <img
          src={heroData[heroCount].img}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {heroData[heroCount].text1}
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-md">
            {heroData[heroCount].text2}
          </p>
        </div>
      </div>

      {/* Other Sections */}
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
