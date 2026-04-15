import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import fundingLottie from "../../animationLotties/funding.json";
import { Plus } from "lucide-react";
import Container from "../../ui/Container";

const mockFunds = [
  { _id: "1", name: "Rahim Uddin", amount: 5000, date: "2025-04-01", avatar: "RU" },
  { _id: "2", name: "Fatema Khatun", amount: 2500, date: "2025-04-03", avatar: "FK" },
  { _id: "3", name: "Karim Hossain", amount: 10000, date: "2025-04-05", avatar: "KH" },
  { _id: "4", name: "Nusrat Jahan", amount: 1500, date: "2025-04-07", avatar: "NJ" },
  { _id: "5", name: "Sabbir Ahmed", amount: 3000, date: "2025-04-09", avatar: "SA" },
  { _id: "6", name: "Mitu Begum", amount: 7500, date: "2025-04-10", avatar: "MB" },
  { _id: "7", name: "Tanvir Islam", amount: 4200, date: "2025-04-11", avatar: "TI" },
  { _id: "8", name: "Sumaiya Akter", amount: 8000, date: "2025-04-12", avatar: "SA" },
];

const ITEMS_PER_PAGE = 5;

const formatAmount = (val) => "৳" + Number(val).toLocaleString("en-BD");

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const formatCard = (val) =>
  val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (val) => {
  const clean = val.replace(/\D/g, "").slice(0, 4);
  return clean.length >= 3 ? clean.slice(0, 2) + "/" + clean.slice(2) : clean;
};

export default function Funding() {
  const [funds, setFunds] = useState(mockFunds);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const totalFunds = funds.reduce((sum, f) => sum + f.amount, 0);
  const totalDonors = new Set(funds.map((f) => f.name)).size;
  const avgDonation = Math.round(totalFunds / funds.length);
  const goalAmount = 500000;
  const progressPct = Math.min(Math.round((totalFunds / goalAmount) * 100), 100);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const totalPages = Math.ceil(funds.length / ITEMS_PER_PAGE);
  const paginated = funds.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) < 100) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2200));
    setProcessing(false);
    setSuccess(true);
    const initials = cardName
      ? cardName.trim().split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
      : "AN";
    setFunds((prev) => [
      {
        _id: Date.now().toString(),
        name: cardName || "Anonymous Donor",
        amount: Number(amount),
        date: new Date().toISOString().split("T")[0],
        avatar: initials,
      },
      ...prev,
    ]);
    setTimeout(() => {
      setSuccess(false);
      setShowModal(false);
      setAmount("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
      setCardName("");
    }, 2000);
  };

  const inputClass =
    "w-full bg-[#111] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-red-600/50 placeholder:text-gray-600 font-sans";

  return (
    <div className="min-hscreen bgblack text-white mt-16 font-sans">

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(220,38,38,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.04)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <Container>      
      <div className="relative z-10">

        {/* ── HEADER ── */}
        <div
          className={`mb-16 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full text-red-500 border border-red-500/30 bg-red-500/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[blink_1.2s_infinite]" />
              Live Campaign
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-end justify-center md:justify-between gap-8">
            <div>
            <h1 className="text-black dark:text-white" 
            style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
            fontSize:"clamp(3.2rem,6.5vw,5.6rem)", lineHeight:0.96,
            letterSpacing:"-.02em", 
          }}
          >
            FUND THE
            <em className="" style={{
              fontStyle:"normal",
              fontFamily:"'Barlow Condensed',sans-serif",
              background:"linear-gradient(125deg,#f43f5e 10%,#fb923c 90%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
               <br />MISSION
            </em>
            </h1>
              <p className="mt-4 text-gray-500 max-w-105 leading-[1.7] text-[15px]">
                Every contribution keeps our blood donation platform running — connecting donors with those who need it most across Bangladesh.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-5 items-center">
              <div className="w-87.5 lg:w-110 h-auto hidden lg:flex">
                <Lottie animationData={fundingLottie} loop={true} />
              </div>
              <button
                className="uppercase text-center justify-center max-sm:w-full bg-[linear-gradient(135deg,#e8002f_0%,#ff2d55_50%,#ff5577_100%)] inline-flex items-center gap-2 px-6 md:px-16 py-2.5 md:py-3 lg:py-4 text-white font-[\'Barlow\',sans-serif] text-base font-bold border-none rounded-lg cursor-pointer tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.75 hover:shadow-[0_18px_40px_-10px_rgba(192,19,74,0.55)] hover:bg-[#a00f3d]"
                onClick={() => setShowModal(true)}
              >
                <Plus size={16} fill="currentColor" />
                Give Fund
              </button>
            </div>
          </div>
        </div>

        {/* ── STATS ── */}
        <div
          className={`grid gap-4 mb-6 transition-all duration-700 ease-out delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}
        >
          {[
            { label: "Total Raised", value: formatAmount(totalFunds), 
              sub: "across all donors", color: "bg-blue-500/10 text-blue-600", },
            { label: "Contributors", value: totalDonors, 
              sub: "unique donors",color: "bg-amber-500/10 text-amber-600", },
            { label: "Avg Donation", value: formatAmount(avgDonation), 
              sub: "per contribution",color: "bg-emerald-500/10 text-emerald-600", },
          ].map((s, i) => (
            <div
                key={i}
                className="group relative bg-white dark:bg-gray-900/60 p-4 md:p-8 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[1rem] transition-opacity"></div>

                <div
                  className={`py-3 md:py-6 md:text-xl ${s.color} rounded-xl flex items-center justify-center mb-4 md:mb-6 relative z-10 group-hover:rotate6 transition-transform`}

                >
                  {s.value}
                </div>

                <div className="relative z-10">
                  <h4 className="font-black text-slate-800 dark:text-white mb-3 text-lg">
                    {s.label}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {s.sub}
                  </p>
                </div>
              </div>
          ))}
        </div>

        {/* ── PROGRESS ── */}
        <div
          className={`bg-white dark:bg-black dark:back-drop-b border md:my-12 border-red-500/15 rounded-[20px] p-6 mb-6 transition-all duration-700 ease-out delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex justify-between items-center mb-3.5">
            <div>
              <span className="text-black dark:text-white font-bold text-[13px]">Campaign Goal</span>
              <span className="text-gray-700 text-xs ml-2">৳5,00,000 target</span>
            </div>
            <span className="text-red-400 font-black text-2xl tracking-tight">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-[#1a0000] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-900 via-red-600 to-red-500 shadow-[0_0_14px_rgba(220,38,38,0.7)] rounded-full transition-[width] duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progressPct}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700 text-xs">{formatAmount(totalFunds)} raised</span>
            <span className="text-gray-700 text-xs">৳5,00,000 goal</span>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div
          className={`back-drop-b bg-white border border-red-600/15 rounded-[20px] overflow-hidden mb-6 transition-all duration-700 ease-out delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="px-6 py-5 border-b border-red-600/10 bg-red-600/[0.03] flex items-center justify-between">
            <div>
              <h2 className="text-black dark:text-white font-black text-[13px] uppercase tracking-[0.15em] m-0">Contribution History</h2>
              <p className="text-gray-700 text-xs mt-1 mb-0">{funds.length} total contributions</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-xs">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-[blink_1.2s_infinite]" />
              Live
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-red-600/[0.08]">
                  {["#", "Contributor", "Amount", "Date", "Method"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3.5 text-gray-500 text-[11px] font-bold uppercase tracking-[0.15em]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((fund, idx) => (
                  <tr
                    key={fund._id}
                    className="border-b border-white/[0.03] transition-colors duration-150 cursor-default hover:bg-red-600/[0.05]"
                  >
                    <td className="px-6 py-4 text-[#2d2d2d] text-xs font-mono">
                      {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] flex-shrink-0 bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_10px_rgba(220,38,38,0.35)] flex items-center justify-center text-white text-[11px] font-black">
                          {fund.avatar}
                        </div>
                        <span className="text-gray-300 text-sm font-medium">{fund.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-red-400 font-black text-sm">{formatAmount(fund.amount)}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-[13px]">{formatDate(fund.date)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-bold px-3 py-1 rounded-lg uppercase tracking-[0.1em]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
                        </svg>
                        Stripe
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-red-600/[0.08] flex items-center justify-between">
              <span className="text-gray-500 text-xs">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, funds.length)} of {funds.length}
              </span>
              <div className="flex gap-2">
                {[
                  { label: "‹", action: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, active: false },
                  ...Array.from({ length: totalPages }, (_, i) => ({ label: i + 1, action: () => setCurrentPage(i + 1), active: currentPage === i + 1, disabled: false })),
                  { label: "›", action: () => setCurrentPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages, active: false },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.action}
                    disabled={btn.disabled}
                    className={`w-8 h-8 rounded-lg border-none font-bold text-[13px] transition-all duration-200 cursor-pointer
                      ${btn.disabled ? "opacity-25 cursor-not-allowed" : ""}
                      ${btn.active
                        ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                        : "bg-red-100 dark:bg-[#1a1a1a] text-gray-500"
                      }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── WHY FUND ── */}
        <div
          className={`grid gap-4 transition-all mb-10 md:my-12 duration-700 ease-out delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}
        >
          {[
            { icon: "🩸", title: "Save More Lives", desc: "Your funding helps maintain the platform and reach more blood donors across Bangladesh." },
            { icon: "⚡", title: "Instant Impact", desc: "Funds go directly to SMS alerts, platform costs, and donor outreach programs." },
            { icon: "🔒", title: "100% Secure", desc: "All transactions are processed through Stripe — the world's most trusted payment system." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-red-50/80 back-drop-b border border-red-600/10 rounded-[20px] p-6 transition-all duration-200 hover:border-red-600/35 hover:-translate-y-0.5"
            >
              <div className="text-[28px] mb-3">{item.icon}</div>
              <h3 className="text-black dark:text-white font-extrabold text-xs uppercase tracking-[0.15em] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-[13px] leading-[1.7]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </Container>

      {/* ══════════ MODAL ══════════ */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/[0.88] backdrop-blur-[10px]"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setSuccess(false); } }}
        >
          <div className="relative w-full max-w-[440px] bg-[#0d0d0d] border border-red-600/30 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.2),0_30px_60px_rgba(0,0,0,0.9)]">
            {/* Top accent bar */}
            <div className="h-0.5 bg-[linear-gradient(90deg,#7f1d1d,#dc2626,#ef4444,#dc2626,#7f1d1d)]" />

            <div className="p-7">
              <div className="flex items-start justify-between mb-7">
                <div>
                  <h3 className="text-white text-xl font-black uppercase tracking-[0.1em] m-0">Donate Now</h3>
                  <p className="text-gray-700 text-xs mt-1 flex items-center gap-1.5">
                    <span className="text-green-500">●</span> Secured by Stripe
                  </p>
                </div>
                <button
                  onClick={() => { setShowModal(false); setSuccess(false); }}
                  className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] text-gray-500 cursor-pointer text-[13px] flex items-center justify-center transition-colors duration-150 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {success ? (
                <div className="flex flex-col items-center py-10 gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600/40 flex items-center justify-center text-[28px] text-red-400 animate-[blink_0.8s_infinite]">
                    ✓
                  </div>
                  <p className="text-white font-black text-lg uppercase tracking-[0.1em]">Payment Successful!</p>
                  <p className="text-gray-600 text-[13px] text-center leading-[1.6]">
                    Thank you for your generous contribution. You're helping save lives!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDonate} className="flex flex-col gap-5">

                  {/* Preset amounts */}
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-2.5">
                      {[500, 1000, 2500, 5000].map((p) => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setAmount(String(p))}
                          className={`py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-[0.1em] cursor-pointer transition-all duration-200
                            ${amount === String(p)
                              ? "border border-red-600 bg-gradient-to-br from-red-600 to-red-800 text-white shadow-[0_0_14px_rgba(220,38,38,0.4)]"
                              : "border border-[#2a2a2a] bg-[#1a1a1a] text-gray-500"
                            }`}
                        >
                          ৳{p >= 1000 ? p / 1000 + "k" : p}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount (min ৳100)"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={100}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Card name */}
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Card number */}
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234  5678  9012  3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      required
                      maxLength={19}
                      className={`${inputClass} font-mono tracking-[0.15em]`}
                    />
                  </div>

                  {/* Expiry + CVC */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Expiry", ph: "MM/YY", val: expiry, fn: (e) => setExpiry(formatExpiry(e.target.value)), max: 5 },
                      { label: "CVC", ph: "123", val: cvc, fn: (e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3)), max: 3 },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5">
                          {f.label}
                        </label>
                        <input
                          type="text"
                          placeholder={f.ph}
                          value={f.val}
                          onChange={f.fn}
                          required
                          maxLength={f.max}
                          className={`${inputClass} font-mono`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={processing}
                    className={`w-full border-none rounded-2xl py-[18px] font-black uppercase tracking-[0.15em] text-[13px] flex items-center justify-center gap-2 transition-all duration-200
                      ${processing
                        ? "cursor-not-allowed bg-[#1a1a1a] text-gray-700"
                        : "cursor-pointer bg-gradient-to-br from-red-600 to-red-800 text-white shadow-[0_0_24px_rgba(220,38,38,0.4)] hover:shadow-[0_0_32px_rgba(220,38,38,0.6)]"
                      }`}
                  >
                    {processing ? (
                      <>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="animate-spin">
                          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Donate {amount && Number(amount) >= 100 ? formatAmount(Number(amount)) : "Now"}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}