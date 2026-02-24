import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import AboutSection from "@/components/AboutSection";
import BusinessSection from "@/components/BusinessSection";
import RiderSection from "@/components/RiderSection";
import HowItWorks from "@/components/HowItWorks";
import WaitlistForm from "@/components/WaitlistForm";
import VisionStatement from "@/components/VisionStatement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SocialProof />
      <AboutSection />
      <BusinessSection />
      <RiderSection />
      <HowItWorks />
      <WaitlistForm />
      <VisionStatement />
      <Footer />
    </main>
  );
}
