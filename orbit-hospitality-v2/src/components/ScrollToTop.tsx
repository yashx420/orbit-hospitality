import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Force manual scroll restoration to prevent browser from remembering position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If there is a hash, let the hash scrolling logic handle it
    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      const maxAttempts = 50; // Try for ~2.5 seconds

      const checkForElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Optional: Clean up URL after scroll
          setTimeout(
            () => window.history.replaceState(null, "", pathname),
            1000,
          );
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkForElement, 50);
        }
      };

      checkForElement();
    } else {
      // If no hash, SCROLL TO TOP IMMEDIATELY
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
