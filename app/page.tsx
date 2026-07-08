import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MeetAndConnect from "@/components/MeetAndConnect";
import Booking from "@/components/Booking";
import Services from "@/components/Services";
import Subjects from "@/components/Subjects";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <MeetAndConnect />
        <Booking />
        <Services />
        <Subjects />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
