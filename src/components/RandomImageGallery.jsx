import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../lib/firebase";
import { ArrowDownToLine } from "lucide-react";
import ImageUploadButton from "./ImageUploaderButton";

export default function RandomImageCollage() {
  const [allImages, setAllImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [fadeState, setFadeState] = useState([true, true, true, true]); // true = visible

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(storage, "images");
        const result = await listAll(imagesRef);
        const allItems = result.items;
        const urls = await Promise.all(
          allItems.map((item) => getDownloadURL(item))
        );
        setAllImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (allImages.length === 0) return;
    const updateVisible = () => {
      if (allImages.length === 0) return;

      // Step 1: Fade out in sequence
      const fadeOutOrder = [0, 1, 2, 3]; // top-left, top-right, bottom-left, bottom-right
      fadeOutOrder.forEach((index, delayIdx) => {
        setTimeout(() => {
          setFadeState((prev) => {
            const copy = [...prev];
            copy[index] = false;
            return copy;
          });
        }, delayIdx * 150); // staggered by 150ms
      });

      // Step 2: Replace images after all are faded out
      setTimeout(() => {
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        setVisibleImages(shuffled.slice(0, 4));
      }, 700); // wait until fade out is done

      // Step 3: Fade in in same sequence
      fadeOutOrder.forEach((index, delayIdx) => {
        setTimeout(() => {
          setFadeState((prev) => {
            const copy = [...prev];
            copy[index] = true;
            return copy;
          });
        }, 900 + delayIdx * 150); // delay before fade in
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

      {/* Floating Upload Button */}
      <ImageUploadButton />
    </div>
  );
}
