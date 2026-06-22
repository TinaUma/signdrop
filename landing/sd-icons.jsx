// SignDrop — thin outline line-icons (stroke only, currentColor, no fill).
// Keeps the landing clean & "drawn", sidestepping standard emoji.
function LineIcon({ name, size = 20, stroke = 1.6, style }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block", ...style },
  };
  switch (name) {
    case "lock": // 100% local / privacy
      return (<svg {...common}><rect x="4" y="10.5" width="16" height="10" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /><circle cx="12" cy="15.5" r="1.2" /></svg>);
    case "free": // free forever — tag
      return (<svg {...common}><path d="M3.5 12.5 11 5a2 2 0 0 1 1.4-.6H19a1.5 1.5 0 0 1 1.5 1.5v6.6a2 2 0 0 1-.6 1.4l-7.5 7.5a1.5 1.5 0 0 1-2.1 0l-6.8-6.8a1.5 1.5 0 0 1 0-2.1Z" /><circle cx="16" cy="8" r="1.3" /></svg>);
    case "monitor": // web + windows
      return (<svg {...common}><rect x="3" y="4.5" width="18" height="12" rx="1.5" /><path d="M9 20h6M12 16.5V20" /></svg>);
    case "download":
      return (<svg {...common}><path d="M12 4v10" /><path d="m8 11 4 4 4-4" /><path d="M5 19h14" /></svg>);
    case "cube": // docker / container
      return (<svg {...common}><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" /><path d="m4 7 8 4 8-4M12 11v10" /></svg>);
    case "arrow":
      return (<svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>);
    case "scribble": // playful cursor hint
      return (<svg {...common}><path d="M3 16c2-4 3 2 5-2s3 4 5 0 3 2 5-2" /></svg>);
    case "shield":
      return (<svg {...common}><path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
    case "layers": // formats
      return (<svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>);
    case "eraser": // bg removal
      return (<svg {...common}><path d="M8 20H4l-1-1a2 2 0 0 1 0-3l9-9a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3l-6 6" /><path d="M8 20h12" /></svg>);
    case "library": // signature library
      return (<svg {...common}><rect x="4" y="5" width="5" height="14" rx="1" /><rect x="11" y="5" width="5" height="14" rx="1" /><path d="m18.5 6 2.3 12.5" /></svg>);
    case "move": // canvas drag
      return (<svg {...common}><path d="M12 3v18M3 12h18" /><path d="m7 7 5-4 5 4M7 17l5 4 5-4M7 7M3 12l4-5M3 12l4 5M21 12l-4-5M21 12l-4 5" /></svg>);
    case "pages": // multi-page
      return (<svg {...common}><rect x="7" y="3" width="12" height="15" rx="1.5" /><path d="M5 6v13a1.5 1.5 0 0 0 1.5 1.5H16" /></svg>);
    case "fingerprint": // uniquification
      return (<svg {...common}><path d="M12 5a6 6 0 0 1 6 6v3M6 11a6 6 0 0 1 3-5.2M8 19a8 8 0 0 1-1.5-4.5V11M12 9a2.5 2.5 0 0 1 2.5 2.5V14a4 4 0 0 0 .6 2.1M12 13v2a6 6 0 0 0 1 3.3" /></svg>);
    case "export":
      return (<svg {...common}><path d="M12 14V4" /><path d="m8 8 4-4 4 4" /><path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" /></svg>);
    case "steps": // step-by-step sidebar
      return (<svg {...common}><circle cx="6" cy="6" r="1.5" /><circle cx="6" cy="12" r="1.5" /><circle cx="6" cy="18" r="1.5" /><path d="M10 6h9M10 12h9M10 18h6" /></svg>);
    case "handwrite": // handwritten text + pen
      return (<svg {...common}><path d="M3 17c2.5 0 2-5 4-5s1.5 4 3.5 4 2.2-7 4.5-7c1.6 0 1.5 4 3 4" /><path d="M14.5 20.5l5-5a1.4 1.4 0 0 0-2-2l-5 5-.6 2.6 2.6-.6Z" /></svg>);
    case "windows":
      return (<svg {...common}><path d="M3 5.5 10.5 4.3V11H3zM10.5 13v6.7L3 18.5V13zM12.5 4 21 2.7V11h-8.5zM21 13v8.3L12.5 20v-7z" /></svg>);
    case "apple":
      return (<svg {...common}><path d="M16 12c0-2.2 1.7-3.2 1.8-3.3-1-1.4-2.5-1.6-3-1.7-1.3-.13-2.5.8-3.2.8-.66 0-1.66-.78-2.74-.76-1.4.02-2.7.82-3.42 2.08-1.46 2.54-.37 6.3 1.05 8.36.7 1 1.5 2.13 2.6 2.1 1.04-.05 1.44-.68 2.7-.68 1.25 0 1.6.68 2.7.66 1.12-.02 1.82-1.02 2.5-2.03.8-1.16 1.12-2.28 1.14-2.34-.03-.01-2.18-.84-2.2-3.3Z" /><path d="M14 5.5c.57-.7.96-1.66.85-2.62-.83.03-1.83.55-2.42 1.24-.53.62-1 1.6-.87 2.54.92.07 1.87-.47 2.44-1.16Z" /></svg>);
    case "linux":
      return (<svg {...common}><path d="M12 3c-2 0-3 1.8-3 4v3.3c0 1-.7 1.8-1.5 3C6.3 15 5.5 16.4 5.5 18c0 1.6 2.9 3 6.5 3s6.5-1.4 6.5-3c0-1.6-.8-3-2-4.7-.8-1.2-1.5-2-1.5-3V7c0-2.2-1-4-3-4Z" /><path d="M10.3 8.2h.01M13.7 8.2h.01" /><path d="M10.8 11.2c.7.6 1.7.6 2.4 0" /></svg>);
    case "github":
      return (<svg {...common}><path d="M9 19c-4 1.4-4-2-5.5-2.5M14.5 21v-3.4a3 3 0 0 0-.8-2.3c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C5.5 1.9 4.5 2.2 4.5 2.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3 8.6c0 4.6 2.7 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" /></svg>);
    case "heart":
      return (<svg {...common}><path d="M12 20s-7-4.3-9.2-8.3A5 5 0 0 1 12 6.5a5 5 0 0 1 9.2 5.2C19 15.7 12 20 12 20Z" /></svg>);
    case "check":
      return (<svg {...common}><path d="m5 12 4 4 10-10" /></svg>);
    case "cross":
      return (<svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>);
    case "coffee":
      return (<svg {...common}><path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" /><path d="M17 9h2.5a2.5 2.5 0 0 1 0 5H17" /><path d="M7 3v2M11 3v2" /></svg>);
    case "wallet":
      return (<svg {...common}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="16.5" cy="14" r="1.2" /></svg>);
    default:
      return null;
  }
}
window.LineIcon = LineIcon;
