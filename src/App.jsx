import "./App.css";
import "./pages/template/photographyTemplate";
import NavBarComponent from "./components/homepage/NavBarComponent";
import HeroSection from "./components/homepage/HeroSection";
import TemplatesSection from "./components/homepage/TemplatesSection";
import FeatureSection from "./components/homepage/FeatureSection";
import OurTeamSection from "./components/homepage/OurTeamSection";
import FooterSection from "./components/homepage/FooterSection";
import ContactSection from "./components/homepage/ContactSection";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/seo/SEO";
import ScrollToTopButton from "./components/homepage/ScrollToTopButton";
import SliderComponent from "./components/homepage/SliderComponent";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
function App() {
  const location = useLocation();

  useEffect(() => {
    const allowedPaths = [
      "/dashboard/developer",
      "/dashboard/business",
      "/dashboard/marketing",
      "/dashboard/photography",
    ];

    if (!allowedPaths.includes(location.pathname)) {
      clearEditingState();
    }
  }, [location]);

  const clearEditingState = () => {
    localStorage.removeItem("isEditing");
  };

  const meta = {
    title: "Showcase",
    description:
      "Showcase: Build and customize your professional portfolio effortlessly. Choose templates, edit content, and share your portfolio online.",
    keywords:
      "portfolio builder, professional portfolio, website builder, templates, portfolio customization, Showcase",
    image: "/Showcase.png",
  };
  return (
    <HelmetProvider>
      <SEO {...meta} />
      <header>
        <NavBarComponent />
      </header>
      <main>
        <HeroSection />
        <SliderComponent />
        <TemplatesSection />
        <FeatureSection />
        <OurTeamSection />
        <ContactSection />
      </main>
      <footer>
      <FooterSection />
      </footer>
      <ScrollToTopButton />
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
