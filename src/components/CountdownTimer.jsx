import { useEffect, useState } from "react";

const targetDate = new Date("2025-08-18T00:00:00");

export default function CountdownTimer() {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-vogue text-center tracking-wider px-4 fade-in">
      <div className="flex gap-6 flex-wrap justify-center text-6xl md:text-[120px] lg:text-[220px] font-bold">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="flex flex-col items-center px-4 py-3 rounded-xl"
          >
            <span className="text-pink-300">
              {value.toString().padStart(2, "0")}
            </span>
            <span className="text-sm md:text-3xl lg:text-6xl text-white/70 mt-2">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
