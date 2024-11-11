import "./style.scss";
import { useState, useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

// List of links to display
const Links: string[] = ["Link 1", "Link 2", "Link 3", "Link 4", "Link 5"];

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [scope, animate] = useAnimate();

  // Animation for the list with a staggered delay
  const staggerList = stagger(0.1, { startDelay: 0.25 });

  useEffect(() => {
    // Animate the <ul> element based on the "open" state
    animate(
      "ul",
      {
        width: open ? 160 : 0,
        height: open ? 200 : 0,
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      }
    );

    // Animate the <li> elements with a staggered effect
    animate(
      "li",
      open
        ? { opacity: 1, scale: 1, x: 0 }
        : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0,
      }
    );
  }, [open, animate, staggerList]); // Dependencies for useEffect

  return (
    <div className="app" ref={scope}>
      {/* Button to toggle the menu visibility */}
      <motion.button onClick={() => setOpen((prev) => !prev)}>
        {open ? "Close Menu" : "Open Menu"}
      </motion.button>

      {/* List of items with animation */}
      <motion.ul>
        {Links.map((link, index) => (
          <motion.li key={index}>{link}</motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default App;
