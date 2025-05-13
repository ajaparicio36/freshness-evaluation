"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import motion

// Define a type for the section names
type SectionName = "instructions" | "evaluation" | "reference";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSection, setActiveSection] =
    useState<SectionName>("instructions");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Fix: Properly type the ref objects with HTMLElement
  const sectionRefs = {
    instructions: useRef<HTMLDivElement>(null),
    evaluation: useRef<HTMLDivElement>(null),
    reference: useRef<HTMLDivElement>(null),
  };

  // Add type to the section parameter
  const scrollToSection = (section: SectionName) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  // Instructions steps
  const instructionSteps = [
    {
      title: "General Instructions",
      items: [
        "Touch the fish only as needed, body temperature may contribute to the spoiling of the fish",
        "Assess from Head to Tail",
        "If possible, use multiple fish samples for comparison",
        "Document any unusual conditions",
      ],
    },
    {
      title: "External Visual Examination",
      description:
        "Examine visually the physical condition of the fish, eye and gill color, any belly bursting, damages in the skin and scales",
    },
    {
      title: "Assess the Odor",
      description:
        "Assess the odor of the fish, fresh fish usually have a seaweedy, or sea-like smell, while spoiled fish have a strong sour odor.",
    },
    {
      title: "Evaluate the Texture",
      description:
        "Touch the skin, scales and body. Assess whether the skin and scales are loose and whether the muscles of the fish are still elastic",
    },
  ];

  // Table data
  const tableData = [
    {
      characteristic: "Skin",
      fresh: "Bright, shiny, and firm",
      stale: "Dull, slight bleaching",
      spoiled: "Dull, marked bleaching",
    },
    {
      characteristic: "Eyes",
      fresh: "Clear, convex, and black pupil",
      stale: "Slightly sunken, cloudy",
      spoiled: "Sunken, cloudy, discolored",
    },
    {
      characteristic: "Gills",
      fresh: "Red, clean, and moist",
      stale: "Pinkish, slightly sticky",
      spoiled: "Brown, thick mucus",
    },
    {
      characteristic: "Odor",
      fresh: "Fresh, seaweedy smell",
      stale: "Neutral or slightly sour",
      spoiled: "Strongly sour or ammonia-like",
    },
    {
      characteristic: "Texture",
      fresh: "Firm, springs back when pressed",
      stale: "Soft but still springs back slowly",
      spoiled: "Very soft, does not springback",
    },
    {
      characteristic: "Scales",
      fresh: "Bright, shiny, firmly attached",
      stale: "Dull, slightly loose",
      spoiled: "Dull, flaking, easily removable",
    },
    {
      characteristic: "Belly",
      fresh: "Firm, no soft spots, no bursting",
      stale: "Soft but still springs back",
      spoiled: "Soft, fluid leakage and burst belly",
    },
  ];

  // Temperature sensor data
  const temperatureSensorData = [
    {
      label: "Outside Freezer",
      color: "#d9d7cd",
      status: "Not optimal",
    },
    {
      label: "Room",
      color: "#f5b1b6",
      status: "Not optimal",
    },
    {
      label: "Refrigerator",
      color: "#e4a29b",
      status: "Slightly optimal",
    },
    {
      label: "Freezer",
      color: "#de9790",
      status: "Optimal",
    },
  ];

  // Handle next step in instructions
  const handleNextStep = () => {
    if (activeStep < instructionSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(0); // Loop back to start
    }
  };

  // Handle PDF export
  const handleExportPDF = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = "/FreshnessEvaluationIns.pdf";
    link.download = "FreshnessEvaluationInstructions.pdf"; // Suggested filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Navigation visibility control
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen pb-16 relative">
      {/* Enhanced Animated Background with Fixed Positioning */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
        animate={{
          background: [
            "linear-gradient(120deg, rgba(144,224,239,0.4) 0%, rgba(202,240,248,0.3) 50%, rgba(72,202,228,0.35) 100%)",
            "linear-gradient(120deg, rgba(72,202,228,0.4) 0%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.35) 100%)",
            "linear-gradient(120deg, rgba(0,180,216,0.35) 0%, rgba(72,202,228,0.3) 50%, rgba(144,224,239,0.4) 100%)",
          ],
        }}
        transition={{
          duration: 5, // Faster animation
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Animated Floating Elements - Fixed Positions with Absolute Coordinates */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => {
          // Pre-calculate random values to ensure they don't change on re-render
          const width = 5 + i * 2 + 4;
          const height = width;
          const leftPos = (i * 15 + 5) % 90;
          const topPos = (i * 18 + 10) % 80;
          const xMove = 15 + i * 3;
          const yMove = 10 + i * 2;
          const duration = 8 + i * 1.5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/15 backdrop-blur-sm"
              style={{
                width: `${width}rem`,
                height: `${height}rem`,
                left: `${leftPos}%`,
                top: `${topPos}%`,
                willChange: "transform, opacity", // Optimization for animation
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0.5,
              }}
              animate={{
                x: [0, xMove, 0, -xMove, 0],
                y: [0, yMove, 0, -yMove, 0],
                opacity: [0.4, 0.7, 0.5, 0.7, 0.4],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          );
        })}
      </div>

      {/* Water ripple effect - adds subtle movement */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundSize: "400px 400px",
          willChange: "backgroundPosition",
        }}
        animate={{
          backgroundPositionX: ["0px", "400px"],
          backgroundPositionY: ["0px", "400px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Navigation with higher z-index */}
      <nav
        className={`nav-sticky transition-transform duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        } backdrop-blur-md bg-white/80 z-30 shadow-sm`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-primary font-semibold text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              🐟
            </motion.span>
            <h1 className="text-xl font-bold text-foreground">ThermoPack</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("instructions")}
              className={`${
                activeSection === "instructions"
                  ? "text-primary font-medium"
                  : "text-foreground/70"
              }`}
            >
              Instructions
            </button>
            <button
              onClick={() => scrollToSection("evaluation")}
              className={`${
                activeSection === "evaluation"
                  ? "text-primary font-medium"
                  : "text-foreground/70"
              }`}
            >
              Evaluation Criteria
            </button>
            <button
              onClick={() => scrollToSection("reference")}
              className={`${
                activeSection === "reference"
                  ? "text-primary font-medium"
                  : "text-foreground/70"
              }`}
            >
              Reference
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mobile-menu-container relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-primary/10 text-primary"
            >
              Sections
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50"
              >
                <button
                  onClick={() => {
                    scrollToSection("instructions");
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 ${
                    activeSection === "instructions"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Instructions
                </button>
                <button
                  onClick={() => {
                    scrollToSection("evaluation");
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 ${
                    activeSection === "evaluation"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Evaluation Criteria
                </button>
                <button
                  onClick={() => {
                    scrollToSection("reference");
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 ${
                    activeSection === "reference"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Reference
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-b from-primary/20 to-transparent py-20 mb-10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ThermoPack
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A Temperature-Sensitive Packaging for Frozen Fishery Products
          </p>
        </div>
      </motion.section>

      {/* Instructions Section */}
      <section
        ref={sectionRefs.instructions}
        className="container mx-auto px-4 py-10"
      >
        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/70 rounded-xl p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Instructions</h2>

          {/* Temperature Sensor Color Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border mb-6">
            <h3 className="text-xl font-semibold mb-3">
              Temperature Sensor Guide
            </h3>
            <p className="text-sm text-foreground/70 italic mb-4">
              *Disclaimer: colors may appear different on the product itself,
              the darker the color the better the temperature.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {temperatureSensorData.map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm mb-1">{item.label}</p>
                  <div
                    className="h-24 rounded-md shadow-sm mx-auto transition-transform hover:scale-105"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2 mb-3">
              {temperatureSensorData.map((item, index) => (
                <div key={`status-${index}`} className="text-center">
                  <p className="text-sm font-medium">{item.status}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-foreground/70 italic mb-4">
              *If sensor is left at a non-optimal temperature for a long time,
              conduct sensory evaluation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Sensory Evaluation</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleNextStep}
                  className="btn-primary flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3.5a.5.5 0 0 1 .5.5v4.8l2.15-2.15a.5.5 0 1 1 .7.7l-3 3a.5.5 0 0 1-.7 0l-3-3a.5.5 0 1 1 .7-.7L7.5 8.8V4a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {instructionSteps.map((step, index) => (
                <div
                  key={index}
                  className={`instruction-step ${
                    index === activeStep ? "active" : ""
                  }`}
                >
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold mr-2">
                      {index + 1}
                    </span>
                    {step.title}
                  </h4>

                  {step.items ? (
                    <ul className="list-disc pl-8 space-y-1">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-foreground/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-foreground/80">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Criteria Table */}
      <section
        ref={sectionRefs.evaluation}
        className="container mx-auto px-4 py-10 backdrop-blur-sm bg-white/60 rounded-xl"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Sensory Evaluation Criteria
          </h2>

          <div className="overflow-x-auto">
            <table className="freshness-table">
              <thead>
                <tr>
                  <th>Characteristic</th>
                  <th>Fresh</th>
                  <th>Stale</th>
                  <th>Spoiled</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="font-medium">{row.characteristic}</td>
                    <td>{row.fresh}</td>
                    <td>{row.stale}</td>
                    <td>{row.spoiled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Export Button */}
      <div className="container mx-auto px-4 mt-8 mb-16 text-center">
        <button
          onClick={handleExportPDF}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h1.5a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 7H7V1a1 1 0 0 1 1-1z" />
            <path d="M4.5 11.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
          </svg>
          Export PDF
        </button>
      </div>

      {/* Reference Section */}
      <section
        ref={sectionRefs.reference}
        className="container mx-auto px-4 py-10"
      >
        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/70 rounded-xl p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Reference</h2>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border text-center">
            <p className="text-foreground/80">
              FAO. (n.d.). Quality and quality changes in fresh fish - 8.
              Assessment of fish quality.
              <br />
              <a
                href="https://www.fao.org/4/v7180e/v7180e09.htm"
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                https://www.fao.org/4/v7180e/v7180e09.htm
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
