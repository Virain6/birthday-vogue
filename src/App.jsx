import { useEffect, useState } from "react";
import VogueCamera from "./components/VogueCamera";
import SecondPage from "./components/SecondPage";
import UploadAndGallery from "./components/UploadAndGallery";
import CountdownTimer from "./components/CountdownTimer";
import { ChevronRight } from "lucide-react";

const birthday = new Date("2025-08-18T00:00:00");

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [countdownOver, setCountdownOver] = useState(false);

  useEffect(() => {
    const checkCountdown = () => {
      const now = new Date();
      if (now >= birthday) {
        setCountdownOver(true);
      }
    };

    checkCountdown(); // check immediately
    const interval = setInterval(checkCountdown, 1000); // check every second

    return () => clearInterval(interval);
  }, []);

  const correctPassword = "Sukhmun2025";
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
      {!countdownOver ? (
        // Show countdown until birthday
        <section className="min-h-screen w-full bg-black">
          <CountdownTimer />
        </section>
      ) : !accessGranted ? (
        // Show password screen after countdown ends
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
              className="px-6 py-4 rounded-xl text-black bg-white focus:outline-none w-full max-w-lg text-2xl md:text-4xl"
            />
            <button
              type="submit"
              className="ml-4 p-4 text-black rounded-xl transition w-fit"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-pink-300" />
            </button>
          </form>
        </div>
      ) : (
        // Full site access after password
        <>
          <section className="min-h-screen w-full bg-black">
            <VogueCamera />
          </section>
          <section className="min-h-screen w-full bg-white">
            <UploadAndGallery />
          </section>
          <section className="min-h-screen w-full bg-black">
            <SecondPage />
          </section>
        </>
      )}
    </div>
  );
}
