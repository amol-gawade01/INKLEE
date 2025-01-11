import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WelcomePage() {

    const userStatus = useSelector((store) => store.auth.status)
    const navigate =  useNavigate()
    const handleClick = () => {
           if (userStatus) {
              navigate('/add-post')
           }else{
            navigate('/login')
           }
    }
  return (
    <div className="relative w-full max-w-[90vw] h-[80vh]  bg-black rounded-xl mt-5 overflow-hidden select-none">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/vipeocloud/image/upload/v1736617789/typewritter_w8xigs.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        alt="Typewriter"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-center lg:flex items-center lg:justify-between lg:text-center w-1/2 lg:w-full h-full px-10">
        {/* Button on the Left */}
        <button className="bg-white text-black px-10 py-2 rounded-full text-lg font-semibold shadow-md lg:mt-96 ml-7" onClick={handleClick}>
          Create
        </button>

        {/* Paragraph on the Right */}
        <p className="text-white font-semibold text-7xl mr-12 lg:mr-20 lg:text-9xl xl:text-[10rem] w-2/4 text-right leading-tight">
          Write Your Thoughts
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;