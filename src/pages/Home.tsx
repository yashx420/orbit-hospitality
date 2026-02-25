import Hero from "../components/sections/Hero";
import Experience from "../components/sections/Experience";
import Services from "../components/sections/Services";
import Stats from "../components/sections/Stats";
import RoomRibbon from "../components/sections/RoomRibbon";
import Testimonials from "../components/sections/Testimonials";
import BookingFlow from "../components/sections/BookingFlow";
import HelpSection from "../components/sections/HelpSection";
import Contact from "../components/sections/Contact";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Orbit Hospitality"
        description="Experience the epitome of luxury with Orbit Hospitality's exclusive villas, hotels, and serviced apartments in Bangalore."
      />
      <Hero />
      <Experience />
      <Services />
      <RoomRibbon />
      <Testimonials />
      <Stats />
      <BookingFlow />
      <HelpSection />
      <Contact />
    </>
  );
};

export default Home;
