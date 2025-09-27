


import { FaCircle } from "react-icons/fa6";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="w-[100%] h-full relative flex items-center">
      {/* Hero Text */}
      <div className="absolute text-[#88d9ee] md:left-[10%] left-[8%] top-[15%] md:top-[25%] lg:top-[30%]">
        <p className="font-bold tracking-wide text-[22px] sm:text-[28px] md:text-[40px] lg:text-[55px] drop-shadow-lg animate-fadeIn">
          {heroData.text1}
        </p>
        <p className="mt-3 text-white font-semibold text-[18px] sm:text-[22px] md:text-[30px] lg:text-[42px] drop-shadow-lg animate-slideUp">
          {heroData.text2}
        </p>

        {/* Call To Action Button */}
        <button className="mt-6 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out">
          Shop Now
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-[8%] md:bottom-[12%] lg:bottom-[15%] left-[10%] flex items-center justify-center gap-3">
        <FaCircle
          className={`cursor-pointer w-[12px] sm:w-[14px] transition-all duration-300 ${
            heroCount === 0 ? "fill-orange-400 scale-125" : "fill-white"
          }`}
          onClick={() => setHeroCount(0)}
        />
        <FaCircle
          className={`cursor-pointer w-[12px] sm:w-[14px] transition-all duration-300 ${
            heroCount === 1 ? "fill-orange-400 scale-125" : "fill-white"
          }`}
          onClick={() => setHeroCount(1)}
        />
        <FaCircle
          className={`cursor-pointer w-[12px] sm:w-[14px] transition-all duration-300 ${
            heroCount === 2 ? "fill-orange-400 scale-125" : "fill-white"
          }`}
          onClick={() => setHeroCount(2)}
        />
        <FaCircle
          className={`cursor-pointer w-[12px] sm:w-[14px] transition-all duration-300 ${
            heroCount === 3 ? "fill-orange-400 scale-125" : "fill-white"
          }`}
          onClick={() => setHeroCount(3)}
        />
      </div>
    </div>
  );
}

export default Hero;

