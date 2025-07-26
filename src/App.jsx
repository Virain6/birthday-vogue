import VogueCamera from "./components/VogueCamera";
import SecondPage from "./components/SecondPage";

export default function App() {
  return (
    <div className="bg-black text-white overflow-y-auto h-screen scroll-smooth">
      <section className="min-h-screen w-full bg-black">
        <VogueCamera />
      </section>
      <section className="min-h-screen w-full bg-black">
        <SecondPage />
      </section>
    </div>
  );
}
