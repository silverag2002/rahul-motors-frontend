import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import Marquee from "@/components/public/Marquee";
import Catalogue from "@/components/public/Catalogue";
import About from "@/components/public/About";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";
import WhatsAppFab from "@/components/public/WhatsAppFab";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Catalogue />
      <About />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
