import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { quoteLayers } from "../quoteData";
const images = import.meta.glob("../assets/floating/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
});
const allImages = Object.values(images);

export default function SecondPage() {
  const [width, height] = useWindowSize();
  return (
    <div className="relative overflow-hidden h-screen bg-white">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[5] space-y-4 text-center grayscale">
        {/* Moving gradient animation keyframes */}
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

        <h1
          className="uppercase text-4xl sm:text-6xl font-extrabold font-vogue text-black tracking-wider 
         animate-gradient"
        >
          Happy Birthday
        </h1>
        <h1
          className="uppercase text-5xl sm:text-7xl font-extrabold font-vogue text-black stracking-wider 
        animate-gradient"
        >
          Sukhmun
        </h1>
      </div>
      {[...Array(4)].map((_, layer) => {
        const quotes = quoteLayers[layer] || [];
        const numItems = quotes.length + 2;
        const items = Array.from({ length: numItems }, () => {
          return allImages[Math.floor(Math.random() * allImages.length)];
        });

        const usedPositions = [];

        const verticalBands = Array.from({ length: 8 }, (_, i) => i * 10); // 0, 10, 20,...70

        const floatingItems = items.map((item, index) => {
          const isImage = allImages.includes(item);
          let leftVal, topOffset;

          for (let attempts = 0; attempts < 20; attempts++) {
            const leftRaw = Math.floor(Math.random() * 90);
            const leftRounded = Math.round(leftRaw / 5) * 5;

            const bandIndex = index % verticalBands.length;
            const topRounded = verticalBands[bandIndex];

            const key = `${leftRounded}-${topRounded}`;
            if (!usedPositions.includes(key)) {
              usedPositions.push(key);
              leftVal = `${leftRounded}%`;
              topOffset = `${topRounded}vh`;
              break;
            }
          }

          const duration = `${10 + layer * 6}s`;
          const delay = `${index * (parseFloat(duration) / items.length)}s`;
          let zIndex;
          if (layer === 0) zIndex = 2;
          else if (layer === 1) zIndex = 4;
          else if (layer === 2) zIndex = 6;
          else if (layer === 3) zIndex = 8;
          const opacity = 1;
          const color = `hsl(${Math.floor(Math.random() * 360)}, 50%, 85%)`; // pastel/muted tone
          const sizeScale = 1 + Math.random() * 1.2; // scale between 0.8x and 2x
          const fontSize = `${sizeScale * 1.25}rem`; // text size varies
          const imgWidth = `${sizeScale * 120}px`; // image width varies

          return (
            <div
              key={`layer-${layer}-item-${index}`}
              className={`absolute px-4 py-2 rounded-xl text-white text-center font-arapey text-[0.9rem] sm:text-[1.1rem] md:text-[1.25rem] lg:text-[1.5rem]`}
              style={{
                left: leftVal || `${Math.floor(Math.random() * 90)}%`,
                bottom: "-15vh",
                backgroundColor: isImage ? "transparent" : color,
                animation: `floatUp-${layer}-${index} ${duration} linear infinite`,
                animationDelay: delay,
                zIndex,
                opacity,
                // fontSize: isImage ? undefined : fontSize,
                color: isImage ? undefined : "#111",
                textShadow: isImage
                  ? undefined
                  : "1px 1px 2px rgba(255,255,255,0.9)",
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
                .map((_, index) => {
                  return `
                  @keyframes floatUp-${layer}-${index} {
                    0% { transform: translateY(150vh); }
                    100% { transform: translateY(-120vh); }
                  }
                `;
                })
                .join("\n")}
            </style>
          </div>
        );
      })}
    </div>
  );
}
