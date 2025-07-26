// src/components/VogueCamera.jsx
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

export default function VogueCamera() {
  const webcamRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const flashFromDirections = [
      { x: "10%", y: "50%" }, // left
      { x: "90%", y: "50%" }, // right
      { x: "50%", y: "10%" }, // top
      { x: "10%", y: "10%" }, // top left
      { x: "90%", y: "10%" }, // top right
    ];

    const triggerFlash = () => {
      if (!flashRef.current) return;

      const flashCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 flashes

      for (let i = 0; i < flashCount; i++) {
        setTimeout(() => {
          const { x, y } =
            flashFromDirections[
              Math.floor(Math.random() * flashFromDirections.length)
            ];
          flashRef.current.style.setProperty("--flash-x", x);
          flashRef.current.style.setProperty("--flash-y", y);
          flashRef.current.style.opacity = "0.8";
          setTimeout(() => {
            flashRef.current.style.opacity = "0";
          }, 600);
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
            "radial-gradient(circle at var(--flash-x, 50%) var(--flash-y, 50%), rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 15%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0.05) 60%, transparent 80%)",
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
          <h1 className="text-white text-[25vw] sm:text-[16vw] leading-none font-vogue tracking-wider">
            VOGUE
          </h1>
        </div>

        {/* Bottom right: SUKHMUN + Birthday */}
        <div className="text-center pb-10">
          <h2 className="text-white text-[15vw]  md:text-[7vw] leading-none  font-thin font-vogue  tracking-wide">
            SUKHMUN
          </h2>
          <p className="text-white italic text-[3vw] sm:text-[1.5vw] tracking-wider uppercase font-vogue">
            "Bitches it's my mfing 23rd Birthday"
          </p>
        </div>

        {/* Bottom left: custom message */}
        <div className="absolute right-4 text-white font-light font-arapey space-y-1 text-right top-[30vw] sm:top-[30%]">
          <p className="text-pink-500 uppercase text-4xl md:text-6xl tracking-wider">
            Born on
          </p>
          <p className="text-pink-500 uppercase font-bold text-xl md:text-[33px]">
            August 18, 2002
          </p>
          <p className="uppercase font-arapey text-[29px] md:text-[47px]">
            A true icon
          </p>
          <p className="uppercase font-arapey font-thin text-[28px] md:text-[46px]">
            Still making
          </p>
          <p className="uppercase font-arapey text-[18px] md:text-[29px]">
            <span className="text-pink-500 font-semibold">"your mom"</span>{" "}
            <span className="text-white">Jokes</span>
          </p>
          <p className="uppercase font-arapey text-[1.04rem] md:text-[27px]">
            Enjoying like never
          </p>
          <p className="uppercase font-arapey font-thin text-[1.8rem] md:text-[46px]">
            seen before
          </p>
        </div>
      </div>{" "}
    </section>
  );
}
