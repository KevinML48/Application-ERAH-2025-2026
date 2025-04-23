// resources/js/Pages/Welcome.jsx
import Header from '@/Components/Welcome/sections/Header.jsx';
import Hero from '@/Components/Welcome/sections/Hero.jsx';
import Features from '@/Components/Welcome/sections/Features.jsx';
import Pricing from '@/Components/Welcome/sections/Pricing.jsx';
import Faq from '@/Components/Welcome/sections/Faq.jsx';
import Testimonials from '@/Components/Welcome/sections/Testimonials.jsx';
import Download from '@/Components/Welcome/sections/Download.jsx';
//import Footer from "@/Components/Welcome/sections/Footer.jsx";

export default function Welcome() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Testimonials />
      <Download />
      {/*<Footer />*/}
    </main>
  );
}
