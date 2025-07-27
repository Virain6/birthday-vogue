// src/components/ImageUploadButton.jsx
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";
import { Upload } from "lucide-react";

export default function ImageUploadButton() {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        alert("Upload failed");
        setUploading(false);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref);
        alert("Upload successful");
        setUploading(false);
      }
    );
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      <label
        className={`
      cursor-pointer 
      px-4 py-2 
      bg-black text-white 
      rounded-full shadow-md 
      hover:bg-gray-800 
      transition-all duration-300 ease-in-out 
      flex items-center justify-center
      min-w-[48px]
      ${uploading ? "px-6" : "w-12 h-12"}
    `}
      >
        {uploading ? (
          <span className="font-medium">Uploading...</span>
        ) : (
          <Upload className="w-6 h-6" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
