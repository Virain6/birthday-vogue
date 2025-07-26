// src/components/VogueCamera.jsx
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

export default function VogueCamera() {
  const webcamRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const flashFromDirections = [
      "left",
      "right",
      "top",
      "top left",
      "top right",
    ];

    const triggerFlash = () => {
      if (!flashRef.current) return;

      const flashCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 flashes

      for (let i = 0; i < flashCount; i++) {
        setTimeout(() => {
          const direction =
            flashFromDirections[
              Math.floor(Math.random() * flashFromDirections.length)
            ];

          let x = "50%";
          let y = "50%";

          switch (direction) {
            case "left":
              x = "0%";
              y = "50%";
              break;
            case "right":
              x = "100%";
              y = "50%";
              break;
            case "top":
              x = "50%";
              y = "0%";
              break;
            case "top left":
              x = "0%";
              y = "0%";
              break;
            case "top right":
              x = "100%";
              y = "0%";
              break;
          }

          flashRef.current.style.setProperty("--flash-x", x);
          flashRef.current.style.setProperty("--flash-y", y);
          flashRef.current.style.opacity = "1";
          setTimeout(() => {
            flashRef.current.style.opacity = "0";
          }, 300);
        }, i * 200);
      }

      const next = Math.random() * 3000 + 1000;
      setTimeout(triggerFlash, next);
    };

    triggerFlash();
  }, []);

  return (
    <section className="relative min-w-screen min-h-screen bg-black overflow-hidden">
      {/* Flash effect */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 z-50 pointer-events-none"
        style={{
          transition: "opacity 0.3s ease-out",
          opacity: 0,
          pointerEvents: "none",
          mixBlendMode: "lighten",
          // Optionally: add radial gradient for directional flash
          background:
            "radial-gradient(circle at var(--flash-x, 50%) var(--flash-y, 50%), rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 10%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.0) 60%)",
        }}
      />

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

      {/* VOGUE Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between w-full px-4">
        <div className="pt-6 flex flex-col items-center w-full">
          <h1 className="text-white text-[25vw] sm:text-[16vw] leading-none font-serif tracking-wider">
            VOGUE
          </h1>
        </div>

        {/* Bottom right: SUKHMUN + Birthday */}
        <div className="text-center pb-10 space-y-2">
          <h2 className="text-pink-500 text-[15vw]  md:text-[5vw] font-serif font-bold tracking-wide">
            SUKHMUN
          </h2>
          <p className="text-white italic text-[4vw] sm:text-[2vw] tracking-wider uppercase font-serif">
            "Bitches it's my mfing 23rd Birthday"
          </p>
        </div>

        {/* Bottom left: custom message */}
        <div className="absolute right-4 text-white font-light font-arapey space-y-1 text-right top-[30vw] sm:top-[30%]">
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
