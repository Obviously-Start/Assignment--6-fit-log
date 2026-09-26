import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Library from "./components/Library";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Library />
      </main>
    </>
  );
}
