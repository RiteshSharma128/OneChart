

import NewLetterBox from "../Components/NewLetterBox"
import Title from "../Components/Title"
import about from '../assets/about.jpg'

function About() {
  return (
    <div className="w-[99vw] md:w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center flex-col justify-center pt-[80px] gap-[50px]">
      
      {/* Title Section */}
      <Title text1={'ABOUT'} text2={'US'} />

      <div className="w-full flex flex-col lg:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img 
            src={about} 
            alt="About OneCart" 
            className="lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm" 
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]">
          <p className="lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]">
            OneCart was built for smart, seamless shopping—bringing you quality products, the latest trends, and everyday essentials all in one place. With trusted service, fast delivery, and unbeatable value, OneCart ensures your online shopping experience is easy, satisfying, and stress-free.
          </p>
          <p className="lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]">
            Modern shopping—combining style, convenience, and affordability. Whether it's fashion essentials or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you'll love.
          </p>
          <p className="lg:w-[80%] w-[100%] text-[15px] text-white lg:text-[18px] mt-[10px] font-bold">
            Our Mission
          </p>
          <p className="lg:w-[80%] w-[100%] text-[13px] text-white md:text-[15px]">
            Our mission is to transform online shopping by delivering quality, affordability, and convenience. At OneCart, we connect customers with trusted products and brands, creating a seamless, customer-first experience that saves time, adds value, and adapts to every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-[100%] flex items-center justify-center flex-col gap-[10px]">
        <Title text1={'WHY'} text2={"CHOOSE US"} />

        <div className="w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px] gap-[20px]">

          {/* Card 1 */}
          <div className="lg:w-[33%] w-[99%] h-[250px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]">
            <b className="text-[20px] font-semibold text-[#bff1f9]">Quality Assurance</b>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>

          {/* Card 2 */}
          <div className="lg:w-[33%] w-[99%] h-[250px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]">
            <b className="text-[20px] font-semibold text-[#bff1f9]">Convenience</b>
            <p>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
          </div>

          {/* Card 3 */}
          <div className="lg:w-[33%] w-[99%] h-[250px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]">
            <b className="text-[20px] font-semibold text-[#bff1f9]">Customer Service</b>
            <p>Our dedicated support team ensures quick responses and helpful solutions.</p>
          </div>

        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default About
