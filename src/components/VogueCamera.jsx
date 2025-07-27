// src/components/VogueCamera.jsx
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas-pro";

export default function VogueCamera() {
  const webcamRef = useRef(null);
  const flashRef = useRef(null);
  const captureRef = useRef(null);

  const captureScreenshot = async () => {
    try {
      const buttonContainer = document.querySelector(
        ".screenshot-button-container"
      );
      if (buttonContainer) buttonContainer.style.display = "none";

      // Get a still frame from the webcam
      const video = webcamRef.current.video;
      if (video) {
        video.style.filter = "grayscale(100%)";
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      const screenshot = webcamRef.current.getScreenshot();

      // Create a new image element with the screenshot
      const webcamImage = document.createElement("img");
      webcamImage.src = screenshot;
      webcamImage.style.position = "absolute";
      webcamImage.style.top = 0;
      webcamImage.style.left = 0;
      webcamImage.style.width = "100%";
      webcamImage.style.height = "100%";
      webcamImage.style.objectFit = "cover";
      webcamImage.style.zIndex = "1";
      webcamImage.style.transform = "scaleX(-1)";
      webcamImage.style.filter = "grayscale(100%)";

      // Hide the webcam video temporarily
      if (video) video.style.display = "none";

      // Add the image over the webcam
      const captureTarget = captureRef.current;
      captureTarget.appendChild(webcamImage);

      // Capture screenshot of the full section
      const canvas = await html2canvas(captureTarget, {
        backgroundColor: null,
        useCORS: true,
        logging: true,
      });

      // Convert the canvas to grayscale
      const ctx = canvas.getContext("2d");
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
      }
      ctx.putImageData(imgData, 0, 0);

      // Download the image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "vogue-screenshot.png";
      link.click();

      // Cleanup
      if (video) video.style.display = "";
      captureTarget.removeChild(webcamImage);

      if (buttonContainer) buttonContainer.style.display = "";
    } catch (error) {
      console.error("Screenshot failed:", error);
    }
  };

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
    <section
      ref={captureRef}
      className="relative min-w-screen min-h-screen bg-black overflow-hidden pt-2"
    >
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
          className="w-full h-full object-cover transform scale-x-[-1] filter grayscale"
          videoConstraints={{ facingMode: "user" }}
        />
      </div>
      {/* VOGUE Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none w-full">
        <div className="absolute top-6 w-full z-30">
          <div className="flex justify-center">
            <h1 className="text-black text-[29vw] md:text-[16vw] leading-none font-vogue tracking-wider relative">
              VOGUE
            </h1>
          </div>
          <div className="absolute left-6 top-[calc(6rem+7vw)] ml-4">
            <p className="text-black text-sm md:text-lg font-vogue tracking-[0.5em] text-left">
              LIMITED EDITION
            </p>
          </div>
        </div>

        <div className="absolute top-[25%] right-10 text-right font-vogue text-black text-xs sm:text-sm leading-tight max-w-[40vw]">
          <div className="uppercase -space-y-4">
            <p className="text-black font-vogue text-2xl sm:text-3xl">
              Cheers to
            </p>
            <p className="text-black font-vogue text-[100px] sm:text-[100px] italic">
              23
            </p>
            <p className="text-black font-vogue text-4xl sm:text-4xl">Years</p>
          </div>
        </div>

        <div className="absolute bottom-[20%] left-4 text-left font-vogue text-black text-[15px] sm:text-sm leading-snug space-y-1 break-words w-full max-w-[40vw]">
          <p>INSIDE SUKHMUN’S WORLD</p>
          <p>SPECIAL FRIENDS + A LOOK INSIDE</p>
          <p>STYLE, VIBES, VISION</p>
        </div>

        <div className="absolute bottom-4 w-full text-center font-vogue text-black -space-y-2">
          <p className="text-[16vw] md:text-[8vw] leading-none">SUKHMUN</p>
          <p className="text-lg sm:text-lg italic">
            hottest thing august has to offer
          </p>
        </div>
      </div>{" "}
      <div className="screenshot-button-container absolute z-50 bottom-6 right-6">
        <button
          onClick={captureScreenshot}
          className="flex items-center justify-center w-13 h-13 rounded-full border-4 border-white"
        >
          <div className="w-10 h-10 bg-white rounded-full" />
        </button>
      </div>
    </section>
  );
}
