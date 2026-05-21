// Tweaks panel for LMS.uz landing
const LMS_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1FAC55",
  "density": "regular",
  "headlineStyle": "italic"
}/*EDITMODE-END*/;

// Map accent hex → matching soft + ink tones so the palette stays harmonious
const ACCENT_MAP = {
  "#1FAC55": { ink: "#167F3F", soft: "#E5F4EB", line: "#CCE7D7", glow: "rgba(31,172,85,.18)" },  // brand green
  "#3F3DDB": { ink: "#2A28B0", soft: "#ECECFB", line: "#DBDBF6", glow: "rgba(63,61,219,.18)" }, // indigo
  "#1F6AE5": { ink: "#114DAD", soft: "#E6EFFC", line: "#CFDEF7", glow: "rgba(31,106,229,.18)" }, // blue
  "#C2410C": { ink: "#9A3309", soft: "#FBEDDF", line: "#F2D6BB", glow: "rgba(194,65,12,.18)" },  // copper
  "#0A0A0A": { ink: "#000000", soft: "#EDECEA", line: "#D6D4D0", glow: "rgba(10,10,10,.18)" }    // mono
};

function applyAccent(hex) {
  const m = ACCENT_MAP[hex] || ACCENT_MAP["#3F3DDB"];
  const r = document.documentElement.style;
  r.setProperty('--accent', hex);
  r.setProperty('--accent-ink', m.ink);
  r.setProperty('--accent-soft', m.soft);
}

function applyDensity(d) {
  const r = document.documentElement.style;
  if (d === 'compact') r.setProperty('--container', '1180px');
  else if (d === 'comfy') r.setProperty('--container', '1320px');
  else r.setProperty('--container', '1240px');
}

function applyHeadline(style) {
  // toggles the italic span styling in the hero
  const el = document.querySelector('.hero__title .ital');
  if (!el) return;
  if (style === 'italic') { el.style.fontStyle = 'italic'; el.style.fontWeight = '400'; }
  else if (style === 'underline') { el.style.fontStyle = 'normal'; el.style.fontWeight = '500'; el.style.textDecoration = 'underline'; el.style.textDecorationThickness = '2px'; el.style.textUnderlineOffset = '6px'; el.style.textDecorationColor = 'var(--accent)'; }
  else { el.style.fontStyle = 'normal'; el.style.fontWeight = '500'; el.style.textDecoration = 'none'; el.style.color = 'var(--accent)'; }
}

function App() {
  const [t, setTweak] = useTweaks(LMS_TWEAK_DEFAULTS);
  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);
  React.useEffect(() => { applyDensity(t.density); }, [t.density]);
  React.useEffect(() => { applyHeadline(t.headlineStyle); }, [t.headlineStyle]);

  return (
    <TweaksPanel title="Sozlamalar">
      <TweakSection label="Asosiy rang" />
      <TweakColor
        label="Rang"
        value={t.accent}
        options={["#1FAC55", "#3F3DDB", "#1F6AE5", "#C2410C", "#0A0A0A"]}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakSection label="Joylashuv" />
      <TweakRadio
        label="Zichlik"
        value={t.density}
        options={['compact', 'regular', 'comfy']}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakSection label="Sarlavha" />
      <TweakRadio
        label="“AI asosidagi” uslubi"
        value={t.headlineStyle}
        options={['italic', 'underline', 'accent']}
        onChange={(v) => setTweak('headlineStyle', v)}
      />
    </TweaksPanel>
  );
}

const _root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
_root.render(<App />);
