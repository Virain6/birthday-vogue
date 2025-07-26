// src/components/VogueCamera.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function VogueCamera() {
  const webcamRef = useRef(null);
  const [flash, setFlash] = useState(false);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };

  return (
    <section className="relative min-w-screen min-h-screen bg-black overflow-hidden">
      {/* Flash effect */}
      {flash && (
        <div className="absolute inset-0 bg-white opacity-70 animate-pulse z-50" />
      )}

      {/* Webcam full background */}
      <div className="absolute inset-0 z-0">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover transform scale-x-[-1]"
          videoConstraints={{ facingMode: "user" }}
        />
      </div>

      {/* Flash test button */}
      <button
        onClick={triggerFlash}
        className="absolute bottom-4 right-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all z-30"
      >
        Test Flash
      </button>
      {/* VOGUE Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between w-full px-4">
        <div className="text-center pt-6">
          <h1 className="text-white text-[25vw] sm:text-[16vw] leading-none font-serif tracking-wider">
            VOGUE
          </h1>
        </div>

        {/* Bottom right: SUKHMUN + Birthday */}
        <div className="text-center pb-10 space-y-2">
          <h2 className="text-pink-500 text-[15vw] sm:text-[25vw] md:text-[5vw] font-serif font-bold tracking-wide">
            SUKHMUN
          </h2>
          <p className="text-white italic text-[4vw] sm:text-[2vw] tracking-wider uppercase font-serif">
            "Bitches it's my mfing 23rd Birthday"
          </p>
        </div>

        {/* Bottom left: custom message */}
        <div className="absolute top-[30%] right-6 text-white text-md md:text-lg font-light font-arapey space-y-1 text-right">
          <p className="text-pink-400 uppercase text-4xl md:text-6xl tracking-wider">
            Born on
          </p>
          <p className="text-pink-500 uppercase font-bold text-xl md:text-[33px]">
            August 18, 2002
          </p>
          <p>Celebrating joy, style, and magic.</p>
          <p>Here's to unforgettable memories 🎉</p>
        </div>
      </div>
    </section>
  );
}
