// src/lib/useSharedImages.js
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "./firebase";

let cachedImages = null;
let loadingPromise = null;

export const useSharedImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (cachedImages) {
      setImages(cachedImages);
    } else {
      if (!loadingPromise) {
        loadingPromise = listAll(ref(storage, "images")).then(
          async (result) => {
            const urls = await Promise.all(
              result.items.map((item) => getDownloadURL(item))
            );
            cachedImages = urls;
            return urls;
          }
        );
      }
      loadingPromise.then(setImages).catch(console.error);
    }
  }, []);

  return images;
};
