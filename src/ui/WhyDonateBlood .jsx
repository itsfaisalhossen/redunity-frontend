import { useState, useRef, useEffect } from "react";
import {
  FaHandHoldingHeart,
  FaSearch,
  FaBell,
  FaTruck,
  FaCheckCircle,
  FaUserShield,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaUserShield />,
    title: "Register & Verify",
    desc: "Create your account and verify your identity to become a trusted donor or recipient in our network.",
    accent: "#ef4444",
    soft: "rgba(239,68,68,0.09)",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Request Blood",
    desc: "Submit a blood request with your blood group, location and urgency level. We notify donors instantly.",
    accent: "#f97316",
    soft: "rgba(249,115,22,0.09)",
  },
  {
    icon: <FaSearch />,
    title: "Find Donors",
    desc: "Search nearby verified donors by blood group and location. Filter by availability and distance.",
    accent: "#ef4444",
    soft: "rgba(239,68,68,0.09)",
  },
  {
    icon: <FaBell />,
    title: "Get Notified",
    desc: "Donors receive real-time alerts for urgent requests matching their blood group in their area.",
    accent: "#f97316",
    soft: "rgba(249,115,22,0.09)",
  },
  {
    icon: <FaTruck />,
    title: "Coordinate Pickup",
    desc: "Connect directly with the donor to arrange a safe and convenient donation time and location.",
    accent: "#ef4444",
    soft: "rgba(239,68,68,0.09)",
  },
  {
    icon: <FaCheckCircle />,
    title: "Save a Life",
    desc: "Complete the donation and earn recognition. Every drop counts — you're a hero in someone's story.",
    accent: "#22c55e",
    soft: "rgba(34,197,94,0.09)",
  },
];

const VISIBLE_LG = 3;
const VISIBLE_MD = 2;
const VISIBLE_SM = 1;

const HowItWorksSlider = () => {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_LG);
  const [hovered, setHovered] = useState(null);
  const trackRef = useRef(null);
  const autoRef = useRef(null);

  const total = cards.length;
  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? VISIBLE_SM : w < 1024 ? VISIBLE_MD : VISIBLE_LG);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setActive((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = (idx) => setActive(Math.max(0, Math.min(idx, maxIndex)));

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3400);
  };
  const stopAuto = () => clearInterval(autoRef.current);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [maxIndex]);

  const onPointerDown = (e) => {
    stopAuto();
    setDragging(true);
    setDragStart(e.clientX ?? e.touches?.[0]?.clientX);
    setDragDelta(0);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    setDragDelta((e.clientX ?? e.touches?.[0]?.clientX) - dragStart);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragDelta < -60) goTo(active + 1);
    else if (dragDelta > 60) goTo(active - 1);
    setDragDelta(0);
    startAuto();
  };

  const cardWidthPct = 100 / visibleCount;
  const translateX =
    -(active * cardWidthPct) +
    (dragging ? (dragDelta / (trackRef.current?.offsetWidth || 900)) * 100 : 0);

  return (
    <section className="w-full py-20 px-4 overflow-hidden select-none">

      {/* ── Heading ── */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5
          bg-red-500/8 border border-red-400/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 dark:text-red-400">
            How It Works
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight
          text-zinc-900 dark:text-white mb-4">
          Simple Steps to{" "}
          <span className="text-red-500 relative inline-block">
            Save Lives
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
          </span>
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500">
          Our platform makes blood donation seamless, fast, and impactful — every step built for real people.
        </p>
      </div>

      {/* ── Slider ── */}
      <div className="relative max-w-6xl mx-auto px-8 sm:px-12">

        {/* Edge fade — adapts to bg */}
        <div className="absolute left-0 top-0 h-full w-10 sm:w-16 z-10 pointer-events-none
          bggradient-to-r from-white dark:from-zinc-950 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-10 sm:w-16 z-10 pointer-events-none
          bggradient-to-l from-white dark:from-zinc-950 to-transparent" />

        {/* Track */}
        <div
          ref={trackRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div
            className="flex items-stretch"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: dragging ? "none" : "transform 0.52s cubic-bezier(0.25, 1, 0.5, 1)",
              width: `${(total / visibleCount) * 100}%`,
            }}
          >
            {cards.map((card, idx) => {
              const isHot = hovered === idx;
              return (
                <div
                  key={idx}
                  style={{ width: `${100 / total}%` }}
                  className="px-2.5 py-3"
                >
                  <div
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative h-full"
                    style={{
                      transform: isHot ? "translateY(-5px)" : "translateY(0)",
                      transition: "transform 0.32s ease",
                    }}
                  >
                    {/* Card */}
                    <div
                      className="relative h-full flex flex-col gap-4 p-5 sm:p-6 rounded-2xl overflow-hidden
                        border transition-all duration-300
                        bg-white/80 dark:bg-zinc-900/60
                        backdrop-blur-xl"
                      style={{
                        borderColor: isHot ? `${card.accent}50` : "rgba(0,0,0,0.07)",
                        boxShadow: isHot
                          ? `0 16px 48px -8px ${card.accent}28, 0 2px 8px rgba(0,0,0,0.06)`
                          : "0 1px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${card.accent} 40%, ${card.accent} 60%, transparent 100%)`,
                          opacity: isHot ? 1 : 0,
                        }}
                      />

                      {/* Background radial glow */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
                        style={{
                          background: `radial-gradient(ellipse at top right, ${card.accent}12 0%, transparent 65%)`,
                          opacity: isHot ? 1 : 0.3,
                        }}
                      />

                      {/* Header row: step + icon */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span
                          className="text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: isHot ? card.accent : card.soft,
                            color: isHot ? "#fff" : card.accent,
                            border: `1px solid ${card.accent}25`,
                            transition: "all 0.3s ease",
                          }}
                        >
                          Step {idx + 1}
                        </span>

                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
                          style={{
                            background: isHot ? card.accent : card.soft,
                            color: isHot ? "#fff" : card.accent,
                            transform: isHot ? "rotate(-8deg) scale(1.12)" : "rotate(0deg) scale(1)",
                            transition: "all 0.32s ease",
                            boxShadow: isHot ? `0 6px 18px ${card.accent}35` : "none",
                          }}
                        >
                          {card.icon}
                        </div>
                      </div>

                      {/* Separator */}
                      <div
                        className="relative z-10 h-px w-full transition-all duration-300"
                        style={{
                          background: isHot
                            ? `linear-gradient(90deg, ${card.accent}50, transparent)`
                            : "rgba(0,0,0,0.06)",
                        }}
                      />

                      {/* Text */}
                      <div className="relative z-10 flex flex-col gap-2 flex-1">
                        <h3 className="font-bold text-sm sm:text-base leading-snug text-zinc-800 dark:text-zinc-100">
                          {card.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {card.desc}
                        </p>
                      </div>

                      {/* Learn more — visible on hover */}
                      <div
                        className="relative z-10 flex items-center gap-1 text-[11px] font-semibold transition-all duration-300"
                        style={{
                          color: card.accent,
                          opacity: isHot ? 1 : 0,
                          transform: isHot ? "translateX(0)" : "translateX(-8px)",
                        }}
                      >
                        <span>Learn more</span>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow buttons */}
        {["left", "right"].map((dir) => {
          const isLeft = dir === "left";
          const disabled = isLeft ? active === 0 : active === maxIndex;
          return (
            <button
              key={dir}
              onClick={() => { stopAuto(); goTo(isLeft ? active - 1 : active + 1); startAuto(); }}
              disabled={disabled}
              className={`absolute top-1/2 -translate-y-1/2 z-20
                w-8 h-8 sm:w-10 sm:h-10 rounded-full
                flex items-center justify-center
                bg-white dark:bg-zinc-900
                border border-zinc-200/80 dark:border-zinc-700/60
                text-zinc-400 dark:text-zinc-500
                hover:border-red-400/50 hover:text-red-500 dark:hover:text-red-400
                disabled:opacity-20 disabled:cursor-not-allowed
                transition-all duration-200 shadow-sm
                ${isLeft ? "left-0" : "right-0"}`}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d={isLeft ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* ── Dots + progress bar ── */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { stopAuto(); goTo(i); startAuto(); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? "22px" : "6px",
                height: "6px",
                background: active === i ? "#ef4444" : "rgba(239,68,68,0.2)",
              }}
            />
          ))}
        </div>

        <div className="w-28 h-px rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
            style={{ width: `${((active + visibleCount) / total) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSlider;