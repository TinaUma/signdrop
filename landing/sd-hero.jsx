// SignDrop hero + animated mini-document demo using the real handwritten signature.
const HERO_BG = "#0a1ab5";        // approved vivid ultramarine
const HERO_BG2 = "#0c1fcb";
const ACCENT_BLUE = "#1a3df0";

// ---- Mini document with the real signature dropping onto it ----
function MiniDocDemo({ width = 380, height = 480, sigSrc, labels }) {
  const src = sigSrc || (typeof window !== "undefined" && window.SD_SIGNATURE) || "assets/signature-navy.png";
  const [phase, setPhase] = React.useState(0); // 0 hover, 1 lower, 2 placed, 3 reset
  React.useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 1700);
    return () => clearInterval(t);
  }, []);

  const sigY = phase === 0 ? -96 : phase === 1 ? -8 : phase === 2 ? 0 : -130;
  const sigOpacity = phase === 3 ? 0 : 1;
  const sigScale = phase === 0 ? 1.06 : 1;
  const placed = phase === 2;
  const lineCol = "#d8d4ca";

  return (
    <div style={{
      width, height, position: "relative", background: "#fff", borderRadius: 5,
      boxShadow: "0 30px 80px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.1)",
      overflow: "hidden", fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#222",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 18px 10px", fontSize: 9, letterSpacing: 2, opacity: 0.5 }}>
        <span>AGREEMENT.PDF</span><span>1 / 3</span>
      </div>
      <div style={{ padding: "0 28px", fontFamily: "Georgia, serif" }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, letterSpacing: "-0.01em" }}>Service Agreement</div>
        {[0.95, 0.88, 0.92, 0.7, 0.9, 0.82, 0.6].map((w, i) => (
          <div key={i} style={{ height: 5, width: `${w * 100}%`, background: lineCol, borderRadius: 2, marginBottom: 10 }} />
        ))}
        <div style={{ height: 18 }} />
        {[0.85, 0.7, 0.55].map((w, i) => (
          <div key={i} style={{ height: 5, width: `${w * 100}%`, background: lineCol, borderRadius: 2, marginBottom: 10 }} />
        ))}
      </div>

      {/* signature line */}
      <div style={{ position: "absolute", bottom: 64, left: 28, right: 28, fontSize: 9, letterSpacing: 1.5, opacity: 0.55 }}>
        <div style={{ borderTop: `1px solid ${lineCol}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
          <span>SIGNATURE</span><span>DATE</span>
        </div>
      </div>

      {/* the real signature image dropping in */}
      <div style={{
        position: "absolute", left: 30, bottom: 74,
        transform: `translateY(${sigY}px) scale(${sigScale})`, opacity: sigOpacity,
        transition: "transform 1.1s cubic-bezier(.2,.7,.2,1), opacity 0.5s", willChange: "transform, opacity",
      }}>
        <img src={src} alt="signature" style={{ width: 210, height: "auto", display: "block" }} />
      </div>

      {/* drop target while lowering */}
      {(phase === 0 || phase === 1) && (
        <div style={{ position: "absolute", left: 28, right: 28, bottom: 70, height: 64, border: `1.5px dashed ${ACCENT_BLUE}`, borderRadius: 4, opacity: 0.4, pointerEvents: "none" }} />
      )}

      {/* placed toast */}
      <div style={{
        position: "absolute", right: 14, top: 14, padding: "5px 9px", background: ACCENT_BLUE, color: "#fff",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2,
        opacity: placed ? 1 : 0, transform: `translateY(${placed ? 0 : -6}px)`, transition: "all 0.4s",
      }}>
        ✓ {labels.signed}
      </div>
    </div>
  );
}

// ---- Cursor-trailing signature stroke ----
function SignatureCursor({ containerRef, color = "#fff" }) {
  const canvasRef = React.useRef(null);
  const pointsRef = React.useRef([]);
  React.useEffect(() => {
    const cnt = containerRef.current, cv = canvasRef.current;
    if (!cnt || !cv) return;
    const ctx = cv.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    function resize() {
      const r = cnt.getBoundingClientRect();
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      cv.style.width = r.width + "px"; cv.style.height = r.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    function onMove(e) {
      const r = cnt.getBoundingClientRect();
      pointsRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    }
    cnt.addEventListener("pointermove", onMove);
    let raf;
    function draw() {
      const r = cnt.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      const now = performance.now();
      const pts = pointsRef.current.filter((p) => now - p.t < 1500);
      pointsRef.current = pts;
      if (pts.length > 1) {
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          const age = (now - b.t) / 1500;
          ctx.strokeStyle = color; ctx.globalAlpha = Math.max(0, 1 - age);
          ctx.lineWidth = 3 * (1 - age) + 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); cnt.removeEventListener("pointermove", onMove); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "screen" }} />;
}

// ---- Fixed header (sticky on scroll) ----
function Header({ t, lang, setLang }) {
  const L = window.SD_LINKS;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="sd-header" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
      padding: scrolled ? "11px 40px" : "16px 40px",
      background: scrolled ? "rgba(9,18,58,0.88)" : "transparent",
      backdropFilter: scrolled ? "saturate(150%) blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(150%) blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
      boxShadow: scrolled ? "0 6px 26px rgba(0,0,0,0.3)" : "none",
      transition: "padding .3s ease, background .3s ease, box-shadow .3s ease, border-color .3s ease",
      color: "#fff",
    }}>
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ textDecoration: "none", flexShrink: 0 }}>
        <SignDropLogo height={30} mono color="#fff" ru script />
      </a>
      <nav className="sd-header-nav" style={{ display: "flex", gap: 24, alignItems: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, letterSpacing: 0.5 }}>
        <a href="#how" style={navLink}>{t.nav.how}</a>
        <a href="#features" style={navLink}>{t.nav.features}</a>
        <a href="#privacy" style={navLink}>{t.nav.privacy}</a>
        <a href="#compare" style={navLink}>{t.nav.compare}</a>
      </nav>
      <div className="sd-header-actions" style={{ display: "flex", gap: 14, alignItems: "center", flexShrink: 0 }}>
        <a href={L.kofi} target="_blank" rel="noopener" className="hdr-support" style={hdrDonateLink}>{t.nav.support}</a>
        <a href={L.github} target="_blank" rel="noopener" aria-label="GitHub" title="GitHub" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, border: "1px solid rgba(255,255,255,0.42)", borderRadius: 6, color: "#fff" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
        </a>
        <a href={L.demo} target="_blank" rel="noopener" className="hdr-try" style={hdrBtnPrimary}>{t.nav.tryOnline}</a>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
    </header>
  );
}

// ---- Hero ----
function Hero({ t, lang, setLang }) {
  const wrapRef = React.useRef(null);
  const L = window.SD_LINKS;
  return (
    <section ref={wrapRef} data-screen-label="Hero" style={{
      position: "relative", minHeight: "min(880px, 100vh)",
      background: `linear-gradient(155deg, ${HERO_BG} 0%, ${HERO_BG2} 100%)`,
      color: "#fff", overflow: "hidden", display: "flex", flexDirection: "column",
    }}>
      <SignatureCursor containerRef={wrapRef} color="#7e93ff" />

      {/* content */}
      <div className="sd-hero-grid" style={{
        flex: 1,
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center",
        padding: "116px 56px 64px", position: "relative", zIndex: 2,
      }}>
        {/* LEFT — clean message */}
        <div>
          {(() => {
            const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "") || "";
            const isMac = /Mac|iPod|iPhone|iPad/.test(ua) && !ua.includes("Windows");
            const isLinux = /Linux/.test(ua) && !/Android/.test(ua) && !isMac;
            const btnLabel = isMac ? t.hero.btnMac : isLinux ? t.hero.btnLinux : t.hero.btnWin;
            const btnHref = isMac ? L.mac : isLinux ? L.linux : L.exe;
            return (
              <>
                <h1 style={{ fontSize: "clamp(40px, 4.8vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0, fontWeight: 800 }}>
                  {t.hero.h1a}{" "}
                  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontStyle: "italic" }}>{t.hero.h1b}</span>
                </h1>
                <p style={{ marginTop: 26, maxWidth: 500, fontSize: 18, lineHeight: 1.55, opacity: 0.86 }}>{t.hero.sub}</p>

                {/* 2×2 grid: buttons + text links share column widths */}
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "12px 14px", marginTop: 38, width: "fit-content" }}>
                  {/* row 1: primary buttons */}
                  <a href={btnHref} style={btnPrimary}>
                    <LineIcon name="download" size={17} /> {btnLabel}
                  </a>
                  <a href={L.demo} target="_blank" rel="noopener" style={btnSecondary}>
                    {t.hero.btnDemo} <LineIcon name="arrow" size={16} />
                  </a>
                  {/* row 2: text links — auto-aligned under each button */}
                  <a href="#download" style={{ ...btnText, justifySelf: "start" }}>{t.hero.btnDocker}</a>
                  <a href="#download" style={{ ...btnText, display: "inline-flex", alignItems: "center", gap: 7, justifySelf: "start" }}>
                    {t.hero.allPlatforms} ↓
                    <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
                      <LineIcon name="windows" size={15} stroke={1.5} />
                      <LineIcon name="apple" size={15} stroke={1.5} />
                      <LineIcon name="linux" size={15} stroke={1.5} />
                    </span>
                  </a>
                </div>
              </>
            );
          })()}
        </div>

        {/* RIGHT — badge above, document, playful hint below */}
        <div className="sd-hero-doc" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2.5, opacity: 0.72, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 7, height: 7, background: "#fff", borderRadius: "50%" }} />
            {t.hero.badge}
          </div>

          <div className="sd-doc-card" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div className="sd-doc-deco" style={{ position: "absolute", width: 360, height: 460, background: "rgba(255,255,255,0.06)", transform: "translate(26px, 22px) rotate(3deg)", borderRadius: 5 }} />
            <div className="sd-doc-deco" style={{ position: "absolute", width: 360, height: 460, background: "rgba(255,255,255,0.1)", transform: "translate(13px, 11px) rotate(1.5deg)", borderRadius: 5 }} />
            <MiniDocDemo width={380} height={480} labels={{ signed: lang === "ru" ? "ПОДПИСАНО · ЛОКАЛЬНО" : "SIGNED · LOCAL" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: "#aebcff", opacity: 0.85 }}>
            <LineIcon name="scribble" size={16} /> {t.hero.hint}
          </div>
        </div>
      </div>

      {/* facts strip — outline icons, no emoji */}
      <div className="sd-facts" style={{
        position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.14)",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      }}>
        {t.facts.map((f, i) => (
          <div key={i} style={{
            padding: "20px 56px", display: "flex", alignItems: "center", gap: 14,
            borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 0.5,
          }}>
            <span style={{ opacity: 0.85, color: "#cdd6ff" }}><LineIcon name={t.factsIcons[i]} size={20} stroke={1.5} /></span>
            <span style={{ opacity: 0.95 }}>{f}</span>
            {i === t.facts.length - 1 && t.osNote && (
              <span style={{ marginLeft: "auto", fontSize: 11, letterSpacing: 1, opacity: 0.55, whiteSpace: "nowrap" }}>{t.osNote}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const navLink = { color: "#fff", textDecoration: "none" };
const btnPrimary = { display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: HERO_BG, padding: "15px 22px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 0.5, textDecoration: "none", fontWeight: 700, borderRadius: 4, whiteSpace: "nowrap" };
const btnSecondary = { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "15px 22px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 0.5, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 4, whiteSpace: "nowrap" };
const btnText = { color: "#bcc8ff", padding: "15px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 0.5, textDecoration: "none", whiteSpace: "nowrap", borderBottom: "1px solid transparent" };
const hdrBtnPrimary = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, height: 38, padding: "0 18px", background: "#fff", color: HERO_BG, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, fontWeight: 700, letterSpacing: 0.3, textDecoration: "none", borderRadius: 6, whiteSpace: "nowrap", border: "1px solid #fff" };
const hdrBtnGhost = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, height: 38, padding: "0 18px", background: "transparent", color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, fontWeight: 500, letterSpacing: 0.3, textDecoration: "none", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 6, whiteSpace: "nowrap" };
const hdrDonateLink = { color: "#cfd6ff", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, letterSpacing: 0.3, textDecoration: "none", borderBottom: "1px dotted rgba(207,214,255,0.55)", paddingBottom: 2, whiteSpace: "nowrap" };

function LangSwitch({ lang, setLang }) {
  return (
    <div style={{ display: "inline-flex", height: 38, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 6, overflow: "hidden", fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: 1 }}>
      {["ru", "en"].map((l) => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: "0 13px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center",
          background: lang === l ? "#fff" : "transparent", color: lang === l ? HERO_BG : "#fff",
          fontWeight: 700, fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit",
        }}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Header, Hero, MiniDocDemo, SignatureCursor, LangSwitch, HERO_BG, HERO_BG2, ACCENT_BLUE });
