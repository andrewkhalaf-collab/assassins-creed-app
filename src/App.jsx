import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const GAMES = [
  { id:1,  year:2007, title:"Assassin's Creed",    setting:"Holy Land, 1191",        protagonist:"Altaïr Ibn-La'Ahad",        era:"Third Crusade",        color:"#c8a96e", desc:"The original. A young assassin uncovers a Templar conspiracy during the Third Crusade across Jerusalem, Acre, and Damascus.",                                                               img:"https://images.unsplash.com/photo-1563349065-2d2e6832fc97?w=900&q=80" },
  { id:2,  year:2009, title:"Assassin's Creed II", setting:"Renaissance Italy, 1476",protagonist:"Ezio Auditore da Firenze",  era:"Italian Renaissance",  color:"#d4af37", desc:"Renaissance Italy comes alive as Ezio seeks vengeance for his family's murder and uncovers a vast Templar conspiracy reaching the Vatican.",                                               img:"https://images.unsplash.com/photo-1499678329028-101435549a4e?w=900&q=80" },
  { id:3,  year:2010, title:"Brotherhood",          setting:"Rome, 1499",             protagonist:"Ezio Auditore da Firenze",  era:"Italian Renaissance",  color:"#e63946", desc:"Ezio rebuilds the Brotherhood in Rome, facing the might of Rodrigo Borgia's corrupt power from the Vatican's shadow.",                                                                        img:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=80" },
  { id:4,  year:2011, title:"Revelations",          setting:"Constantinople, 1511",   protagonist:"Ezio Auditore da Firenze",  era:"Ottoman Empire",        color:"#f4a261", desc:"Ezio travels to Constantinople in search of Altaïr's lost library, unlocking the secrets of both their legacies.",                                                                           img:"https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&q=80" },
  { id:5,  year:2012, title:"Assassin's Creed III", setting:"Colonial America, 1754", protagonist:"Connor / Ratonhnhaké:ton", era:"American Revolution",   color:"#457b9d", desc:"Half-Mohawk, half-British Connor navigates the brutal conflict of the American Revolution, fighting for his people's freedom.",                                                                 img:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80" },
  { id:6,  year:2013, title:"Black Flag",           setting:"Caribbean, 1715",        protagonist:"Edward Kenway",             era:"Golden Age of Piracy", color:"#2a9d8f", desc:"Edward Kenway, a Welsh pirate-turned-assassin, sails the Caribbean seas during the lawless Golden Age of Piracy.",                                                                             img:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80" },
  { id:7,  year:2015, title:"Syndicate",            setting:"Victorian London, 1868", protagonist:"Jacob & Evie Frye",         era:"Industrial Revolution", color:"#8338ec", desc:"Twin assassins Jacob and Evie Frye reclaim London's criminal underworld from Templar control during the Industrial Revolution.",                                                               img:"https://images.unsplash.com/photo-1543832923-44667a44c804?w=900&q=80" },
  { id:8,  year:2017, title:"Origins",              setting:"Ancient Egypt, 49 BCE",  protagonist:"Bayek of Siwa",             era:"Ptolemaic Egypt",       color:"#e9c46a", desc:"Bayek, a Medjay warrior, seeks vengeance and inadvertently founds the very first Brotherhood of Assassins in ancient Egypt.",                                                                 img:"https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=900&q=80" },
  { id:9,  year:2018, title:"Odyssey",              setting:"Ancient Greece, 431 BCE",protagonist:"Kassandra / Alexios",       era:"Peloponnesian War",     color:"#06d6a0", desc:"A mercenary descendent of Leonidas uncovers a cult's stranglehold on Ancient Greece during the legendary Peloponnesian War.",                                                                  img:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=900&q=80" },
  { id:10, year:2020, title:"Valhalla",             setting:"England, 873 CE",        protagonist:"Eivor Wolf-Kissed",         era:"Viking Age",            color:"#4cc9f0", desc:"Viking raider Eivor leads their clan from Norway to settle in England, clashing with Saxons, Templars, and Norse gods.",                                                                       img:"https://images.unsplash.com/photo-1518469669455-bb49d69b15b0?w=900&q=80" },
  { id:11, year:2023, title:"Mirage",               setting:"Baghdad, 9th Century",   protagonist:"Basim Ibn Ishaq",           era:"Islamic Golden Age",    color:"#fb8500", desc:"Young street thief Basim Ibn Ishaq joins the Hidden Ones in Baghdad's bustling city during the Islamic Golden Age.",                                                                           img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
  { id:12, year:2024, title:"Shadows",              setting:"Feudal Japan, 1579",     protagonist:"Naoe & Yasuke",             era:"Sengoku Period",        color:"#ef233c", desc:"In war-torn feudal Japan, shinobi Naoe and the legendary African samurai Yasuke unite to fight oppression during the Sengoku period.",                                                         img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80" },
];

const CHARACTERS = [
  { id:1, name:"Altaïr Ibn-La'Ahad",       role:"Master Assassin",             origin:"Masyaf, Syria",         era:"1165 – 1257",   affiliation:"Assassin Brotherhood",           img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", quote:"Where other men blindly follow the truth, remember… nothing is true.",                                                            bio:"Born in Masyaf, Altaïr rose through the Brotherhood's ranks before being stripped of his rank. His redemption arc transformed him into the greatest Assassin Grand Master, rewriting the Creed itself and studying the Apple of Eden.", skills:["Eagle Vision","Stealth","Combat Mastery","Apple of Eden"], color:"#c8a96e" },
  { id:2, name:"Ezio Auditore da Firenze", role:"Mentor of the Brotherhood",   origin:"Florence, Italy",       era:"1459 – 1524",   affiliation:"Assassin Brotherhood",           img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", quote:"I have lived my life as best I could, not knowing its purpose, but drawn forward like a moth to a distant moon.",                bio:"A Florentine nobleman turned Assassin. Ezio witnessed the Templar murder of his family and dedicated his life to the Brotherhood across Italy, Rome, and Constantinople.",                                                                  skills:["Hidden Blade Mastery","Eagle Vision","Hookblade","Poison"],      color:"#d4af37" },
  { id:3, name:"Connor Kenway",            role:"Master Assassin",             origin:"Kanatahséton, NY",      era:"1756 – unknown",affiliation:"Colonial Brotherhood",           img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", quote:"The Assassins seek to guide humanity to peace. The Templars… impose it.",                                                         bio:"Son of Haytham Kenway and Mohawk woman Kaniehtí:io. A fierce protector of his people, Connor navigated the American Revolution while uncovering his father's Templar allegiances.",                                                        skills:["Tomahawk Combat","Rope Dart","Naval Command","Eagle Vision"],     color:"#457b9d" },
  { id:4, name:"Edward Kenway",            role:"Master Assassin & Pirate",    origin:"Swansea, Wales",        era:"1693 – 1735",   affiliation:"West Indies Brotherhood",        img:"https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80", quote:"I was a selfish man who cared for nothing but gold and glory.",                                                                   bio:"A brash Welsh privateer who stumbled into the Assassin-Templar conflict. Edward sailed the Caribbean seas building a pirate legend before ultimately embracing the Assassin cause.",                                                        skills:["Dual Pistols","Naval Warfare","Free Running","Eagle Vision"],     color:"#2a9d8f" },
  { id:5, name:"Bayek of Siwa",            role:"Founder of the Hidden Ones",  origin:"Siwa, Egypt",           era:"85 BCE – unknown",affiliation:"Hidden Ones (Proto-Brotherhood)",img:"https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80",quote:"I am Bayek. Protector of Egypt. And I will find you all.",                                                                       bio:"The last Medjay of Egypt, Bayek founded the Hidden Ones alongside his wife Aya after avenging their son's death. His principles laid the foundation of what became the Brotherhood.",                                                       skills:["Medjay Training","Senu Eagle Companion","Warrior Bow","Predator"],color:"#e9c46a" },
  { id:6, name:"Eivor Wolf-Kissed",        role:"Jarlskona / Master Assassin", origin:"Heillboer, Norway",     era:"847 CE – unknown",affiliation:"Hidden Ones",                  img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80", quote:"The wolf that survives winter will outlast those who do not fight.",                                                               bio:"A fierce Viking shieldmaiden led her clan from Norway to England. Eivor's life became intertwined with the fate of the Norse gods through Isu memories, making her one of history's most extraordinary Assassins.",                         skills:["Raven Familiar","Dual Axes","Berserker Rage","Hidden Blade"],     color:"#4cc9f0" },
];

// Fixed navbar height — used to offset page content so it never hides under the bar
const NAV_H = 72;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function EagleLogo({ size = 40, color = "#c8a96e" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M50 5 L60 25 L85 20 L70 40 L95 50 L70 60 L85 80 L60 75 L50 95 L40 75 L15 80 L30 60 L5 50 L30 40 L15 20 L40 25 Z"
        stroke={color} strokeWidth="2" fill="none" style={{ filter:`drop-shadow(0 0 8px ${color})` }} />
      <circle cx="50" cy="50" r="8" fill={color} />
      <path d="M50 20 L55 35 L50 42 L45 35 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

function ScanLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50" style={{
      background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)",
      mixBlendMode:"overlay",
    }}/>
  );
}

function CornerBrackets({ color="#c8a96e", size=16 }) {
  const s=`${size}px`, st={ borderColor:color, width:s, height:s, boxShadow:`0 0 8px ${color}40` };
  return (<>
    <span className="absolute top-0 left-0 border-t-2 border-l-2" style={st}/>
    <span className="absolute top-0 right-0 border-t-2 border-r-2" style={st}/>
    <span className="absolute bottom-0 left-0 border-b-2 border-l-2" style={st}/>
    <span className="absolute bottom-0 right-0 border-b-2 border-r-2" style={st}/>
  </>);
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id:"home",       label:"HOME"        },
    { id:"timeline",   label:"TIMELINE"    },
    { id:"characters", label:"BROTHERHOOD" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-500" style={{
      height: NAV_H,
      background: scrolled ? "rgba(5,5,5,0.96)" : "linear-gradient(to bottom,rgba(5,5,5,0.85),transparent)",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,169,110,0.15)" : "none",
    }}>
      <div className="ac-shell h-full px-6 flex items-center justify-between">

        <button onClick={() => setPage("home")} className="flex items-center gap-3">
          <EagleLogo size={34} color="#c8a96e"/>
          <div className="hidden sm:block text-left">
            <div className="text-xs tracking-[0.3em]" style={{ color:"#c8a96e", fontFamily:"'Cinzel',serif" }}>ASSASSIN'S CREED</div>
            <div className="text-white text-xs tracking-[0.45em] opacity-50">ARCHIVE</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)}
              className="relative text-xs tracking-[0.3em] transition-colors duration-300"
              style={{ color: page===l.id ? "#c8a96e" : "rgba(255,255,255,0.6)", fontFamily:"'Cinzel',serif" }}>
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px transition-all duration-300" style={{
                background:"linear-gradient(90deg,#c8a96e,transparent)",
                width: page===l.id ? "100%" : "0%",
              }}/>
            </button>
          ))}
        </div>

        <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(o=>!o)}>
          {[0,1,2].map(i=><span key={i} className="block h-px w-6" style={{ background:"#c8a96e" }}/>)}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-3" style={{ background:"rgba(5,5,5,0.98)" }}>
          {links.map(l=>(
            <button key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }}
              className="text-left text-xs tracking-[0.3em] py-2 border-b"
              style={{ color:page===l.id?"#c8a96e":"rgba(255,255,255,0.6)", fontFamily:"'Cinzel',serif", borderColor:"rgba(200,169,110,0.1)" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO SLIDER ──────────────────────────────────────────────────────────────

const FEATURED = [9,7,5,11,3,0].map(i => GAMES[i]);   // curated picks from GAMES array

function HeroSlider({ setPage }) {
  const [cur,  setCur]    = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);

  const go = useCallback((idx) => {
    setCur(idx);
    clearInterval(timer.current);
    timer.current = setInterval(() => setCur(c => (c+1) % FEATURED.length), 6000);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => setCur(c => (c+1) % FEATURED.length), 6000);
    const t = setTimeout(() => setLoaded(true), 150);
    return () => { clearInterval(timer.current); clearTimeout(t); };
  }, []);

  const game = FEATURED[cur];

  return (
    <section className="ac-hero relative w-full overflow-hidden">

      {/* Slide backgrounds */}
      {FEATURED.map((g,i) => (
        <div key={g.id} className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i===cur ? 1 : 0, zIndex: i===cur ? 1 : 0 }}>
          <img src={g.img} alt={g.title} className="w-full h-full object-cover"
            style={{ transform: i===cur ? "scale(1.06)" : "scale(1)", transition:"transform 7s ease-out" }}/>
          <div className="absolute inset-0" style={{
            background:"linear-gradient(135deg,rgba(0,0,0,0.9) 0%,rgba(5,3,0,0.62) 55%,rgba(0,0,0,0.82) 100%)",
          }}/>
          <div className="absolute inset-0" style={{
            background:"radial-gradient(ellipse at center,transparent 15%,rgba(0,0,0,0.6) 100%)",
          }}/>
        </div>
      ))}

      {/* CRT grain */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(200,169,110,0.025) 3px,rgba(200,169,110,0.025) 4px)",
      }}/>

      {/* ── Content — true centre of viewport (short-height viewports unwrap via CSS) */}
      <div className="ac-hero-scroll relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ opacity: loaded ? 1 : 0, transition:"opacity 1s ease" }}>

        {/* Animus tag */}
        <div className="ac-hero-anim-tag mb-5 flex items-center gap-3 px-4 py-2 text-xs tracking-[0.4em]"
          style={{ border:"1px solid rgba(200,169,110,0.3)", color:"#c8a96e", background:"rgba(200,169,110,0.06)", fontFamily:"'Courier New',monospace" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
          ANIMUS v4.7 — MEMORY SEQUENCE ACTIVE
        </div>

        {/* Brand */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.08em] leading-none"
          style={{ fontFamily:"'Cinzel Decorative',serif", color:"#f5f0e8" }}>
          ASSASSIN'S
        </h1>
        <h1 className="mt-1 text-4xl md:text-6xl lg:text-7xl tracking-[0.3em]"
          style={{ fontFamily:"'Cinzel',serif", background:"linear-gradient(135deg,#c8a96e 0%,#f5d47c 50%,#9a7a3e 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          CREED
        </h1>

        {/* Divider */}
        <div className="ac-hero-divider-y flex items-center justify-center gap-4 my-6">
          <div className="h-px w-20" style={{ background:"linear-gradient(90deg,transparent,#c8a96e)" }}/>
          <EagleLogo size={26} color="#c8a96e"/>
          <div className="h-px w-20" style={{ background:"linear-gradient(90deg,#c8a96e,transparent)" }}/>
        </div>

        {/* Slide info — re-animates on each change */}
        <div key={cur} style={{ animation:"slideUp 0.55s ease-out" }} className="ac-hero-slide-meta flex flex-col items-center">
          <div className="text-xs tracking-[0.5em] mb-2" style={{ color:game.color, fontFamily:"'Cinzel',serif" }}>
            {game.year} · {game.era.toUpperCase()}
          </div>
          <p className="text-xl md:text-2xl italic mb-1 max-w-xl min-[1536px]:max-w-2xl min-[1920px]:max-w-4xl px-4"
            style={{ color:"rgba(245,240,232,0.92)", fontFamily:"'Cormorant Garamond',serif", letterSpacing:"0.04em" }}>
            "{game.title}"
          </p>
          <p className="text-sm mb-2" style={{ color:"rgba(200,169,110,0.65)", fontFamily:"'Cinzel',serif", letterSpacing:"0.2em" }}>
            {game.protagonist}
          </p>
          <p className="ac-hero-desc text-sm max-w-lg min-[1536px]:max-w-2xl min-[1920px]:max-w-3xl mb-8 leading-relaxed px-4"
            style={{ color:"rgba(245,240,232,0.45)", fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem" }}>
            {game.desc}
          </p>
        </div>

        {/* CTAs */}
        <div className="ac-hero-cta flex flex-col sm:flex-row gap-4 items-center">
          <button onClick={() => setPage("timeline")}
            className="relative group px-10 py-4 text-xs tracking-[0.35em] transition-all duration-300 overflow-hidden"
            style={{ fontFamily:"'Cinzel',serif", background:`linear-gradient(135deg,${game.color},${game.color}aa)`, color:"#0a0800",
              clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)" }}>
            <span className="relative z-10">EXPLORE TIMELINE</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background:"linear-gradient(135deg,#f5d47c,#c8a96e)" }}/>
          </button>
          <button onClick={() => setPage("characters")}
            className="relative group px-10 py-4 text-xs tracking-[0.35em] transition-all duration-300"
            style={{ fontFamily:"'Cinzel',serif", color:"#c8a96e", border:"1px solid rgba(200,169,110,0.45)",
              clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)" }}>
            THE BROTHERHOOD
            <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300" style={{ background:"#c8a96e" }}/>
          </button>
        </div>
      </div>

      {/* Side arrows (desktop) */}
      {[{dir:-1,side:"left-4 md:left-8",ch:"‹"},{dir:1,side:"right-4 md:right-8",ch:"›"}].map(({dir,side,ch})=>(
        <button key={ch} onClick={() => go((cur+dir+FEATURED.length)%FEATURED.length)}
          className={`ac-hero-side-arr absolute ${side} top-1/2 -translate-y-1/2 z-20 w-12 h-12 border hidden md:flex items-center justify-center text-2xl transition-all duration-300 hover:bg-amber-900/20`}
          style={{ borderColor:"rgba(200,169,110,0.2)", color:"rgba(200,169,110,0.65)" }}>
          {ch}
        </button>
      ))}

      {/* Bottom controls */}
      <div className="ac-hero-dots absolute bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-5">
        <button onClick={() => go((cur-1+FEATURED.length)%FEATURED.length)}
          className="w-9 h-9 border flex md:hidden items-center justify-center transition-all hover:border-amber-400"
          style={{ borderColor:"rgba(200,169,110,0.3)", color:"rgba(200,169,110,0.7)" }}>‹</button>

        {FEATURED.map((g,i) => (
          <button key={i} onClick={() => go(i)} className="transition-all duration-400" style={{
            width: i===cur ? "28px" : "8px", height:"3px",
            background: i===cur ? g.color : "rgba(200,169,110,0.3)",
            boxShadow: i===cur ? `0 0 8px ${g.color}` : "none",
          }}/>
        ))}

        <button onClick={() => go((cur+1)%FEATURED.length)}
          className="w-9 h-9 border flex md:hidden items-center justify-center transition-all hover:border-amber-400"
          style={{ borderColor:"rgba(200,169,110,0.3)", color:"rgba(200,169,110,0.7)" }}>›</button>
      </div>

      {/* Counter (desktop) */}
      <div className="ac-hero-counter absolute bottom-14 right-8 z-20 text-right hidden md:block">
        <div className="text-4xl font-thin" style={{ color:"rgba(200,169,110,0.2)", fontFamily:"'Cinzel',serif" }}>0{cur+1}</div>
        <div className="text-xs" style={{ color:"rgba(200,169,110,0.3)", fontFamily:"'Cinzel',serif", letterSpacing:"0.3em" }}>/ 0{FEATURED.length}</div>
      </div>
    </section>
  );
}

// ─── GAMES THUMBNAIL SLIDER ───────────────────────────────────────────────────

function GamesThumbSlider({ setPage }) {
  const ref = useRef(null);
  const scroll = d => ref.current?.scrollBy({ left:d*230, behavior:"smooth" });

  return (
    <section className="py-20" style={{ background:"#080603" }}>
      <div className="ac-shell px-6 mb-8 flex items-end justify-between">
        <div>
          <div className="text-xs tracking-[0.5em] mb-2" style={{ color:"#c8a96e", fontFamily:"'Cinzel',serif" }}>ACROSS THE CENTURIES</div>
          <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily:"'Cinzel',serif", color:"#f5f0e8" }}>
            17 YEARS · 12 GAMES
          </h2>
        </div>
        <div className="hidden sm:flex gap-2">
          {["‹","›"].map((ch,i) => (
            <button key={i} onClick={() => scroll(i===0?-1:1)}
              className="w-10 h-10 border flex items-center justify-center text-xl transition-all hover:border-amber-400"
              style={{ borderColor:"rgba(200,169,110,0.25)", color:"rgba(200,169,110,0.7)" }}>
              {ch}
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto pb-4 px-6 scrollbar-hide"
        style={{ scrollSnapType:"x mandatory" }}>
        {GAMES.map(g => (
          <div key={g.id}
            className="relative flex-shrink-0 w-44 h-64 overflow-hidden cursor-pointer group"
            style={{ border:`1px solid ${g.color}25`, scrollSnapAlign:"start" }}
            onClick={() => setPage("timeline")}>
            <img src={g.img} alt={g.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div className="absolute inset-0 transition-opacity duration-300"
              style={{ background:`linear-gradient(to top,${g.color}dd 0%,rgba(0,0,0,0.4) 55%,transparent 100%)` }}/>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background:g.color }}/>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="text-xs tracking-[0.2em] mb-0.5" style={{ color:g.color, fontFamily:"'Cinzel',serif" }}>{g.year}</div>
              <div className="text-xs font-medium leading-tight" style={{ color:"#fff", fontFamily:"'Cinzel',serif" }}>{g.title}</div>
              <div className="text-xs mt-1 opacity-70" style={{ color:"#fff", fontFamily:"'Cormorant Garamond',serif" }}>{g.setting}</div>
            </div>
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-0.5"
              style={{ background:`${g.color}30`, border:`1px solid ${g.color}60`, color:g.color, fontFamily:"'Cinzel',serif", letterSpacing:"0.2em" }}>
              VIEW
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const pillars = [
    { icon:"⚔", title:"The Creed",      desc:"Nothing is true, everything is permitted. Three tenets guide the Brotherhood across millennia of hidden conflict." },
    { icon:"🦅", title:"Eagle Vision",  desc:"A sixth sense inherited from the First Civilization — the ability to perceive truth beyond the veil of deception." },
    { icon:"☽", title:"Hidden Blade",  desc:"The signature weapon of Assassins since ancient Egypt — a concealed blade that strikes unseen from shadow." },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* HERO SLIDER — full-viewport, navbar floats above it */}
      <HeroSlider setPage={setPage}/>

      {/* THREE PILLARS */}
      <section className="py-28 px-6 relative" style={{
        background:"linear-gradient(180deg,#050503 0%,#0d0b07 50%,#050503 100%)",
      }}>
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          backgroundImage:"radial-gradient(circle at 20% 50%,#c8a96e 0%,transparent 50%),radial-gradient(circle at 80% 50%,#c8a96e 0%,transparent 50%)",
        }}/>
        <div className="ac-shell-tight">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.5em] mb-4" style={{ color:"#c8a96e", fontFamily:"'Cinzel',serif" }}>THE THREE TENETS</div>
            <h2 className="text-3xl md:text-5xl font-light" style={{ fontFamily:"'Cinzel Decorative',serif", color:"#f5f0e8" }}>
              THE CREED
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10">
            {pillars.map((p,i) => (
              <div key={i} className="relative p-8 group transition-all duration-500 hover:-translate-y-1" style={{
                background:"linear-gradient(135deg,rgba(200,169,110,0.04) 0%,rgba(200,169,110,0.01) 100%)",
                border:"1px solid rgba(200,169,110,0.12)",
              }}>
                <CornerBrackets/>
                <div className="text-4xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ filter:"drop-shadow(0 0 12px rgba(200,169,110,0.4))" }}>{p.icon}</div>
                <h3 className="text-lg mb-3 tracking-[0.2em]" style={{ fontFamily:"'Cinzel',serif", color:"#c8a96e" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"rgba(245,240,232,0.55)", fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem" }}>{p.desc}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500 group-hover:w-full w-0"
                  style={{ background:"linear-gradient(90deg,transparent,#c8a96e,transparent)" }}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GAMES THUMBNAIL SLIDER */}
      <GamesThumbSlider setPage={setPage}/>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center border-t" style={{ borderColor:"rgba(200,169,110,0.1)", background:"#050503" }}>
        <div className="flex justify-center"><EagleLogo size={32} color="#c8a96e"/></div>
        <p className="mt-4 text-xs tracking-[0.5em]" style={{ color:"rgba(200,169,110,0.35)", fontFamily:"'Cinzel',serif" }}>
          LASCIATE OGNI SPERANZA — IN MEMORIAM FRATRUM
        </p>
      </footer>
    </div>
  );
}

// ─── GAME MODAL ───────────────────────────────────────────────────────────────

function GameModal({ game, onClose }) {
  useEffect(() => { document.body.style.overflow="hidden"; return ()=>{ document.body.style.overflow=""; }; },[]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.88)", backdropFilter:"blur(8px)" }}
      onClick={onClose}>
      <div className="relative max-w-2xl w-full overflow-hidden"
        style={{ background:"linear-gradient(135deg,#0d0b07,#0a0800)", border:`1px solid ${game.color}40`, boxShadow:`0 0 60px ${game.color}20`, animation:"fadeInScale 0.3s ease-out" }}
        onClick={e=>e.stopPropagation()}>
        <CornerBrackets color={game.color} size={20}/>
        <div className="relative h-52 overflow-hidden">
          <img src={game.img} alt={game.title} className="w-full h-full object-cover"/>
          <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,transparent 30%,#0d0b07 100%)" }}/>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 border flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            style={{ borderColor:"rgba(255,255,255,0.3)", fontSize:18 }}>×</button>
          <div className="absolute bottom-4 left-6">
            <div className="text-xs tracking-[0.4em] mb-1" style={{ color:game.color, fontFamily:"'Cinzel',serif" }}>{game.year} · {game.era}</div>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily:"'Cinzel Decorative',serif", color:"#f5f0e8" }}>{game.title}</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[["SETTING",game.setting],["PROTAGONIST",game.protagonist]].map(([label,val])=>(
              <div key={label} className="p-3" style={{ background:`${game.color}08`, borderLeft:`2px solid ${game.color}60` }}>
                <div className="text-xs tracking-[0.3em] mb-1" style={{ color:`${game.color}99`, fontFamily:"'Cinzel',serif" }}>{label}</div>
                <div className="text-sm" style={{ color:"#f5f0e8", fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem" }}>{val}</div>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed mb-6" style={{ color:"rgba(245,240,232,0.7)", fontFamily:"'Cormorant Garamond',serif" }}>{game.desc}</p>
          <button onClick={onClose} className="w-full py-3 text-xs tracking-[0.4em] hover:opacity-80 transition-opacity"
            style={{ background:`linear-gradient(135deg,${game.color},${game.color}88)`, color:"#0a0800", fontFamily:"'Cinzel',serif" }}>
            CLOSE MEMORY
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TIMELINE PAGE ────────────────────────────────────────────────────────────

function TimelinePage() {
  const [selected,setSelected] = useState(null);
  const [filter,setFilter]     = useState("all");
  const [hovered,setHovered]   = useState(null);
  const eras = ["all",...new Set(GAMES.map(g=>g.era))];
  const list = filter==="all" ? GAMES : GAMES.filter(g=>g.era===filter);

  return (
    /* paddingTop = navbar height so content starts below the bar */
    <div className="min-h-screen text-white pb-20" style={{ background:"#050503", paddingTop:NAV_H }}>
      {selected && <GameModal game={selected} onClose={()=>setSelected(null)}/>}

      <div className="text-center py-16 px-6">
        <div className="text-xs tracking-[0.5em] mb-4" style={{ color:"#c8a96e", fontFamily:"'Cinzel',serif" }}>MEMORY ARCHIVE — ANIMUS DATABASE</div>
        <h1 className="text-4xl md:text-6xl font-light mb-6" style={{ fontFamily:"'Cinzel Decorative',serif", color:"#f5f0e8" }}>GAMES TIMELINE</h1>
        <div className="w-24 h-px mx-auto" style={{ background:"linear-gradient(90deg,transparent,#c8a96e,transparent)" }}/>
      </div>

      <div className="px-6 mb-12">
        <div className="flex gap-2 justify-center flex-wrap">
          {eras.map(era=>(
            <button key={era} onClick={()=>setFilter(era)}
              className="px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300"
              style={{ fontFamily:"'Cinzel',serif", border:`1px solid ${filter===era?"#c8a96e":"rgba(200,169,110,0.2)"}`,
                background:filter===era?"rgba(200,169,110,0.15)":"transparent",
                color:filter===era?"#c8a96e":"rgba(200,169,110,0.5)" }}>
              {era==="all"?"ALL ERAS":era.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="ac-shell-reading px-6">
        <div className="relative">
          {/* spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background:"linear-gradient(to bottom,transparent,#c8a96e40 10%,#c8a96e40 90%,transparent)" }}/>

          <div className="space-y-8">
            {list.map((game,i)=>{
              const left = i%2===0;
              return (
                <div key={game.id} className={`flex items-center gap-8 flex-col ${left?"md:flex-row":"md:flex-row-reverse"}`}>
                  <div className="flex-1 relative group cursor-pointer"
                    onMouseEnter={()=>setHovered(game.id)} onMouseLeave={()=>setHovered(null)}
                    onClick={()=>setSelected(game)}>
                    <div className="relative overflow-hidden transition-all duration-500" style={{
                      border:`1px solid ${hovered===game.id?game.color+"60":"rgba(200,169,110,0.1)"}`,
                      background:`linear-gradient(135deg,${game.color}06 0%,rgba(5,5,3,1) 100%)`,
                      transform:hovered===game.id?"translateY(-4px)":"none",
                      boxShadow:hovered===game.id?`0 12px 40px ${game.color}15`:"none",
                    }}>
                      <div className="flex">
                        <div className="relative w-32 flex-shrink-0 h-36 overflow-hidden">
                          <img src={game.img} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                          <div className="absolute inset-0" style={{ background:left?"linear-gradient(to right,transparent 60%,#050503 100%)":"linear-gradient(to left,transparent 60%,#050503 100%)" }}/>
                        </div>
                        <div className="flex-1 p-5">
                          <div className="text-xs tracking-[0.3em] mb-1" style={{ color:game.color, fontFamily:"'Cinzel',serif" }}>{game.year} · {game.era}</div>
                          <h3 className="text-lg mb-1 leading-tight" style={{ fontFamily:"'Cinzel',serif", color:"#f5f0e8" }}>{game.title}</h3>
                          <div className="text-xs mb-3 tracking-wider" style={{ color:"rgba(200,169,110,0.6)", fontFamily:"'Cinzel',serif" }}>{game.protagonist}</div>
                          <p className="text-sm leading-relaxed line-clamp-2"
                            style={{ color:"rgba(245,240,232,0.55)", fontFamily:"'Cormorant Garamond',serif", fontSize:"0.95rem" }}>{game.desc}</p>
                        </div>
                      </div>
                      <div className="h-px transition-all duration-500"
                        style={{ background:`linear-gradient(90deg,transparent,${game.color}${hovered===game.id?"ff":"30"},transparent)` }}/>
                      <div className="absolute top-2 right-2 text-xs px-2 py-1 tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background:`${game.color}20`, border:`1px solid ${game.color}40`, color:game.color, fontFamily:"'Cinzel',serif" }}>
                        VIEW
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full border-2 items-center justify-center transition-all duration-300"
                    style={{ borderColor:hovered===game.id?game.color:"rgba(200,169,110,0.4)", background:hovered===game.id?game.color:"transparent", boxShadow:hovered===game.id?`0 0 16px ${game.color}`:"none" }}/>

                  <div className="flex-1 hidden md:block"/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CHARACTER MODAL ──────────────────────────────────────────────────────────

function CharacterModal({ char, onClose }) {
  useEffect(() => { document.body.style.overflow="hidden"; return ()=>{ document.body.style.overflow=""; }; },[]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(12px)" }}
      onClick={onClose}>
      <div className="relative max-w-3xl w-full overflow-hidden"
        style={{ background:"linear-gradient(135deg,#0d0b07,#080600)", border:`1px solid ${char.color}40`, boxShadow:`0 0 80px ${char.color}15`, animation:"fadeInScale 0.35s ease-out" }}
        onClick={e=>e.stopPropagation()}>
        <CornerBrackets color={char.color} size={22}/>
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-64 md:h-auto flex-shrink-0 overflow-hidden">
            <img src={char.img} alt={char.name} className="w-full h-full object-cover object-top"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,transparent 40%,#0d0b07 100%)" }}/>
            <div className="absolute inset-0 opacity-30" style={{ background:`radial-gradient(ellipse at top,${char.color}30,transparent 70%)` }}/>
          </div>
          <div className="flex-1 p-8">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 border flex items-center justify-center text-white hover:bg-white hover:text-black transition-all text-lg"
              style={{ borderColor:"rgba(255,255,255,0.2)" }}>×</button>
            <div className="text-xs tracking-[0.4em] mb-2" style={{ color:char.color, fontFamily:"'Cinzel',serif" }}>{char.affiliation}</div>
            <h2 className="text-2xl md:text-3xl mb-1 leading-tight" style={{ fontFamily:"'Cinzel',serif", color:"#f5f0e8" }}>{char.name}</h2>
            <div className="text-sm mb-1 tracking-wider" style={{ color:"rgba(200,169,110,0.6)", fontFamily:"'Cinzel',serif" }}>{char.role}</div>
            <div className="text-xs mb-6 tracking-wider" style={{ color:"rgba(200,169,110,0.4)", fontFamily:"'Cinzel',serif" }}>{char.origin} · {char.era}</div>
            <blockquote className="text-base italic mb-6 pl-4 border-l-2"
              style={{ fontFamily:"'Cormorant Garamond',serif", color:"rgba(245,240,232,0.75)", borderColor:char.color, fontSize:"1.05rem" }}>
              "{char.quote}"
            </blockquote>
            <p className="text-sm leading-relaxed mb-6" style={{ color:"rgba(245,240,232,0.55)", fontFamily:"'Cormorant Garamond',serif", fontSize:"0.98rem" }}>{char.bio}</p>
            <div className="text-xs tracking-[0.4em] mb-3" style={{ color:char.color, fontFamily:"'Cinzel',serif" }}>ABILITIES</div>
            <div className="flex flex-wrap gap-2">
              {char.skills.map(s=>(
                <span key={s} className="px-3 py-1 text-xs tracking-[0.15em]"
                  style={{ border:`1px solid ${char.color}40`, background:`${char.color}10`, color:char.color, fontFamily:"'Cinzel',serif" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CHARACTERS PAGE ──────────────────────────────────────────────────────────

function CharactersPage() {
  const [selected,setSelected] = useState(null);
  const [hovered,setHovered]   = useState(null);

  return (
    /* paddingTop = navbar height */
    <div className="min-h-screen text-white pb-20" style={{ background:"#050503", paddingTop:NAV_H }}>
      {selected && <CharacterModal char={selected} onClose={()=>setSelected(null)}/>}

      <div className="text-center py-16 px-6">
        <div className="text-xs tracking-[0.5em] mb-4" style={{ color:"#c8a96e", fontFamily:"'Cinzel',serif" }}>BROTHERHOOD DOSSIER</div>
        <h1 className="text-4xl md:text-6xl font-light mb-4" style={{ fontFamily:"'Cinzel Decorative',serif", color:"#f5f0e8" }}>THE BROTHERHOOD</h1>
        <p className="max-w-lg mx-auto text-sm leading-relaxed"
          style={{ color:"rgba(245,240,232,0.4)", fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem" }}>
          Select an Assassin to access their full dossier from the Animus database.
        </p>
        <div className="w-24 h-px mx-auto mt-6" style={{ background:"linear-gradient(90deg,transparent,#c8a96e,transparent)" }}/>
      </div>

      <div className="ac-shell-tight px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[2100px]:grid-cols-4">
          {CHARACTERS.map(char=>(
            <div key={char.id} className="relative overflow-hidden cursor-pointer group transition-all duration-500"
              style={{ border:`1px solid ${hovered===char.id?char.color+"50":"rgba(200,169,110,0.08)"}`,
                background:`linear-gradient(135deg,${char.color}05 0%,#080600 100%)`,
                transform:hovered===char.id?"translateY(-6px)":"none",
                boxShadow:hovered===char.id?`0 20px 60px ${char.color}15`:"none" }}
              onMouseEnter={()=>setHovered(char.id)} onMouseLeave={()=>setHovered(null)}
              onClick={()=>setSelected(char)}>
              <CornerBrackets color={char.color} size={14}/>
              <div className="relative h-64 overflow-hidden">
                <img src={char.img} alt={char.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{ filter:"grayscale(30%)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,transparent 40%,#080600 100%)" }}/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background:char.color }}/>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 text-xs"
                  style={{ background:"rgba(0,0,0,0.7)", border:`1px solid ${char.color}30`, color:char.color, fontFamily:"'Cinzel',serif", letterSpacing:"0.2em" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background:char.color }}/>
                  ACTIVE
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs tracking-[0.3em] mb-1" style={{ color:char.color, fontFamily:"'Cinzel',serif" }}>{char.era}</div>
                <h3 className="text-lg mb-1 leading-tight" style={{ fontFamily:"'Cinzel',serif", color:"#f5f0e8" }}>{char.name}</h3>
                <div className="text-xs tracking-wider mb-4" style={{ color:"rgba(200,169,110,0.5)", fontFamily:"'Cinzel',serif" }}>{char.role} · {char.origin}</div>
                <div className="flex flex-wrap gap-1.5">
                  {char.skills.slice(0,2).map(s=>(
                    <span key={s} className="px-2 py-0.5"
                      style={{ border:`1px solid ${char.color}30`, color:"rgba(200,169,110,0.5)", fontFamily:"'Cinzel',serif", fontSize:"0.65rem", letterSpacing:"0.1em" }}>
                      {s}
                    </span>
                  ))}
                  {char.skills.length>2 && <span style={{ color:"rgba(200,169,110,0.35)", fontFamily:"'Cinzel',serif", fontSize:"0.65rem" }}>+{char.skills.length-2} more</span>}
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor:`${char.color}20` }}>
                  <span className="text-xs tracking-[0.3em]" style={{ color:char.color, fontFamily:"'Cinzel',serif" }}>VIEW DOSSIER</span>
                  <span style={{ color:char.color }}>→</span>
                </div>
              </div>
              <div className="h-0.5 transition-all duration-500"
                style={{ background:`linear-gradient(90deg,transparent,${char.color}${hovered===char.id?"ff":"20"},transparent)` }}/>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 py-16 px-6 text-center border-y" style={{ borderColor:"rgba(200,169,110,0.08)", background:"linear-gradient(to bottom,transparent,rgba(200,169,110,0.03),transparent)" }}>
        <div className="flex justify-center"><EagleLogo size={40} color="#c8a96e"/></div>
        <blockquote className="mt-6 text-xl md:text-2xl italic max-w-2xl mx-auto"
          style={{ fontFamily:"'Cormorant Garamond',serif", color:"rgba(245,240,232,0.6)", lineHeight:1.7 }}>
          "We work in the dark to serve the light. We are Assassins."
        </blockquote>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#050503; overflow-x:hidden; }
        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        @keyframes fadeInScale {
          from { opacity:0; transform:scale(0.94) translateY(10px); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <ScanLines/>
      <NavBar page={page} setPage={setPage}/>

      <div key={page} style={{ animation:"fadeInScale 0.45s ease-out" }}>
        {page==="home"       && <HomePage       setPage={setPage}/>}
        {page==="timeline"   && <TimelinePage/>}
        {page==="characters" && <CharactersPage/>}
      </div>
    </>
  );
}
