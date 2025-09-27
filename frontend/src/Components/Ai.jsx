


import { useContext, useState } from "react";
import ai from "../assets/ai.png";
import { shopDataContext } from "../context/ShopDataContext";
import { useNavigate } from "react-router-dom";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [rotate, setRotate] = useState(false); // rotation state

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech Recognition not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-IN";

  let commandLock = false;
  const handleCommand = (action) => {
    if (commandLock) return;
    commandLock = true;
    action();
    setTimeout(() => (commandLock = false), 2000);
  };

  recognition.onstart = () => {
    console.log("🎤 Listening...");
    setListening(true);
    setRotate(true);
  };

  recognition.onend = () => {
    console.log("🛑 Stopped listening");
    setListening(false);
    setRotate(false);
  };

  recognition.onresult = (e) => {
    try {
      const transcript = e.results[e.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("User said 👉", transcript);

      // Mic control commands
      if (transcript.includes("mic on") || transcript.includes("start listening")) {
        handleCommand(() => {
          speak("Mic turned on");
          setRotate(true);
          recognition.start();
        });
      }
      if (transcript.includes("mic off") || transcript.includes("stop listening")) {
        handleCommand(() => {
          speak("Mic turned off");
          setRotate(false);
          recognition.stop();
        });
      }

      // Search open/close
      if ((transcript.includes("search") || transcript.includes("dhundh")) && transcript.includes("open") && !showSearch) {
        handleCommand(() => {
          speak("Opening search");
          setShowSearch(true);
          navigate("/collection");
        });
      } else if ((transcript.includes("search") || transcript.includes("dhundh")) && (transcript.includes("close") || transcript.includes("band")) && showSearch) {
        handleCommand(() => {
          speak("Closing search");
          setShowSearch(false);
        });
      }

      // Navigation commands
      if (transcript.includes("collection") || transcript.includes("products") || transcript.includes("saman")) {
        handleCommand(() => {
          speak("Opening collection page");
          navigate("/collection");
        });
      } else if (transcript.includes("about") || transcript.includes("info") || transcript.includes("bare me")) {
        handleCommand(() => {
          speak("Opening about page");
          navigate("/about");
          setShowSearch(false);
        });
      } else if (transcript.includes("home") || transcript.includes("homepage") || transcript.includes("ghar")) {
        handleCommand(() => {
          speak("Opening home page");
          navigate("/home");
          setShowSearch(false);
        });
      } else if (transcript.includes("cart") || transcript.includes("thela") || transcript.includes("basket")) {
        handleCommand(() => {
          speak("Opening your cart");
          navigate("/cart");
          setShowSearch(false);
        });
      } else if (transcript.includes("contact") || transcript.includes("sampark")) {
        handleCommand(() => {
          speak("Opening contact page");
          navigate("/contact");
          setShowSearch(false);
        });
      } else if (transcript.includes("order") || transcript.includes("my orders") || transcript.includes("meri order")) {
        handleCommand(() => {
          speak("Opening your orders page");
          navigate("/order");
          setShowSearch(false);
        });
      }
    } catch (err) {
      console.error("Result Handling Error 👉", err);
    }
  };

  recognition.onerror = (e) => {
    console.error("Speech Error 👉", e.error);
    setListening(false);
    setRotate(false);
  };

  const handleClick = () => {
    setRotate(true);
    recognition.start();
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-50"
      onClick={handleClick}
    >
      <div
        className={`w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] 
        bg-black/80 backdrop-blur-md rounded-full shadow-[0_0_25px_rgba(0,0,0,0.8)]
        flex items-center justify-center border border-gray-700
        hover:scale-110 transition-all duration-300 cursor-pointer
        ${listening ? "animate-pulse shadow-[0_0_40px_rgba(0,255,200,0.8)]" : "hover:shadow-[0_0_40px_rgba(0,255,200,0.7)]"}`}
      >
        <div
          className={`w-[65%] h-[65%] rounded-full flex items-center justify-center
          ${rotate ? "animate-spin" : ""}`}
        >
          <img
            src={ai}
            alt="AI Icon"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Ai;
