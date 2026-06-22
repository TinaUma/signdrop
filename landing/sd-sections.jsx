// SignDrop — landing sections (blocks 3–10). Light "paper" sections + one navy privacy block.
// Palette
const SDC = {
  navy: "#0d2747", navyDeep: "#0a1ab5", blue: "#1a3df0", blueBright: "#3b82f6",
  paper: "#f5f3ee", ink: "#0c1320", line: "rgba(12,19,32,0.10)", card: "#ffffff",
};

function Kicker({ children, color = SDC.blue }) {
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 14, height: 1.5, background: color, display: "inline-block" }} />
      {children}
    </div>
  );
}

function MonoTag({ children, color = SDC.blue, light }) {
  return (
    <span style={{
      display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5,
      color: light ? "rgba(255,255,255,0.85)" : color, border: `1px solid ${light ? "rgba(255,255,255,0.3)" : color}`,
      padding: "5px 10px", borderRadius: 3,
    }}>{children}</span>
  );
}

// ============ Block 3 — HOW IT WORKS (vertical timeline) ============
function HowItWorks({ t }) {
  const d = t.how;
  return (
    <section id="how" data-screen-label="How it works" style={{ background: SDC.paper, color: SDC.ink, padding: "120px 56px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Kicker>{d.kicker}</Kicker>
        <h2 style={{ margin: "0 0 72px", fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.03em", fontWeight: 800, maxWidth: 720 }}>
          {d.title}
        </h2>
        <div style={{ position: "relative", paddingLeft: 64 }}>
          <div style={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 1.5, background: SDC.line }} />
          {d.steps.map((s, i) => (
            <div key={s.n} className="how-row" style={{
              position: "relative", display: "grid", gridTemplateColumns: "0.8fr 1.4fr", gap: 48,
              paddingBottom: i === d.steps.length - 1 ? 0 : 52, alignItems: "flex-start",
            }}>
              <div style={{ position: "absolute", left: -53, top: 4, width: 16, height: 16, background: SDC.blue, borderRadius: "50%", border: `3px solid ${SDC.paper}`, boxShadow: `0 0 0 1.5px ${SDC.blue}` }} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 2, opacity: 0.45, marginBottom: 10 }}>
                  {t.code === "ru" ? "ШАГ" : "STEP"} / {s.n}
                </div>
                <h3 style={{ margin: 0, fontSize: "clamp(24px, 2.6vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{s.t}</h3>
              </div>
              <div>
                <p style={{ margin: "6px 0 16px", fontSize: 17, lineHeight: 1.6, opacity: 0.75, maxWidth: 520 }}>{s.d}</p>
                <MonoTag>{s.m}</MonoTag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ Block 4 — FEATURES (bento) ============
const FEATURE_ICONS = ["layers", "eraser", "library", "move", "pages", "fingerprint", "export", "steps"];
function Features({ t }) {
  const d = t.features;
  const card = {
    background: SDC.card, border: `1px solid ${SDC.line}`, padding: 30, borderRadius: 8,
    display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 230,
  };
  return (
    <section id="features" data-screen-label="Features" style={{ background: SDC.paper, color: SDC.ink, padding: "40px 56px 120px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="feat-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 24 }}>
          <div>
            <Kicker>{d.kicker}</Kicker>
            <h2 style={{ margin: 0, fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.03em", fontWeight: 800, maxWidth: 640 }}>{d.title}</h2>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, opacity: 0.5, maxWidth: 280, lineHeight: 1.6, flexShrink: 0 }}>{d.note}</div>
        </div>

        <div className="bento" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "minmax(230px, auto)", gap: 14 }}>
          {/* flagship */}
          <div className="bento-hero" style={{ ...card, gridColumn: "span 4", gridRow: "span 2", background: SDC.navyDeep, color: "#fff", border: "none", padding: 42 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>{d.flagTag}</div>
              <h3 style={{ margin: 0, fontSize: "clamp(32px, 3.6vw, 52px)", letterSpacing: "-0.03em", lineHeight: 0.98, fontWeight: 800 }}>
                {d.flagTitle}<br />
                <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#9fb2ff" }}>{d.flagTitle2}</span>
              </h3>
              <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.55, opacity: 0.8, maxWidth: 460 }}>{d.flagDesc}</p>
            </div>
            <div className="flag-metric">
              <div className="flag-num">
                <span className="flag-zero">0</span>
                <span className="flag-unit">{t.code === "ru" ? "байт" : "bytes"}</span>
              </div>
              <div className="flag-label">{d.flagMetric}</div>
              <div className="flag-lane" aria-hidden="true">
                <span className="flag-doc"><LineIcon name="layers" size={20} stroke={1.6} /></span>
                <span className="flag-track">
                  <span className="flag-pkt p1" />
                  <span className="flag-pkt p2" />
                  <span className="flag-pkt p3" />
                  <span className="flag-bound" />
                </span>
                <span className="flag-server">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>
                  <span className="flag-x">✕</span>
                </span>
              </div>
            </div>
          </div>

          {/* 7 feature cards */}
          {d.items.map((it, i) => (
            <div key={i} style={{ ...card, gridColumn: "span 2" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: SDC.blue }}><LineIcon name={FEATURE_ICONS[i]} size={26} stroke={1.5} /></span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1.5, opacity: 0.4 }}>{it.tag}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.12 }}>{it.t}</h3>
                <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.55, opacity: 0.7 }}>{it.d}</p>
              </div>
              {it.chips && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
                  {it.chips.map((c) => (
                    <span key={c} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, opacity: 0.6, border: `1px solid ${SDC.line}`, padding: "4px 8px", borderRadius: 3 }}>{c}</span>
                  ))}
                </div>
              )}
              {it.mono && <div style={{ marginTop: 14 }}><MonoTag>{it.mono}</MonoTag></div>}
            </div>
          ))}

          {/* killer feature — wide banner, card style with blue accent */}
          {d.killer && (
            <div className="bento-killer" style={{ ...card, gridColumn: "span 6", minHeight: 0, flexDirection: "row", alignItems: "center", gap: 26 }}>
              <span style={{ flexShrink: 0, display: "inline-flex", width: 60, height: 60, borderRadius: 12, background: "rgba(26,61,240,0.08)", color: SDC.blue, alignItems: "center", justifyContent: "center" }}>
                <LineIcon name="handwrite" size={32} stroke={1.6} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1.5, opacity: 0.4 }}>{d.killer.tag}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, fontWeight: 700, color: "#fff", background: SDC.blue, padding: "2px 8px", borderRadius: 3 }}>★ {d.killer.badge}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: SDC.ink }}>{d.killer.t}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.5, opacity: 0.7, maxWidth: 760 }}>{d.killer.d}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============ Block 5 — PRIVACY (navy section, file→browser→done) ============
function Privacy({ t }) {
  const d = t.privacy;
  return (
    <section id="privacy" data-screen-label="Privacy" style={{ background: `linear-gradient(155deg, ${SDC.navyDeep} 0%, #0c1fcb 100%)`, color: "#fff", padding: "120px 56px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="privacy-grid">
        <div>
          <Kicker color="#9fb2ff">{d.kicker}</Kicker>
          <h2 style={{ margin: "0 0 24px", fontSize: "clamp(34px, 4vw, 58px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 800 }}>{d.title}</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.85, maxWidth: 520, margin: 0 }}>{d.text}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <MonoTag light>{d.chips}</MonoTag>
          </div>
        </div>

        {/* diagram */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <div className="privacy-flow" style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {d.flow.map((step, i) => (
              <React.Fragment key={step}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 110 }}>
                  <div style={{ width: 74, height: 74, borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.06)" }}>
                    {i === 1
                      ? <SignDropMark size={42} mono color="#fff" />
                      : <LineIcon name={i === 0 ? "layers" : "check"} size={32} stroke={1.5} />}
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", opacity: 0.85 }}>{step}</span>
                </div>
                {i < d.flow.length - 1 && <LineIcon name="arrow" size={22} style={{ opacity: 0.5 }} />}
              </React.Fragment>
            ))}
          </div>
          {/* cloud, struck out */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.5, position: "relative" }}>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="#fff" strokeWidth="1.5">
              <path d="M16 30a9 9 0 0 1 0-18 12 12 0 0 1 22 3 7 7 0 0 1 6 15Z" />
              <path d="M8 8l44 28" stroke="#ff7a7a" strokeWidth="2" />
            </svg>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>{d.cloud} — {d.cloudNote}</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 1, color: "#9fb2ff", marginTop: 4 }}>{d.metric}</div>
        </div>
      </div>
    </section>
  );
}

// ============ Block 6 — COMPARISON TABLE ============
function Comparison({ t }) {
  const d = t.compare;
  function Cell({ v, invert }) {
    const good = (icon) => <span style={{ color: SDC.blue, display: "inline-flex" }}><LineIcon name={icon} size={20} stroke={2} /></span>;
    const bad = () => <span style={{ color: "rgba(12,19,32,0.3)", display: "inline-flex" }}><LineIcon name="cross" size={18} stroke={2} /></span>;
    const txt = (s, strong) => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: 0.3, color: strong ? SDC.blue : "rgba(12,19,32,0.55)", fontWeight: strong ? 700 : 400 }}>{s}</span>;
    switch (v) {
      case "yes": return good("check");
      case "no": return bad();
      case "never": return <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{good("check")}{txt(d.rows.find(r => r.invert)?.neverText, true)}</span>;
      case "autoyes": return <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{good("check")}{txt(t.code === "ru" ? "авто" : "auto")}</span>;
      case "yes100": return <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{good("check")}{txt("100%", true)}</span>;
      case "partial": return txt(d.labels.partial);
      case "drawonly": return <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{bad()}{txt(d.labels.drawonly)}</span>;
      default: return txt(v);
    }
  }

  return (
    <section id="compare" data-screen-label="Comparison" style={{ background: SDC.paper, color: SDC.ink, padding: "120px 56px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Kicker>{d.kicker}</Kicker>
        <h2 style={{ margin: "0 0 48px", fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.03em", fontWeight: 800 }}>
          {d.title.split("SignDrop").map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span style={{ color: SDC.blue }}>SignDrop</span>}
            </React.Fragment>
          ))}
        </h2>

        <div style={{ overflowX: "auto", border: `1px solid ${SDC.line}`, borderRadius: 10, background: SDC.card }}>
          <table className="cmp-table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "18px 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1, fontWeight: 400, opacity: 0.5, borderBottom: `1px solid ${SDC.line}` }}></th>
                {d.cols.map((c, i) => (
                  <th key={c} style={{
                    padding: "18px 16px", fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em",
                    borderBottom: `1px solid ${SDC.line}`, textAlign: "center", whiteSpace: "nowrap",
                    color: i === 0 ? SDC.blue : SDC.ink,
                    background: i === 0 ? "rgba(26,61,240,0.06)" : "transparent",
                  }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rows.map((row, ri) => (
                <tr key={ri}>
                  <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, borderBottom: `1px solid ${SDC.line}`, borderRight: `1px solid ${SDC.line}` }}>{row.label}</td>
                  {row.vals.map((v, ci) => (
                    <td key={ci} style={{
                      padding: "14px 16px", textAlign: "center", borderBottom: `1px solid ${SDC.line}`, verticalAlign: "middle",
                      background: ci === 0 ? "rgba(26,61,240,0.06)" : "transparent",
                    }}>
                      <Cell v={v} invert={row.invert} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 20, fontSize: 13, lineHeight: 1.55, maxWidth: 720, fontWeight: 500, color: SDC.blue }}>
          <span>★ </span>{d.footer}
        </p>
      </div>
    </section>
  );
}

// ============ Block 7 — ALL INSIDE (enclosed glowing contour) ============
// A document lives inside a glowing "contour" — its own environment.
// Inside: signature drops, a handwritten date is written by hand (killer feature),
// then a "saved locally" chip. Everything outside stays quiet and empty.
function LocalContour({ lang }) {
  const sig = (typeof window !== "undefined" && window.SD_SIGNATURE) || "assets/signature-navy.png";
  const lineCol = "#dad6cc";
  const dateStr = "15.06.2026";
  const labels = lang === "ru"
    ? { file: "AGREEMENT.PDF", sign: "ПОДПИСЬ", date: "ДАТА", chip: "СОХРАНЕНО ЛОКАЛЬНО" }
    : { file: "AGREEMENT.PDF", sign: "SIGNATURE", date: "DATE", chip: "SAVED LOCALLY" };

  return (
    <div className="lc-wrap" aria-hidden="true">
      <div className="lc-aura" />
      <div className="lc-ring">
        <span className="lc-spark" />
        <div className="lc-doc">
          <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 16px 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: 1.5, opacity: 0.5 }}>
            <span>{labels.file}</span><span>1 / 3</span>
          </div>
          <div style={{ padding: "0 22px", fontFamily: "Georgia, serif" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 11, letterSpacing: "-0.01em", color: "#1a1a1a" }}>Service Agreement</div>
            {[0.96, 0.86, 0.92, 0.66, 0.88].map((w, i) => (
              <div key={i} style={{ height: 4.5, width: `${w * 100}%`, background: lineCol, borderRadius: 2, marginBottom: 9 }} />
            ))}
          </div>

          {/* fields row */}
          <div style={{ position: "absolute", left: 22, right: 22, bottom: 30, display: "flex", gap: 16 }}>
            {/* signature field */}
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, height: 44 }}>
                <img className="lc-sig" src={sig} alt="" style={{ width: "100%", maxWidth: 120, height: "auto", display: "block" }} />
              </div>
              <div style={{ borderTop: `1px solid ${lineCol}`, paddingTop: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 7.5, letterSpacing: 1.5, opacity: 0.55 }}>{labels.sign}</div>
            </div>
            {/* date field — handwritten, written by hand */}
            <div style={{ width: 110, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 18, left: 2, right: 0, height: 40, overflow: "visible" }}>
                <div className="lc-datewrap">
                  <span className="lc-date">{dateStr}</span>
                  <span className="lc-pen">
                    <svg width="14" height="14" viewBox="0 0 24 24"><path d="M3 21l3-1 12-12-2-2L4 18l-1 3z" fill="#12224a"/><path d="M16 5l3 3" stroke="#12224a" strokeWidth="1.5"/></svg>
                  </span>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${lineCol}`, paddingTop: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 7.5, letterSpacing: 1.5, opacity: 0.55 }}>{labels.date}</div>
            </div>
          </div>

          {/* saved-locally chip */}
          <div className="lc-chip" style={{
            position: "absolute", right: 12, top: 12, padding: "4px 8px", background: SDC.blue, color: "#fff",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 7.5, letterSpacing: 1.5, borderRadius: 3,
            display: "inline-flex", alignItems: "center", gap: 4,
          }}>
            <LineIcon name="check" size={10} stroke={2.4} /> {labels.chip}
          </div>
        </div>
      </div>
    </div>
  );
}

function Demo({ t, lang }) {
  const d = t.demo;
  return (
    <section id="demo" data-screen-label="All inside" style={{ background: `radial-gradient(880px 520px at 80% 50%, #16279f 0%, ${SDC.navyDeep} 58%)`, color: "#fff", padding: "120px 56px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }} className="demo-grid">
        <div>
          <Kicker color="#9fb2ff">{d.kicker}</Kicker>
          <h2 style={{ margin: "0 0 20px", fontSize: "clamp(32px, 3.6vw, 54px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontWeight: 800 }}>{d.title}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.62, opacity: 0.84, maxWidth: 520, margin: 0 }}>{d.text}</p>
          <div style={{ display: "grid", gap: 17, margin: "30px 0 34px", maxWidth: 560 }}>
            {d.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ color: "#9fb2ff", marginTop: 1, flexShrink: 0 }}><LineIcon name="check" size={20} stroke={2} /></span>
                <span style={{ fontSize: 16, opacity: 0.92, lineHeight: 1.45 }}>
                  {b}
                  {i === d.killerIdx && (
                    <span style={{ marginLeft: 9, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, fontWeight: 700, color: "#0a1ab5", background: "#9fb2ff", padding: "2px 7px", borderRadius: 3, verticalAlign: "middle", whiteSpace: "nowrap" }}>★ {d.killerBadge}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <a href={window.SD_LINKS.demo} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: SDC.navyDeep, padding: "15px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 0.5, textDecoration: "none", fontWeight: 700, borderRadius: 4 }}>
            {d.cta} <LineIcon name="arrow" size={16} />
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <LocalContour lang={lang} />
        </div>
      </div>
    </section>
  );
}

// ============ Block 8 — DOWNLOAD / RUN (compact) ============
const dlLabel = { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2, opacity: 0.5, marginBottom: 14 };
const dlBadge = { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, border: "1px solid rgba(12,19,32,0.14)", padding: "3px 7px", borderRadius: 3 };
const dlBtn = { display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18, padding: "18px 20px", borderRadius: 10, textDecoration: "none", border: `1px solid ${SDC.line}`, background: SDC.card, minHeight: 118 };
function Download({ t }) {
  const d = t.download; const L = window.SD_LINKS;
  const row = { display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 10, textDecoration: "none", border: `1px solid ${SDC.line}`, background: SDC.card };
  const osTile = { display: "flex", flexDirection: "column", gap: 14, padding: "24px 24px", borderRadius: 12, textDecoration: "none", border: `1px solid ${SDC.line}`, background: SDC.card, minHeight: 150, justifyContent: "space-between", transition: "transform 0.15s, box-shadow 0.15s" };
  return (
    <section id="download" data-screen-label="Download" style={{ background: SDC.paper, color: SDC.ink, padding: "110px 56px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Kicker>{d.kicker}</Kicker>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, margin: "0 0 40px" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(34px, 4vw, 60px)", lineHeight: 1.0, letterSpacing: "-0.03em", fontWeight: 800 }}>{d.title}</h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1, color: SDC.blue, paddingBottom: 6 }}>
            <span style={{ display: "inline-flex", gap: 7 }}>
              <LineIcon name="windows" size={17} stroke={1.6} /><LineIcon name="apple" size={17} stroke={1.6} /><LineIcon name="linux" size={17} stroke={1.6} />
            </span>
            {d.crossNote}
          </div>
        </div>

        {/* OS download tiles — cross-platform row */}
        <div style={dlLabel}>{d.usersTitle}</div>
        <div className="dl-os" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 30 }}>
          {d.os.map((o, i) => {
            const primary = i === 0;
            return (
              <a key={o.id} href={L[o.link]} target={o.link === "exe" ? undefined : "_blank"} rel="noopener"
                 style={{ ...osTile, ...(primary ? { background: SDC.blue, borderColor: SDC.blue, color: "#fff" } : { color: SDC.ink }) }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: primary ? "#fff" : SDC.blue }}><LineIcon name={o.icon} size={32} stroke={1.5} /></span>
                  <span style={{ color: primary ? "rgba(255,255,255,0.9)" : SDC.blue }}><LineIcon name="download" size={20} /></span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em" }}>{o.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, opacity: primary ? 0.85 : 0.55 }}>{o.sub}</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* developers row — GitHub + Docker */}
        <div style={dlLabel}>{d.devsTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="dl-grid">
          <a href={L.github} target="_blank" rel="noopener" style={{ ...row, color: SDC.ink, flexDirection: "column", alignItems: "stretch", gap: 12, minHeight: 118, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}><LineIcon name="github" size={24} stroke={1.5} /> <span style={{ fontWeight: 700, fontSize: 15 }}>{d.ghTitle}</span></span>
              <span style={{ display: "flex", gap: 6 }}><span style={dlBadge}>{d.badgeVer}</span><span style={dlBadge}>{d.badgeLic}</span></span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: SDC.blue, display: "inline-flex", alignItems: "center", gap: 6 }}>github.com/TinaUma/signdrop <LineIcon name="arrow" size={13} /></span>
          </a>
          <div style={{ ...row, flexDirection: "column", alignItems: "stretch", gap: 12, cursor: "default" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: SDC.blue }}><LineIcon name="cube" size={22} /></span> <span style={{ fontWeight: 700, fontSize: 15 }}>{d.dockerTitle}</span></span>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, background: "rgba(12,19,32,0.05)", padding: "10px 12px", borderRadius: 6, color: SDC.ink, lineHeight: 1.5, overflowX: "auto", whiteSpace: "nowrap" }}><span style={{ color: SDC.blue }}>$</span> {L.docker}</code>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Block 9 — SUPPORT ============
function Support({ t }) {
  const d = t.support; const L = window.SD_LINKS;
  return (
    <section id="support" data-screen-label="Support" style={{ background: SDC.paper, color: SDC.ink, padding: "0 56px 120px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", background: SDC.navyDeep, borderRadius: 16, padding: "64px 56px", color: "#fff", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }} className="support-card">
        <div>
          <Kicker color="#9fb2ff">{d.kicker}</Kicker>
          <h2 style={{ margin: "0 0 16px", fontSize: "clamp(30px, 3.2vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800 }}>{d.title}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.82, maxWidth: 480, margin: 0 }}>{d.text}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <a href={L.kofi} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", color: SDC.navyDeep, padding: "16px 22px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>
            <LineIcon name="heart" size={24} /> {d.kofi}
            <span style={{ marginLeft: "auto" }}><LineIcon name="arrow" size={18} /></span>
          </a>
          <a href={L.yoomoney} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 14, background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 8, textDecoration: "none", fontWeight: 700, border: "1px solid rgba(255,255,255,0.35)" }}>
            <LineIcon name="wallet" size={24} /> {d.yoomoney}
            <span style={{ marginLeft: "auto" }}><LineIcon name="arrow" size={18} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ Block 10 — FOOTER ============
function Footer({ t }) {
  const d = t.footer; const L = window.SD_LINKS;
  const colHead = { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: 2, opacity: 0.45, marginBottom: 13 };
  const fLink = { display: "block", color: "#f5f3ee", textDecoration: "none", fontSize: 13, marginBottom: 8, opacity: 0.82 };
  return (
    <footer data-screen-label="Footer" style={{ background: "#080a1c", color: "#f5f3ee", padding: "48px 56px 24px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr", gap: 40, alignItems: "flex-start" }} className="footer-grid">
        {/* col 1 — logo */}
        <div>
          <SignDropLogo height={42} mono color="#fff" />
          <p style={{ margin: "13px 0 0", opacity: 0.5, fontSize: 12, lineHeight: 1.4, whiteSpace: "nowrap" }}>{d.tagline}</p>
        </div>
        {/* col 2 — links */}
        <div>
          <div style={colHead}>{d.links}</div>
          <a href={L.demo} target="_blank" rel="noopener" style={fLink}>{d.linkTry} ↗</a>
          <a href={L.github} target="_blank" rel="noopener" style={fLink}>{d.linkGithub} ↗</a>
          <a href="#download" style={fLink}>{d.linkDownload} ↗</a>
          <a href="#support" style={fLink}>{d.linkSupport} ↗</a>
        </div>
        {/* col 3 — documents */}
        <div>
          <div style={colHead}>{d.docs}</div>
          <a href={L.privacy} style={fLink}>{d.docPrivacy}</a>
          <a href={L.terms} style={fLink}>{d.docTerms}</a>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "36px auto 0", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 0.8, opacity: 0.45 }}>
        {d.copyright} · {d.madeWith} <a href="https://github.com/Kibertum/tausik-core" target="_blank" rel="noopener" style={{ color: "inherit" }}>TAUSIK Core</a> · <a href="https://github.com/TinaUma/signdrop/blob/main/LICENSE" target="_blank" rel="noopener" style={{ color: "inherit" }}>{d.licLabel}</a> · v1.1.2
      </div>
    </footer>
  );
}

// ============ Cookie consent banner ============
function CookieBanner({ t }) {
  const d = t.cookie; const L = window.SD_LINKS;
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    try { if (localStorage.getItem("sd_cookie_ok") !== "1") setShow(true); } catch (e) { setShow(true); }
  }, []);
  if (!show) return null;
  const accept = () => {
    try { localStorage.setItem("sd_cookie_ok", "1"); } catch (e) {}
    setShow(false);
  };
  return (
    <div className="sd-cookie" role="dialog" aria-live="polite" style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: "#080a1c", color: "#f5f3ee", borderTop: "1px solid rgba(255,255,255,0.12)",
      padding: "16px 56px", display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
      boxShadow: "0 -10px 40px rgba(0,0,0,0.35)",
    }}>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, opacity: 0.9, maxWidth: 920 }}>
        {d.text}{" "}
        <a href={L.privacy} style={{ color: "#9fb2ff", textDecoration: "underline" }}>{d.link}</a>
      </p>
      <button onClick={accept} style={{
        flexShrink: 0, background: "#0a1ab5", color: "#fff", border: "none", cursor: "pointer",
        padding: "12px 28px", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
        fontWeight: 700, letterSpacing: 0.5,
      }}>{d.accept}</button>
    </div>
  );
}

Object.assign(window, { HowItWorks, Features, Privacy, Comparison, Demo, Download, Support, Footer, CookieBanner });
