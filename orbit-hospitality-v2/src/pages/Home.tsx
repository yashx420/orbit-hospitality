import Hero from "../components/sections/Hero";

import About from "../components/sections/About";
import Services from "../components/sections/Services";
import FeaturedRooms from "../components/sections/FeaturedRooms";
import Stats from "../components/sections/Stats";
import Contact from "../components/sections/Contact";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Luxury Stays & Exquisite Living"
        description="Experience the pinnacle of luxury with Orbit Hospitality. From private villas to boutique hotels, discover your sanctuary with our handpicked luxury properties."
        keywords="luxury hotels, boutique hotels, private villas, luxury stays, Orbit Hospitality"
      />
      <Hero />
      <About />
      <Services />
      <FeaturedRooms />
      <Stats />
      <Contact />
    </>
  );
};

export default Home;
