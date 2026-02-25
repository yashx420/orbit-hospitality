import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout.tsx";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";

// Lazy-loaded pages to reduce initial bundle size
const Home = lazy(() => import("./pages/Home.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Properties = lazy(() => import("./pages/Properties"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Loading fallback specifically for React Router Suspense
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-orbit-dark flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-orbit-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Preloader>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties/:category" element={<Properties />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </Preloader>
  );
}

export default App;
