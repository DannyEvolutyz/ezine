import MarketingLayout from "@/components/MarketingLayout";
import HeroSection from "@/components/home/HeroSection";
import WhatIsEzine from "@/components/home/WhatIsEzine";
import WhyEzine from "@/components/home/WhyEzine";
import ThreeSteps from "@/components/home/ThreeSteps";
import SmartWithAI from "@/components/home/SmartWithAI";
import UseCases from "@/components/home/UseCases";
import ContactSection from "@/components/home/ContactSection";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import OtherProducts from "@/components/home/OtherProducts";

const Index = () => {
  return (
    <MarketingLayout>
      <HeroSection />
      <WhatIsEzine />
      <WhyEzine />
      <ThreeSteps />
      <SmartWithAI />
      <UseCasesContact />
      <Testimonials />
      <FaqSection />
      <OtherProducts />
    </MarketingLayout>
  );
};

export default Index;
