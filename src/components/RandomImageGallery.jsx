import React, { useEffect, useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import ImageUploadButton from "./ImageUploaderButton";
import { useSharedImages } from "../lib/useSharedImages";

export default function RandomImageCollage() {
  const allImages = useSharedImages();
  const [visibleImages, setVisibleImages] = useState([]);
  const [fadeState, setFadeState] = useState([true, true, true, true]);

  useEffect(() => {
    if (allImages.length === 0) return;

    const updateVisible = () => {
      // Step 1: Fade out in sequence
      const fadeOutOrder = [0, 1, 2, 3];
      fadeOutOrder.forEach((index, delayIdx) => {
        setTimeout(() => {
          setFadeState((prev) => {
            const copy = [...prev];
            copy[index] = false;
            return copy;
          });
        }, delayIdx * 150);
      });

      // Step 2: Replace images after all are faded out
      setTimeout(() => {
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        setVisibleImages(shuffled.slice(0, 4));
      }, 700);

      // Step 3: Fade in in same sequence
      fadeOutOrder.forEach((index, delayIdx) => {
        setTimeout(() => {
          setFadeState((prev) => {
            const copy = [...prev];
            copy[index] = true;
            return copy;
          });
        }, 900 + delayIdx * 150);
      });
    };

    updateVisible();
    const interval = setInterval(updateVisible, 8000);
    return () => clearInterval(interval);
  }, [allImages]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "vogue_photo.png";
    link.click();
  };

  return (
    <div className="w-screen h-screen bg-white text-white relative overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2 p-2">
        {visibleImages.map((url, index) => (
          <div key={url} className="relative w-full h-full">
            <img
              src={url}
              alt="collage"
              className={`w-full h-full object-cover transition-opacity duration-500 grayscale ${
                fadeState[index] ? "opacity-100" : "opacity-0"
              }`}
            />
            <button
              onClick={() => handleDownload(url)}
              className="absolute bottom-2 right-2 w-10 h-10 flex items-center justify-center bg-white rounded-full text-black shadow-lg opacity-90 hover:opacity-100 transition"
            >
              <ArrowDownToLine className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <ImageUploadButton />
    </div>
  );
}
