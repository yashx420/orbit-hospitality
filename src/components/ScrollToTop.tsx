import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable default scroll restoration
    window.history.scrollRestoration = "manual";

    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      const maxAttempts = 50; // Try for ~2.5 seconds (50 * 50ms)

      const checkForElement = () => {
        const element = document.getElementById(id);
        if (element) {
          // Element found, scroll to it
          element.scrollIntoView({ behavior: "smooth" });

          // Clean up the URL after scroll starts
          setTimeout(() => {
            window.history.replaceState(null, "", window.location.pathname);
          }, 1000);
        } else if (attempts < maxAttempts) {
          // Element not found yet, try again
          attempts++;
          setTimeout(checkForElement, 50);
        }
      };

      // Start polling
      checkForElement();
    } else {
      // Immediate scroll to top if no hash
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
