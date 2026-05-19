import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeatureHighlights from "@/components/sections/FeatureHighlights";
import PopularClasses from "@/components/sections/PopularClasses";
import InstructorSection from "@/components/sections/InstructorSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-offwhite selection:bg-sage selection:text-background">
      <Navbar />
      <HeroSection />
      <FeatureHighlights />
      <PopularClasses />
      <InstructorSection />
      <TestimonialSection />
      <PricingSection />
      {/* Call to Action Section */}
      <section className="py-128 px-32 text-center bg-gradient-to-b from-background to-primary/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[40px] md:text-h1 mb-32">Start Your Yoga Journey Today</h2>
          <p className="text-accent mb-48 text-h3 font-light">Join thousands of mindful individuals on the path to wellness.</p>
          <button className="bg-sage text-background px-48 py-20 rounded-12 font-bold text-h3 hover:scale-105 transition-transform">
            JOIN OUR COMMUNITY
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
