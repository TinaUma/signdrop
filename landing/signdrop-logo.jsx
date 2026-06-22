// SignDrop logo — recreated as crisp SVG (fountain-pen nib + ink drop).
// Two color modes: "color" (navy + bright-blue drop) and "mono" (single color, e.g. white on dark).

const SD_NAVY = "#0d2747";
const SD_BLUE = "#2f6bff";
const SD_BLUE_BRIGHT = "#3b82f6";

// Icon only — fountain-pen nib with an ink drop at the tip.
function SignDropMark({ size = 48, mono = false, color = "#ffffff" }) {
  const nib = mono ? color : SD_NAVY;
  const drop = mono ? color : SD_BLUE;
  const rid = React.useId().replace(/[:]/g, "");
  const maskId = "sdmask-" + rid;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <mask id={maskId}>
          {/* white = visible nib */}
          <path
            d="M 45,88
               C 39,68 44,42 53,24
               C 55,20 59,18 64,19
               L 86,24
               C 90,25 91,29 89,33
               C 80,56 66,78 52,89
               C 49,91 46,91 45,88 Z"
            fill="#fff"
          />
          {/* black = cut out: center slit */}
          <path
            d="M 71,25 C 63,47 56,67 47,86"
            stroke="#000"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* black = cut out: breather hole */}
          <circle cx="65" cy="40" r="6" fill="#000" />
        </mask>
      </defs>

      {/* nib body with slit + hole cut out */}
      <rect x="30" y="14" width="70" height="82" fill={nib} mask={`url(#${maskId})`} />

      {/* ink drop falling from tip */}
      <path
        d="M 43,86
           C 39,95 30,100 30,109
           C 30,115.6 35.6,121 43,121
           C 50.4,121 56,115.6 56,109
           C 56,100 47,95 43,86 Z"
        fill={drop}
      />
      {/* drop highlight */}
      <path
        d="M 37,107 C 37,102 39,99 42,97"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity={mono ? 0.0 : 0.5}
      />
    </svg>
  );
}

// Full horizontal lockup with optional Russian subtitle + optional handwritten wordmark.
function SignDropLogo({ height = 38, mono = false, color = "#ffffff", ru = false, script = false }) {
  const wordCol = mono ? color : SD_NAVY;
  const subCol = mono ? color : SD_NAVY;

  if (script) {
    const mark = height * 1.95;
    const word = height * 1.62;
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
        <span style={{ display: "inline-flex", transform: "rotate(11deg)", transformOrigin: "55% 60%", marginRight: -height * 0.12 }}>
          <SignDropMark size={mark} mono={mono} color={color} />
        </span>
        <span style={{ display: "inline-flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Alex Brush', cursive", fontSize: word, lineHeight: 0.86, color: wordCol, whiteSpace: "nowrap" }}>
            Sign Drop
          </span>
          {ru && (
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: height * 0.32, fontWeight: 400, letterSpacing: "0.16em", opacity: 0.6, color: subCol, marginLeft: height * 0.2, marginTop: -height * 0.02, whiteSpace: "nowrap" }}>
              СайнДроп
            </span>
          )}
        </span>
      </div>
    );
  }

  const markSize = height * 1.15;
  const fontSize = height;
  const signCol = mono ? color : SD_NAVY;
  const dropCol = mono ? color : SD_BLUE_BRIGHT;
  const gap = height * 0.32;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap }}>
      <SignDropMark size={markSize} mono={mono} color={color} />
      <span style={{ display: "inline-flex", flexDirection: "column", gap: height * 0.28 }}>
        <span
          style={{
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            fontSize,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: signCol }}>Sign</span>
          <span style={{ color: dropCol }}>Drop</span>
        </span>
        {ru && (
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: height * 0.34,
              fontWeight: 400,
              letterSpacing: "0.14em",
              lineHeight: 1,
              opacity: 0.62,
              color: mono ? color : SD_NAVY,
              whiteSpace: "nowrap",
            }}
          >
            СайнДроп
          </span>
        )}
      </span>
    </div>
  );
}

Object.assign(window, { SignDropMark, SignDropLogo, SD_NAVY, SD_BLUE, SD_BLUE_BRIGHT });
