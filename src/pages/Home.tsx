import Hero from "../components/sections/Hero";
import Experience from "../components/sections/Experience";
import Services from "../components/sections/Services";
import Stats from "../components/sections/Stats";
import RoomRibbon from "../components/sections/RoomRibbon";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
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
