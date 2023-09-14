import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [setshowScrollTopButton, setsetshowScrollTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.screenY > 300) {
        setsetshowScrollTopButton(true);
      } else {
        setsetshowScrollTopButton(false);
      }
    });
  }, []);

  const scrollTop = (elementRef) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return <div>ScrollToTop</div>;
};

export default ScrollToTop;
