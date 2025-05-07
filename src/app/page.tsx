"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Define a type for the section names
type SectionName = "instructions" | "evaluation" | "reference";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSection, setActiveSection] =
    useState<SectionName>("instructions");

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
        "Touch the skin, scales and body. Asses whether the skin and scales are loose and whether the muscles of the fish are sill elastic",
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
    alert("Exporting instructions as PDF...");
    // In a real implementation, we would use a library like jsPDF to generate the PDF
    // and then provide a download link
    window.open("/FreshnessEvaluationIns.pdf", "_blank");
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

  return (
    <div className="min-h-screen pb-16">
      {/* Navigation */}
      <nav
        className={`nav-sticky transition-transform duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-primary font-semibold text-2xl">🐟</span>
            <h1 className="text-xl font-bold text-foreground">
              Fish Freshness Evaluation
            </h1>
          </div>
          <div className="flex gap-6">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-20 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Fish Freshness Evaluation Guide
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A comprehensive guide to evaluate the freshness of fish through
            visual examination, odor assessment, and texture evaluation.
          </p>
        </div>
      </section>

      {/* Instructions Section */}
      <section
        ref={sectionRefs.instructions}
        className="container mx-auto px-4 py-10"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Instructions</h2>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Step-by-Step Guide</h3>
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
        className="container mx-auto px-4 py-10 bg-white/50 rounded-xl"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Freshness Evaluation Criteria
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

      {/* Reference Section */}
      <section
        ref={sectionRefs.reference}
        className="container mx-auto px-4 py-10"
      >
        <div className="max-w-3xl mx-auto">
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

      {/* Export Button */}
      <button onClick={handleExportPDF} className="export-btn">
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
  );
}
