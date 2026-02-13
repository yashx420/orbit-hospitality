import Hero from "../components/sections/Hero";
import Experience from "../components/sections/Experience";
import BentoGrid from "../components/sections/BentoGrid";
import RoomRibbon from "../components/sections/RoomRibbon";
import Stats from "../components/sections/Stats";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Experience />
      <BentoGrid />
      <Stats />
      <RoomRibbon />
      <Contact />
    </>
  );
};

export default Home;
