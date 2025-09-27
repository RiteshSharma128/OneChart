import NewLetterBox from "../Components/NewLetterBox"
import Title from "../Components/Title"
import contact from '../assets/contact.jpg'

function Contact() {
  return (
    <div className="w-[99vw] md:w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center flex-col justify-center pt-[80px] gap-[50px]">
      <Title text1={'CONTACT'} text2={'US'} />

      <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center">
          <img
            src={contact}
            alt="Contact"
            className="lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm"
          />
        </div>

        {/* Info Section */}
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]">
          <p className="lg:w-[80%] w-[100%] text-white font-bold lg:text-[18px] text-[15px]">Our Store</p>

          <div className="lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]">
            <p>12345 Random Station</p>
            <p>Random City, Station, State, India</p>
            <p>Telephone No: +91-8579980978</p>
            <p>Email: admin@onecart.com</p>
          </div>

          <p className="lg:w-[80%] w-[100%] text-white text-[15px] font-bold lg:text-[18px] mt-[10px]">Careers at OneCart</p>
          <p className="lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]">Learn more about our teams and job openings</p>
          <button className="px-[30px] py-[20px] flex items-center justify-center text-white bg-transparent border active:bg-slate-600 rounded-md">
            Explore job
          </button>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default Contact
