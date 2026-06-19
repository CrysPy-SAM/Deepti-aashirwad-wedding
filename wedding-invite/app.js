const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

/* ----- decorative top garland (marigold festoon) ----- */
function Garland() {
  const flowers = [35, 107, 179, 251, 330, 409, 481, 553, 625];
  return /*#__PURE__*/React.createElement("svg", {
    className: "garland",
    viewBox: "0 0 660 110",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "gOuter",
    cx: "50%",
    cy: "32%",
    r: "68%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor:"#FFD66B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: "#F2A93B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#B8650E"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "gInner",
    cx: "50%",
    cy: "32%",
    r: "68%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#FFA9A0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "#A91D3A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#5E0E1F"
  })), /*#__PURE__*/React.createElement("g", {
    id: "flower"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "20",
    fill: "url(#gOuter)"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "11.5",
    fill: "url(#gInner)"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "4.2",
    fill: "#FFF1C2"
  })), /*#__PURE__*/React.createElement("path", {
    id: "leaf",
    d: "M0,0 C-6,-9 -2,-20 0,-24 C2,-20 6,-9 0,0 Z",
    fill: "#1F5A3D"
  })), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "5",
    x2: "660",
    y2: "5",
    stroke: "#A87C2E",
    strokeWidth: "2"
  }), flowers.map((x, i) => {
    const deep = i % 2 === 1;
    const y2 = deep ? 58 : 42,
      fy = deep ? 68 : 52;
    return /*#__PURE__*/React.createElement("g", {
      key: x
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: "5",
      x2: x,
      y2: y2,
      stroke: "#A87C2E",
      strokeWidth: "1.3"
    }), /*#__PURE__*/React.createElement("use", {
      href: "#leaf",
      transform: `translate(${x - 15},${y2 - 2}) rotate(-25)`
    }), /*#__PURE__*/React.createElement("use", {
      href: "#leaf",
      transform: `translate(${x + 15},${y2 - 2}) rotate(25) scale(-1,1)`
    }), /*#__PURE__*/React.createElement("use", {
      href: "#flower",
      transform: `translate(${x},${fy})`
    }));
  }));
}

/* ----- falling marigold petals, ambient background ----- */
function PetalField({
  burst
}) {
  const base = useMemo(() => Array.from({
    length: 16
  }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 10,
    duration: 9 + Math.random() * 8,
    delay: Math.random() * 10,
    sway: Math.random() * 40 - 20 + 'px',
    color: i % 2 === 0 ? 'var(--marigold-1)' : 'var(--marigold-2)'
  })), []);
  const [extra, setExtra] = useState([]);
  useEffect(() => {
    if (!burst) return;
    const items = Array.from({
      length: 26
    }, (_, i) => ({
      id: 'b' + i,
      left: Math.random() * 100,
      size: 7 + Math.random() * 9,
      duration: 3.5 + Math.random() * 3,
      delay: Math.random() * 1.2,
      sway: Math.random() * 60 - 30 + 'px',
      color: i % 2 === 0 ? 'var(--marigold-1)' : 'var(--marigold-2)'
    }));
    setExtra(items);
    const t = setTimeout(() => setExtra([]), 7000);
    return () => clearTimeout(t);
  }, [burst]);
  const all = [...base, ...extra];
  return /*#__PURE__*/React.createElement("div", {
    className: "petal-field",
    "aria-hidden": "true"
  }, all.map(p => /*#__PURE__*/React.createElement("span", {
    key: p.id,
    className: "petal",
    style: {
      left: p.left + '%',
      width: p.size + 'px',
      height: p.size + 'px',
      background: p.color,
      animationDuration: p.duration + 's',
      animationDelay: p.delay + 's',
      ['--sway']: p.sway
    }
  })));
}

/* ----- scroll-reveal wrapper ----- */
function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVis(true);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, {
      threshold: 0.18
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const cls = ("reveal " + className + (vis ? " visible" : "")).trim();
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: cls,
    ...rest
  }, children);
}

/* ----- countdown to the wedding day ----- */
function Countdown() {
  const target = useMemo(() => new Date('2026-06-29T00:00:00+05:30').getTime(), []);
  const [t, setT] = useState(target - Date.now());
  useEffect(() => {
    const iv = setInterval(() => setT(target - Date.now()), 1000);
    return () => clearInterval(iv);
  }, [target]);
  const clamped = Math.max(t, 0);
  const d = Math.floor(clamped / 86400000);
  const h = Math.floor(clamped % 86400000 / 3600000);
  const m = Math.floor(clamped % 3600000 / 60000);
  const s = Math.floor(clamped % 60000 / 1000);
  return /*#__PURE__*/React.createElement("div", {
    className: "countdown-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "countdown-label"
  }, "शुभ विवाह तक"), /*#__PURE__*/React.createElement("div", {
    className: "countdown"
  }, [[d, 'दिन'], [h, 'घंटे'], [m, 'मिनट'], [s, 'सेकंड']].map(([v, u]) => /*#__PURE__*/React.createElement("div", {
    className: "cbox",
    key: u
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, String(v).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, u)))));
}

/* ----- the temple-gate opening overlay ----- */
function Gate({
  open,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gate" + (open ? " opened" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "gate-panel left"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "motif",
    viewBox: "0 0 100 200",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "10",
    width: "80",
    height: "180",
    fill: "none",
    stroke: "#E8C75C",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "55",
    r: "20",
    fill: "none",
    stroke: "#E8C75C",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "55",
    r: "9",
    fill: "#E8C75C",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30,130 Q50,100 70,130 L70,180 L30,180 Z",
    fill: "none",
    stroke: "#E8C75C",
    strokeWidth: "1.2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gate-panel right"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "motif",
    viewBox: "0 0 100 200",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "10",
    width: "80",
    height: "180",
    fill: "none",
    stroke: "#E8C75C",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "55",
    r: "20",
    fill: "none",
    stroke: "#E8C75C",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "55",
    r: "9",
    fill: "#E8C75C",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30,130 Q50,100 70,130 L70,180 L30,180 Z",
    fill: "none",
    stroke: "#E8C75C",
    strokeWidth: "1.2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gate-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gate-om"
  }, "ॐ"), /*#__PURE__*/React.createElement("div", {
    className: "gate-title"
  }, "दीप्ति ❀ आशीर्वाद"), /*#__PURE__*/React.createElement("div", {
    className: "gate-sub"
  }, "आप सादर आमंत्रित हैं"), /*#__PURE__*/React.createElement("button", {
    className: "open-btn",
    onClick: onOpen
  }, "निमंत्रण खोलें")));
}
function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'auto' : 'hidden';
  }, [open]);
  const venueQuery = encodeURIComponent('Saraswati Marriage Lawn, Hedgewar Marg, Mahuariya, Gabhadiya, Sultanpur, Uttar Pradesh');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PetalField, {
    burst: open
  }), /*#__PURE__*/React.createElement(Gate, {
    open: open,
    onOpen: () => setOpen(true)
  }), /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "frame-inner"
  }), /*#__PURE__*/React.createElement(Garland, null), /*#__PURE__*/React.createElement(Reveal, {
    className: "ganesh-line"
  }, "॥ श्री गणेशाय नमः ॥"), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "intro"
  }, "परमपिता परमेश्वर की असीम अनुकंपा से, हमारी सुपुत्री का शुभ विवाह तय हुआ है। इस मांगलिक वेला में आप सपरिवार सादर आमंत्रित हैं।"), /*#__PURE__*/React.createElement(Reveal, {
    className: "couple"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      marginBottom: 14
    }
  }, "वर - वधू"), /*#__PURE__*/React.createElement("div", {
    className: "vadhu"
  }, "आयु. इंजी. दीप्ति द्विवेदी"), /*#__PURE__*/React.createElement("div", {
    className: "parents"
  }, "(सुपुत्री – स्मृतिशेष मालती द्विवेदी एवं श्री शिव प्रसाद द्विवेदी)"), /*#__PURE__*/React.createElement("div", {
    className: "weds"
  }, "वेड्स"), /*#__PURE__*/React.createElement("div", {
  className: "var"
},
  "चि. इंजी. आशीर्वाद तिवारी",
  /*#__PURE__*/React.createElement("br", null),
  /*#__PURE__*/React.createElement("span", {
    className: "designation"
  }, "(Data Science Manager)")
), /*#__PURE__*/React.createElement("div", {
    className: "parents"
  }, "(सुपुत्र – श्रीमती आशा तिवारी एवं श्री त्रिभुवन तिवारी)")), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Countdown, null)), /*#__PURE__*/React.createElement(Reveal, {
    className: "flourish"
  }, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "glyph"
  }, "❁"), /*#__PURE__*/React.createElement("div", {
    className: "line"
  })), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "वैवाहिक कार्यक्रम विवरण"), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tl-content"
  }, /*#__PURE__*/React.createElement("b", null, "मातृपूजन"), /*#__PURE__*/React.createElement("span", null, "28 जून 2026, रविवार"))), /*#__PURE__*/React.createElement("div", {
    className: "tl-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tl-content"
  }, /*#__PURE__*/React.createElement("b", null, "शुभ विवाह"), /*#__PURE__*/React.createElement("span", null, "29 जून 2026, सोमवार"))), /*#__PURE__*/React.createElement("div", {
    className: "tl-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tl-content"
  }, /*#__PURE__*/React.createElement("b", null, "बारात विदाई"), /*#__PURE__*/React.createElement("span", null, "30 जून 2026, मंगलवार")))), /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "(विशेष नोट: लड़की की विदाई 01 जुलाई 2026)")), /*#__PURE__*/React.createElement(Reveal, {
    className: "venue-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      marginBottom: 0
    }
  }, "वैवाहिक स्थल"), /*#__PURE__*/React.createElement("div", {
    className: "venue-name"
  }, "\"सरस्वती मैरिज लॉन\""), /*#__PURE__*/React.createElement("div", {
    className: "venue-address"
  }, "हेडगेवार मार्ग, महुअरिया, गभड़िया", /*#__PURE__*/React.createElement("br", null), "सुल्तानपुर (उ.प्र.)"), /*#__PURE__*/React.createElement("a", {
    className: "map-btn",
    href: `https://www.google.com/maps/search/?api=1&query=${venueQuery}`,
    target: "_blank",
    rel: "noreferrer"
  }, "📍 दिशा निर्देश पाएं")), /*#__PURE__*/React.createElement(Reveal, {
    className: "host-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      marginBottom: 10
    }
  }, "दर्शनाभिलाषी एवं विनीत"), /*#__PURE__*/React.createElement("div", {
    className: "name-line"
  }, "शिव प्रसाद द्विवेदी (पूर्व जिला लेखा परीक्षा अधिकारी)"), /*#__PURE__*/React.createElement("div", null, "ग्राम – घासीपुर, पोस्ट – लोहरामऊ, जिला – सुल्तानपुर"), /*#__PURE__*/React.createElement("div", {
    className: "phone-line"
  }, "📞 ", /*#__PURE__*/React.createElement("a", {
    href: "tel:+919696849039"
  }, "9696849039"), ", ", /*#__PURE__*/React.createElement("a", {
    href: "tel:+917651880083"
  }, "7651880083"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "flourish"
  }, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "glyph"
  }, "✉"), /*#__PURE__*/React.createElement("div", {
    className: "line"
  })), /*#__PURE__*/React.createElement(Reveal, {
    className: "host-section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      marginBottom: 10
    }
  }, "प्रेषक"), /*#__PURE__*/React.createElement("div", {
    className: "name-line"
  }, "धर्मेन्द्र द्विवेदी"), /*#__PURE__*/React.createElement("div", null, "(काशी प्रान्त सह प्रचार विभाग प्रमुख - स्वदेशी जागरण मंच)"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, "निवास – मालती सदन, शिवराज नगर,", /*#__PURE__*/React.createElement("br", null), "निकट – स्टेला मेरिस कान्वेंट स्कूल"), /*#__PURE__*/React.createElement("div", null, "सौरमऊ - सुल्तानपुर (उ.प्र.)")), /*#__PURE__*/React.createElement(Reveal, {
    className: "closing"
  }, "\"वर-वधू को अपना स्नेहिल आशीर्वाद प्रदान करने के लिए", /*#__PURE__*/React.createElement("br", null), "आपकी उपस्थिति प्रार्थनीय है।\""), /*#__PURE__*/React.createElement("div", {
    className: "bottom-glyph"
  }, "🌸 ॐ 🌸"), /*#__PURE__*/React.createElement("div", {
    className: "credit"
  }, "सपरिवार सादर आमंत्रित"))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));