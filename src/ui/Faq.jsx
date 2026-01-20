import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import Container from "./Container";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Am I eligible to donate blood?",
      answer:
        "Generally, healthy individuals aged 18-65, weighing over 50kg (110 lbs), can donate. However, eligibility can depend on medical history, recent travel, or medications. It is best to consult with our medical staff during registration.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "For Whole Blood donation, healthy men can donate every 90 days (3 months), and healthy women can donate every 120 days (4 months) to ensure their iron levels remain stable.",
    },
    {
      question: "Are there any side effects of donation?",
      answer:
        "Most people feel fine after donating. Some may experience slight dizziness or fatigue. These symptoms are temporary and can be managed by drinking plenty of fluids and resting for a few minutes after the procedure.",
    },
    {
      question: "What should I do before donating?",
      answer:
        "Hydrate well, eat a healthy meal (avoid fatty foods), and get a good night's sleep (7-8 hours). Do not come to donate on an empty stomach.",
    },
    {
      question: "How does RedUnity help in emergencies?",
      answer:
        "Our platform provides a real-time database of verified donors. By using our search filters for blood group and location, you can find and contact nearby donors instantly during urgent needs.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 dark:bg-primary-dark transition-colors duration-300">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Side: Content */}
          <div className="w-full md:w-1/3 space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-bold">
              <HelpCircle size={18} />
              <span>Common Inquiries</span>
            </div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white leading-tight">
              Have any <br />
              <span className="text-rose-600">Questions?</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              We have compiled a list of frequently asked questions to help you
              understand the blood donation process better.
            </p>
            <div className="pt-4 hidden md:block">
              <img
                src="https://plus.unsplash.com/premium_photo-1679870686391-b53716747f8a?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="FAQ Illustration"
                className="w-full max-w-[450px] rounded-2xl opacity-80 dark:opacity-80"
              />
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="w-full md:w-2/3 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-3xl transition-all duration-300 ${
                  activeIndex === index
                    ? "border-rose-200 bg-rose-50/30 dark:bg-rose-900/10 dark:border-rose-900/30 shadow-md"
                    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 back-drop-b shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg font-bold transition-colors pr-4 ${
                      activeIndex === index
                        ? "text-rose-600"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-full shrink-0 transition-all ${
                      activeIndex === index
                        ? "bg-rose-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {activeIndex === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-6 pt-0 text-slate-500 dark:text-slate-400 leading-relaxed border-t border-dashed border-slate-200 dark:border-slate-800 mt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
