import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import CTA from "./components/CTA.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Effects, Marquee } from "./components/Effects.jsx";
import fallbackProfile from "./data/profile.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/profile";
const SECTION_IDS = ["home", "about", "skills", "experience", "projects", "contact"];

export default function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch(() => {
        // Backend not reachable — keep using the bundled fallback data.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Highlight the nav item for whichever section is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [profile]);

  // Fade/slide elements into view as the user scrolls to them.
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [profile]);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Effects />
      <Navbar profile={profile} active={active} onNavigate={goTo} />
      <Hero profile={profile} onNavigate={goTo} />
      <Marquee skills={profile.skills} />
      <About profile={profile} />
      <Skills profile={profile} />
      <Experience profile={profile} />
      <Projects profile={profile} />
      <CTA profile={profile} onNavigate={goTo} />
      <Contact profile={profile} />
      <Footer profile={profile} onNavigate={goTo} />
    </>
  );
}
