import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useSharedImages } from "../lib/useSharedImages";

export default function SecondPage() {
  const [width, height] = useWindowSize();
  const allImages = useSharedImages();

  return (
    <div className="relative overflow-hidden h-screen bg-white">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[5] space-y-4 text-center grayscale">
        <style>
          {`
            @keyframes animateGradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: animateGradient 6s ease infinite;
            }
          `}
        </style>
        <Confetti
          width={width}
          height={height}
          numberOfPieces={100}
          gravity={0.1}
        />

        <h1 className="uppercase text-4xl sm:text-6xl font-extrabold font-vogue text-black tracking-wider animate-gradient">
          Happy Birthday
        </h1>
        <h1 className="uppercase text-5xl sm:text-7xl font-extrabold font-vogue text-black animate-gradient">
          Sukhmun
        </h1>
      </div>

      {[...Array(4)].map((_, layer) => {
        const numItems = 6;
        const items = Array.from({ length: numItems }, () => {
          return allImages[Math.floor(Math.random() * allImages.length)];
        });

        const usedPositions = [];
        const verticalBands = Array.from({ length: 8 }, (_, i) => i * 10);

        const floatingItems = items.map((item, index) => {
          let leftVal;
          for (let attempts = 0; attempts < 20; attempts++) {
            const leftRaw = Math.floor(Math.random() * 90);
            const leftRounded = Math.round(leftRaw / 5) * 5;
            const bandIndex = index % verticalBands.length;
            const topRounded = verticalBands[bandIndex];
            const key = `${leftRounded}-${topRounded}`;
            if (!usedPositions.includes(key)) {
              usedPositions.push(key);
              leftVal = `${leftRounded}%`;
              break;
            }
          }

          const duration = `${10 + layer * 6}s`;
          const delay = `${index * (parseFloat(duration) / items.length)}s`;
          const zIndex = 2 + layer * 2;
          const imgWidth = `${(1 + Math.random() * 1.2) * 120}px`;

          return (
            <div
              key={`layer-${layer}-item-${index}`}
              className="absolute"
              style={{
                left: leftVal || `${Math.floor(Math.random() * 90)}%`,
                bottom: "-15vh",
                animation: `floatUp-${layer}-${index} ${duration} linear infinite`,
                animationDelay: delay,
                zIndex,
              }}
            >
              <img
                src={item}
                alt="floating"
                className="object-contain rounded shadow-lg grayscale"
                style={{
                  width: imgWidth,
                  height: "auto",
                  maxHeight: "300px",
                }}
              />
            </div>
          );
        });

        return (
          <div key={`layer-wrapper-${layer}`}>
            {floatingItems}
            <style>
              {items
                .map(
                  (_, index) => `
                @keyframes floatUp-${layer}-${index} {
                  0% { transform: translateY(150vh); }
                  100% { transform: translateY(-120vh); }
                }
              `
                )
                .join("\n")}
            </style>
          </div>
        );
      })}
    </div>
  );
}
