import { useEffect, useState } from "react";

export default function useIsMobile() {
  const mediaQuery = "(max-width: 769px)";

  const [isMobile, setIsMobile] = useState(
    window.matchMedia(mediaQuery).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);

    const listener = (e) => {
      setIsMobile(e.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, []);

  return isMobile;
}
