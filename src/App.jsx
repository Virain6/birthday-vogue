import { useState } from "react";
import VogueCamera from "./components/VogueCamera";
import SecondPage from "./components/SecondPage";
import { ChevronRight } from "lucide-react";

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const correctPassword = "sukhmun2025";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setAccessGranted(true);
    } else {
      alert("Incorrect password. Try again.");
    }
  };

  return (
    <div className="bg-black text-white overflow-y-auto h-screen scroll-smooth">
      {!accessGranted ? (
        <div className="flex items-center justify-center h-screen bg-white">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-4 rounded-xl bg-opacity-70 font-vogue"
          >
            <input
              type="text"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="px-6 py-4 rounded-xl text-black bg-white focus:outline-none  w-full max-w-lg text-2xl md:text-4xl"
            />
            <button
              type="submit"
              className="ml-4 p-4 text-pink rounded-xl transition w-fit"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-pink-500 hover:text-pink-300" />
            </button>
          </form>
        </div>
      ) : (
        <>
          <section className="min-h-screen w-full bg-black">
            <VogueCamera />
          </section>
          <section className="min-h-screen w-full bg-black">
            <SecondPage />
          </section>
        </>
      )}
    </div>
  );
}
