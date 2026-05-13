import Features from "@/features/landingPage/layout/features";
import Hero from "@/features/landingPage/layout/hero";
import Navbar from "@/features/landingPage/layout/navbar";
import About from "@/features/landingPage/layout/about";

export default function HomeLading() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
    </>
  );
}
