 import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Heart, Search } from "lucide-react";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import medical from "../animationLotties/medical.json";

/*
  ── SETUP ──────────────────────────────────────────────────────
  1. Add to your index.html <head>:
     <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@700;900&display=swap" rel="stylesheet" />

  2. Add to your global CSS (index.css / App.css):

  .hb-ticker { animation: hbTicker 28s linear infinite; }
  @keyframes hbTicker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  .hb-float  { animation: hbFloat 6s ease-in-out infinite alternate; }
  @keyframes hbFloat  { from{transform:translateY(-10px) rotate(-2deg)} to{transform:translateY(10px) rotate(2deg)} }

  .hb-drop1  { animation: hbMini 5s ease-in-out infinite alternate; }
  .hb-drop2  { animation: hbMini 5s -2s ease-in-out infinite alternate; }
  .hb-drop3  { animation: hbMini 5s -3.5s ease-in-out infinite alternate; }
  @keyframes hbMini   { from{opacity:.35;transform:translateY(0) scale(1)} to{opacity:.7;transform:translateY(-16px) scale(1.1)} }

  .hb-pulse  { animation: hbPulse 2s ease-in-out infinite; }
  @keyframes hbPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }

  .hb-in0 { animation: hbFadeSlide .6s     ease both; }
  .hb-in1 { animation: hbFadeSlide .7s .1s ease both; }
  .hb-in2 { animation: hbFadeSlide .7s .2s ease both; }
  .hb-in3 { animation: hbFadeSlide .7s .3s ease both; }
  .hb-in4 { animation: hbFadeSlide .7s .4s ease both; }
  .hb-in5 { animation: hbFadeSlide .8s .2s ease both; }
  @keyframes hbFadeSlide { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
*/

const TICKER_ITEMS = [
  "A+ Blood Needed — Dhaka",
  "O- Urgent — Chittagong",
  "B+ Required — Sylhet",
  "AB+ Needed — Rajshahi",
  "Donate Today — Save 3 Lives",
];

const FEATURES = [
  "Takes only 30–45 minutes",
  "100% safe & medically supervised",
  "Replenishes within 56 days",
  "Free health screening included",
  "Helps accident & surgery patients",
];

const STATS = [
  { num: "12K+", label: "Donors" },
  { num: "8.4K", label: "Lives Saved" },
  { num: "340",  label: "Campaigns" },
  { num: "24/7", label: "Support" },
];

const HomeBanner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { x: 0.12, y: 0.20, r: 0.38, color: [127, 29, 29], speed: 0.00035, phase: 0   },
      { x: 0.82, y: 0.75, r: 0.32, color: [192, 19, 74], speed: 0.00028, phase: 2.1 },
      { x: 0.55, y: 0.35, r: 0.22, color: [100, 10, 30], speed: 0.00042, phase: 4.3 },
      { x: 0.30, y: 0.80, r: 0.18, color: [ 80,  5, 20], speed: 0.00030, phase: 1.5 },
    ];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0108";
      ctx.fillRect(0, 0, W, H);
      orbs.forEach((o) => {
        const ox = (o.x + Math.sin(tRef.current * o.speed + o.phase) * 0.06) * W;
        const oy = (o.y + Math.cos(tRef.current * o.speed * 1.3 + o.phase) * 0.05) * H;
        const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r * Math.max(W, H));
        const [r, g, b] = o.color;
        gr.addColorStop(0,   `rgba(${r},${g},${b},0.55)`);
        gr.addColorStop(0.5, `rgba(${r},${g},${b},0.18)`);
        gr.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      });
      tRef.current++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section style={{
      position:"relative", width:"100%", minHeight:"92vh",
      background:"#0a0108", display:"flex", alignItems:"center",
      justifyContent:"center", overflow:"hidden",
      fontFamily:"'Barlow', sans-serif",
    }}>
      {/* animated canvas bg */}
      <canvas ref={canvasRef} style={{
        position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0
      }} />

      {/* grid */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize:"52px 52px",
      }} />

      {/* vignette */}
      <div style={{
        position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 70% at 50% 50%,transparent 30%,rgba(5,0,3,0.78) 100%)",
      }} />

      {/* floating mini drops */}
      <svg className="hb-drop1" style={{position:"absolute",top:"8%",right:"14%",zIndex:3}} width="28" height="36" viewBox="0 0 28 36" fill="none">
        <path d="M14 2C14 2 2 14 2 22C2 29 7.4 34 14 34C20.6 34 26 29 26 22C26 14 14 2 14 2Z" fill="#f43f5e" opacity=".8"/>
      </svg>
      <svg className="hb-drop2" style={{position:"absolute",bottom:"18%",left:"6%",zIndex:3}} width="20" height="26" viewBox="0 0 20 26" fill="none">
        <path d="M10 1C10 1 1 10 1 16C1 21 5 25 10 25C15 25 19 21 19 16C19 10 10 1 10 1Z" fill="#fb923c" opacity=".7"/>
      </svg>
      <svg className="hb-drop3" style={{position:"absolute",top:"55%",right:"4%",zIndex:3}} width="16" height="21" viewBox="0 0 16 21" fill="none">
        <path d="M8 1C8 1 1 8 1 13C1 17 4 20 8 20C12 20 15 17 15 13C15 8 8 1 8 1Z" fill="#f43f5e" opacity=".6"/>
      </svg>

      {/* main content grid */}
      <div style={{
        position:"relative", zIndex:10, width:"100%", maxWidth:1100,
        padding:"5rem 2rem 6rem",
        display:"grid", gridTemplateColumns:"1fr 400px",
        gap:"3rem", alignItems:"center",
      }}>

        {/* ── LEFT ── */}
        <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>

          <div className="hb-in0" style={{
            display:"inline-flex",alignItems:"center",gap:10,
            background:"rgba(192,19,74,0.12)",border:"1px solid rgba(192,19,74,0.3)",
            borderRadius:100,padding:"7px 18px",width:"fit-content",
          }}>
            <div className="hb-pulse" style={{width:7,height:7,borderRadius:"50%",background:"#f43f5e",flexShrink:0}} />
            <span style={{fontSize:12,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#fda4af"}}>
              Blood Donation Platform · RedUnity
            </span>
          </div>

          <h1 className="hb-in1" style={{
            // fontFamily: 'Syne', 
            fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
            fontSize:"clamp(3.2rem,6.5vw,5.6rem)", lineHeight:0.96,
            letterSpacing:"-.02em", color:"#f9f0f2",
          }}>
            Your Drop<br />
            Can{" "}
            <em style={{
              fontStyle:"normal",
              // fontFamily: 'Syne', 
              fontFamily:"'Barlow Condensed',sans-serif",
              background:"linear-gradient(125deg,#f43f5e 10%,#fb923c 90%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
              Save<br />A Life
            </em>
          </h1>

          <p className="hb-in2" style={{fontSize:"1.05rem",lineHeight:1.7,color:"rgba(255,240,244,.45)",maxWidth:520}}>
            Connecting heroes with those in need — instantly, for free.
            Join thousands of donors or find the right blood type near you.
          </p>

          <div className="hb-in3" style={{display:"flex",flexWrap:"wrap",gap:12}}>
            {user ? (
              <button
              className="bg-[linear-gradient(135deg,#e8002f_0%,#ff2d55_50%,#ff5577_100%)]"
                style={{display:"inline-flex",alignItems:"center",gap:9,padding:"8px 25px",color:"#fff",fontFamily:"'Barlow',sans-serif",fontSize:15,fontWeight:700,border:"none",borderRadius:8,cursor:"pointer",letterSpacing:".02em",transition:"all .2s"}}
                onClick={() => navigate("/donation-requests")}
                onMouseEnter={e=>{e.currentTarget.style.background="#a00f3d";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 18px 40px -10px rgba(192,19,74,.55)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#c0134a";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
              >
                <Heart size={16} fill="currentColor" /> Donation Requests
              </button>
            ) : (
              <button
              className="bg-[linear-gradient(135deg,#e8002f_0%,#ff2d55_50%,#ff5577_100%)]"
                style={{display:"inline-flex",alignItems:"center",gap:9,padding:"8px 25px",color:"#fff",fontFamily:"'Barlow',sans-serif",fontSize:15,fontWeight:700,border:"none",borderRadius:8,cursor:"pointer",letterSpacing:".02em",transition:"all .2s"}}
                onClick={() => navigate("/auth/login")}
                onMouseEnter={e=>{e.currentTarget.style.background="#a00f3d";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 18px 40px -10px rgba(192,19,74,.55)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#c0134a";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
              >
                <Heart size={16} fill="currentColor" /> Join as Donor
              </button>
            )}
            <button
              style={{display:"inline-flex",alignItems:"center",gap:9,padding:"14px 28px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",color:"#d4b8bf",fontFamily:"'Barlow',sans-serif",fontSize:15,fontWeight:600,borderRadius:8,cursor:"pointer",transition:"all .2s"}}
              onClick={() => navigate("/search-donation")}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(192,19,74,.1)";e.currentTarget.style.borderColor="rgba(192,19,74,.4)";e.currentTarget.style.color="#fda4af";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="#d4b8bf";e.currentTarget.style.transform="";}}
            >
              <Search size={16} /> Find Donors
            </button>
          </div>

          <div className="hb-in4" style={{display:"flex",borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:"1.8rem"}}>
            {STATS.map((st, i) => (
              <div key={st.label} style={{
                flex:1, display:"flex", flexDirection:"column", gap:3,
                padding: i===0?"0 1.5rem 0 0": i===STATS.length-1?"0 0 0 1.5rem":"0 1.5rem",
                borderLeft: i>0?"1px solid rgba(255,255,255,.07)":"none",
              }}>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.9rem",fontWeight:900,letterSpacing:"-.02em",color:"#f43f5e",lineHeight:1}}>{st.num}</span>
                <span style={{fontSize:11,fontWeight:600,letterSpacing:".09em",textTransform:"uppercase",color:"rgba(255,240,244,.3)"}}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
      
        <div className="w-full h-auto">
         <Lottie animationData={medical} loop={true} />
        </div>
      </div>

      {/* ── live blood request ticker ── */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, zIndex:10,
        background:"rgba(192,19,74,.08)", borderTop:"1px solid rgba(192,19,74,.18)",
        padding:"10px 0", overflow:"hidden",
      }}>
        <div className="hb-ticker" style={{display:"flex",gap:"3rem",whiteSpace:"nowrap"}}>
          {doubled.map((item, i) => (
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:12,fontWeight:600,color:"rgba(255,180,190,.5)",letterSpacing:".07em",textTransform:"uppercase",flexShrink:0}}>
              <span style={{color:"rgba(192,19,74,.6)"}}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;