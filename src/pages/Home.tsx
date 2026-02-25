import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Services from "../components/sections/Services";
import Stats from "../components/sections/Stats";
import RoomRibbon from "../components/sections/RoomRibbon";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Luxury Stays & Experiences"
        description="Experience the epitome of luxury with Orbit Hospitality's exclusive villas, hotels, and serviced apartments in Bangalore."
      />
      <Hero />
      <About />
      <Experience />
      <Services />
      <RoomRibbon />
      <Testimonials />
      <Stats />
      <Contact />
    </>
  );
};

export default Home;
