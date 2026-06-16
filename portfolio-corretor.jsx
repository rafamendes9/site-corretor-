'use client';
import { useState, useEffect } from "react";

// ── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  ink:     '#1B2B4B',
  inkDark: '#111C2D',
  gold:    '#B8953A',
  cream:   '#FAFAF8',
  stone:   '#EDE9E4',
  white:   '#FFFFFF',
  text:    '#1A1A1A',
  mid:     '#5A5A5A',
  serif:   '"Playfair Display", Georgia, serif',
  sans:    '"Inter", system-ui, -apple-system, sans-serif',
};

// ── Conteúdo (substitua pelos seus dados reais) ────────────────────────────
const DATA = {
  stats: [
    { raw: "47M",  display: "R$47M+",   label: "em transações realizadas" },
    { raw: "312",  display: "312",       label: "famílias atendidas"       },
    { raw: "97%",  display: "97%",       label: "de satisfação"            },
    { raw: "18d",  display: "18 dias",   label: "tempo médio de venda"     },
  ],
  services: [
    { n: "01", title: "Venda de Imóveis",         desc: "Estratégia de precificação, marketing profissional e negociação dedicada ao seu resultado." },
    { n: "02", title: "Locação",                   desc: "Captação qualificada de inquilinos e gestão contratual segura para proprietários."          },
    { n: "03", title: "Avaliação de Mercado",      desc: "Laudos precisos com análise comparativa atualizada para embasar suas decisões."             },
    { n: "04", title: "Consultoria Financiamento", desc: "Navegação completa pelo crédito imobiliário com os melhores parceiros bancários."           },
  ],
  portfolio: [
    { status: "VENDIDO", type: "Cobertura Duplex",      local: "Boa Viagem", value: "R$ 1.450.000", days: 24 },
    { status: "VENDIDO", type: "Apartamento 4 Quartos", local: "Graças",     value: "R$ 890.000",   days: 18 },
    { status: "LOCADO",  type: "Sala Comercial",        local: "Boa Viagem", value: "R$ 4.800/mês", days:  6 },
    { status: "VENDIDO", type: "Apartamento 3 Quartos", local: "Aflitos",    value: "R$ 420.000",   days: 12 },
  ],
  testimonials: [
    { init: "AC", name: "Ana & Carlos Costa",  role: "Compradores em Boa Viagem",  quote: "Encontramos o apartamento dos nossos sonhos em menos de duas semanas. O Rafaell nos guiou com paciência e total transparência em cada etapa."                           },
    { init: "FO", name: "Fernanda Oliveira",   role: "Vendedora no Recife Antigo", quote: "Vendi minha cobertura por um valor acima do que eu esperava. A estratégia de divulgação e a condução das negociações foram realmente impecáveis."                       },
    { init: "MS", name: "Marcelo Souza",       role: "Comprador em Casa Amarela",  quote: "Um profissional honesto e atencioso do início ao fim. Me ajudou no processo de financiamento com muita clareza. Recomendo sem hesitar."                                 },
  ],
};

// ── Sub-componentes ────────────────────────────────────────────────────────
function Label({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
      <span style={{ display:"inline-block", width:24, height:1, background:C.gold }} />
      <span style={{ fontFamily:C.sans, fontWeight:600, fontSize:10,
        letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold }}>
        {text}
      </span>
    </div>
  );
}

function H2({ children, light }) {
  return (
    <h2 style={{ fontFamily:C.serif, fontWeight:600, fontSize:34,
      lineHeight:1.2, margin:0, letterSpacing:"-0.5px",
      color: light ? C.white : C.ink }}>
      {children}
    </h2>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function Page() {
  const [scrolled,   setScrolled]   = useState(false);
  const [filter,     setFilter]     = useState("TODOS");
  const [activeTest, setActiveTest] = useState(0);
  const [form,       setForm]       = useState({ name:"", phone:"", message:"" });
  const [sent,       setSent]       = useState(false);

  useEffect(() => {
    // Google Fonts
    const link = document.createElement("link");
    link.rel   = "stylesheet";
    link.href  = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    document.body.style.cssText = "margin:0;padding:0;overflow-x:hidden;background:#FAFAF8;";

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      try { document.head.removeChild(link); } catch(e) {}
    };
  }, []);

  const items = filter === "TODOS"
    ? DATA.portfolio
    : DATA.portfolio.filter(p => p.status === filter);

  const t = DATA.testimonials[activeTest];

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/yourFormId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else alert("Erro ao enviar mensagem.");
    } catch (err) {
      alert("Erro ao enviar mensagem.");
    }
  };

  const fieldStyle = {
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
    color: C.white, padding: "13px 16px", fontFamily: C.sans, fontSize: 14,
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  return (
    <div style={{ background:C.cream }}>

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:999, height:60,
        display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px",
        background: scrolled ? C.ink : "transparent", transition:"background 0.4s ease",
      }}>
        <span style={{ fontFamily:C.serif, color:C.white, fontSize:18, fontWeight:600 }}>
          Rafaell <em style={{ color:C.gold, fontStyle:"italic" }}>Mendes</em>
        </span>
        <div style={{ display:"flex", gap:28 }}>
          {[["Sobre","#sobre"],["Serviços","#servicos"],["Portfólio","#portfolio"],["Contato","#contato"]].map(([n,h]) => (
            <a key={n} href={h} style={{
              fontFamily:C.sans, fontSize:11, fontWeight:500,
              color:"rgba(255,255,255,0.8)", textDecoration:"none",
              letterSpacing:"0.1em", textTransform:"uppercase",
            }}>{n}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        background:C.ink, minHeight:"100vh", padding:"80px 48px",
        display:"flex", alignItems:"center", position:"relative", overflow:"hidden",
      }}>
        {/* vertical gold line */}
        <div style={{ position:"absolute", left:0, top:"15%", height:"70%", width:3,
          background:`linear-gradient(to bottom, transparent, ${C.gold}, transparent)` }} />
        {/* ghost initials */}
        <div style={{
          position:"absolute", right:-30, bottom:-60, fontFamily:C.serif,
          fontSize:280, fontWeight:700, color:"rgba(255,255,255,0.025)", lineHeight:1,
          pointerEvents:"none", userSelect:"none", letterSpacing:-8,
        }}>RM</div>

        <div style={{ position:"relative", zIndex:1, maxWidth:600 }}>
          {/* CRECI pill */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8, marginBottom:36,
            border:"1px solid rgba(184,149,58,0.4)", padding:"5px 14px",
            fontFamily:C.sans, fontSize:10, color:C.gold, fontWeight:600,
            letterSpacing:"0.15em", textTransform:"uppercase",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:C.gold, display:"block" }} />
            CRECI-PE 20711 · Corretor de Imóveis
          </div>

          {/* Name */}
          <div style={{ marginBottom:32 }}>
            <div style={{ fontFamily:C.serif, color:C.white, fontWeight:700, fontSize:72, lineHeight:1.0, letterSpacing:-3, marginBottom:4 }}>
              Rafaell
            </div>
            <div style={{ fontFamily:C.serif, color:C.gold, fontWeight:400, fontSize:72, lineHeight:1.0, letterSpacing:-3, fontStyle:"italic" }}>
              Mendes
            </div>
          </div>

          <p style={{ fontFamily:C.serif, color:"rgba(255,255,255,0.68)", fontSize:19,
            fontStyle:"italic", lineHeight:1.65, margin:"0 0 44px 0" }}>
            Cada imóvel tem uma história.<br />Deixa eu te contar a do seu.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="#portfolio" style={{
              background:C.gold, color:C.ink, fontFamily:C.sans, fontWeight:700,
              fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase",
              padding:"14px 28px", textDecoration:"none",
            }}>Ver Portfólio</a>
            <a href="https://wa.me/5581998148930" target="_blank" rel="noopener noreferrer" style={{
              border:"1px solid rgba(255,255,255,0.28)", color:C.white,
              fontFamily:C.sans, fontWeight:500, fontSize:12,
              letterSpacing:"0.08em", textTransform:"uppercase",
              padding:"13px 28px", textDecoration:"none",
            }}>Falar no WhatsApp</a>
          </div>

          {/* Mini stats bar */}
          <div style={{ display:"flex", gap:40, marginTop:72,
            borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:32, flexWrap:"wrap" }}>
            {DATA.stats.slice(0,3).map((s,i) => (
              <div key={i}>
                <div style={{ fontFamily:C.serif, color:C.gold, fontSize:26, fontWeight:700, lineHeight:1 }}>{s.display}</div>
                <div style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.4)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────────── */}
      <section id="sobre" style={{ background:C.stone, padding:"90px 48px" }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <Label text="Sobre" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
            <div>
              <H2>Mais do que vender imóveis —{" "}
                <em style={{ color:C.gold }}>construir confiança</em>
              </H2>
              <p style={{ fontFamily:C.sans, color:C.mid, fontSize:15, lineHeight:1.8, margin:"24px 0 32px" }}>
                Doze anos no mercado imobiliário de Recife me ensinaram que comprar ou vender
                um imóvel vai muito além de uma transação. Por isso, meu trabalho começa na
                escuta ativa e termina apenas quando você está satisfeito.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["Alto Padrão","Boa Viagem","Graças","Aflitos","Espinheiro"].map(s => (
                  <span key={s} style={{ fontFamily:C.sans, fontSize:11, fontWeight:500,
                    color:C.ink, border:`1px solid rgba(27,43,75,0.22)`, padding:"5px 12px" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ position:"relative" }}>
              <div style={{
                aspectRatio:"3/4",
                background:`linear-gradient(135deg, ${C.ink} 0%, #2A3F6A 100%)`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:48, opacity:0.12 }}>👤</div>
                  <div style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.18)", fontSize:12, marginTop:8 }}>
                    Adicione sua foto
                  </div>
                </div>
              </div>
              {/* gold corner accent */}
              <div style={{ position:"absolute", bottom:-14, right:-14,
                width:70, height:70, border:`2px solid ${C.gold}` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTATÍSTICAS — elemento-assinatura ───────────────────── */}
      <section style={{ background:C.ink, padding:"90px 48px", overflow:"hidden", position:"relative" }}>
        <div style={{ maxWidth:880, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Label text="Resultados em números" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {DATA.stats.map((s,i) => (
              <div key={i} style={{
                padding:"32px 24px 32px 0", position:"relative",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                {/* Ghost number — elemento-assinatura do design */}
                <div style={{
                  position:"absolute", top:-10, left:-4, fontFamily:C.serif,
                  fontSize:96, fontWeight:700, color:"rgba(255,255,255,0.028)",
                  lineHeight:1, whiteSpace:"nowrap", pointerEvents:"none", userSelect:"none",
                }}>{s.raw}</div>

                <div style={{ fontFamily:C.serif, color:C.gold, fontSize:36, fontWeight:700, lineHeight:1, marginBottom:10 }}>
                  {s.display}
                </div>
                <div style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.45)", fontSize:12 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ─────────────────────────────────────────────── */}
      <section id="servicos" style={{ background:C.white, padding:"90px 48px" }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <Label text="O que eu ofereço" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:48, marginBottom:48, alignItems:"end" }}>
            <H2>Serviços completos</H2>
            <p style={{ fontFamily:C.sans, color:C.mid, fontSize:15, lineHeight:1.7, margin:0 }}>
              Do primeiro contato até a assinatura do contrato, ofereço suporte completo
              em cada fase da sua negociação imobiliária.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
            {DATA.services.map((s,i) => (
              <div key={i} style={{ padding:"40px 36px", background: i%2===0 ? C.stone : C.ink }}>
                <div style={{ fontFamily:C.serif, color:C.gold, fontSize:28, fontWeight:700, opacity:0.4, marginBottom:16 }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily:C.serif, color: i%2===0 ? C.ink : C.white,
                  fontSize:20, fontWeight:600, lineHeight:1.3, margin:"0 0 12px" }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily:C.sans, color: i%2===0 ? C.mid : "rgba(255,255,255,0.6)",
                  fontSize:14, lineHeight:1.7, margin:0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFÓLIO ────────────────────────────────────────────── */}
      <section id="portfolio" style={{ background:C.stone, padding:"90px 48px" }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48 }}>
            <div>
              <Label text="Portfólio" />
              <H2>Resultados reais,<br />clientes reais</H2>
            </div>
            <div style={{ display:"flex", gap:2 }}>
              {["TODOS","VENDIDO","LOCADO"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  fontFamily:C.sans, fontSize:10, fontWeight:600, letterSpacing:"0.1em",
                  padding:"8px 16px", cursor:"pointer", border:"none",
                  background: filter===f ? C.ink : "rgba(27,43,75,0.08)",
                  color: filter===f ? C.white : C.ink, transition:"all 0.2s ease",
                }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
            {items.map((p,i) => (
              <div key={i} style={{ background:C.white, padding:"36px" }}>
                <div style={{
                  display:"inline-block", fontFamily:C.sans, fontSize:9, fontWeight:700,
                  letterSpacing:"0.15em", textTransform:"uppercase", padding:"4px 10px", marginBottom:20,
                  color:    p.status==="VENDIDO" ? "#1A5C38" : "#7A4010",
                  background:p.status==="VENDIDO" ? "#E8F5EE"  : "#FFF0E5",
                }}>{p.status}</div>
                <div style={{ fontFamily:C.sans, color:C.mid, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{p.local}</div>
                <h3 style={{ fontFamily:C.serif, color:C.ink, fontSize:20, fontWeight:600, margin:"0 0 28px", lineHeight:1.3 }}>{p.type}</h3>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", borderTop:`1px solid ${C.stone}`, paddingTop:20 }}>
                  <div>
                    <div style={{ fontFamily:C.sans, color:C.mid, fontSize:9, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Valor</div>
                    <div style={{ fontFamily:C.serif, color:C.gold, fontSize:20, fontWeight:700 }}>{p.value}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:C.sans, color:C.mid, fontSize:9, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>No mercado</div>
                    <div style={{ fontFamily:C.serif, color:C.ink, fontSize:20, fontWeight:600 }}>{p.days} dias</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────────────────── */}
      <section style={{ background:C.white, padding:"90px 48px" }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <Label text="O que dizem os clientes" />
          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:60 }}>
            {/* selector */}
            <div>
              {DATA.testimonials.map((item,i) => (
                <div key={i} onClick={() => setActiveTest(i)} style={{
                  cursor:"pointer", padding:"16px 0 16px 16px", marginBottom:4,
                  borderLeft:`2px solid ${activeTest===i ? C.gold : "#E5E0D8"}`,
                  transition:"border-color 0.2s ease",
                }}>
                  <div style={{ fontFamily:C.sans, fontWeight:600, fontSize:13, color: activeTest===i ? C.ink : C.mid }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily:C.sans, fontSize:11, color:C.mid, marginTop:2 }}>
                    {item.role}
                  </div>
                </div>
              ))}
            </div>
            {/* quote */}
            <div>
              <div style={{ fontFamily:C.serif, color:C.gold, fontSize:96, lineHeight:0.6, marginBottom:24, opacity:0.22 }}>"</div>
              <p style={{ fontFamily:C.serif, color:C.ink, fontSize:22, lineHeight:1.65, fontStyle:"italic", margin:"0 0 32px" }}>
                {t.quote}
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:C.ink, display:"flex", alignItems:"center",
                  justifyContent:"center", fontFamily:C.sans, color:C.white, fontWeight:600, fontSize:13, flexShrink:0 }}>
                  {t.init}
                </div>
                <div>
                  <div style={{ fontFamily:C.sans, fontWeight:600, color:C.ink, fontSize:14 }}>{t.name}</div>
                  <div style={{ fontFamily:C.sans, color:C.mid, fontSize:12 }}>{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTATO ──────────────────────────────────────────────── */}
      <section id="contato" style={{ background:C.ink, padding:"90px 48px" }}>
        <div style={{ maxWidth:880, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64 }}>
          <div>
            <Label text="Vamos conversar" />
            <H2 light>Pronto para o próximo passo?</H2>
            <p style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.6)", fontSize:15, lineHeight:1.7, margin:"24px 0 40px" }}>
              Me chame pelo WhatsApp ou preencha o formulário. Respondo em até 2 horas em dias úteis.
            </p>
            {[
              ["WhatsApp",  "(81) 9 98148930"               ],
              ["Email",     "rafaellmendes.corretor@gmail.com"    ],
              ["Instagram", "@rafaell_corretor/"          ],
              ["CRECI",     "CRECI-PE 20711"               ],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:20, marginBottom:14 }}>
                <span style={{ fontFamily:C.sans, color:C.gold, fontSize:10, fontWeight:600,
                  letterSpacing:"0.12em", textTransform:"uppercase", minWidth:72, paddingTop:2 }}>{k}</span>
                <span style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.75)", fontSize:14 }}>{v}</span>
              </div>
            ))}
          </div>

          <div>
            {sent ? (
              <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", textAlign:"center", background:"rgba(255,255,255,0.04)", padding:40 }}>
                <div style={{ fontFamily:C.serif, color:C.gold, fontSize:48, marginBottom:16 }}>✓</div>
                <div style={{ fontFamily:C.serif, color:C.white, fontSize:22, marginBottom:8 }}>Mensagem enviada!</div>
                <div style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.5)", fontSize:13 }}>Entrarei em contato em breve.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <input type="text" placeholder="Nome completo" value={form.name}
                  onChange={e => setForm({...form, name:e.target.value})} style={fieldStyle} />
                <input type="tel" placeholder="WhatsApp" value={form.phone}
                  onChange={e => setForm({...form, phone:e.target.value})} style={fieldStyle} />
                <textarea placeholder="O que você está procurando?" rows={5} value={form.message}
                  onChange={e => setForm({...form, message:e.target.value})}
                  style={{ ...fieldStyle, resize:"vertical" }} />
                <button onClick={handleSubmit} style={{
                  background:C.gold, color:C.ink, fontFamily:C.sans, fontWeight:700,
                  fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase",
                  padding:15, border:"none", cursor:"pointer", marginTop:4,
                }}>Enviar Mensagem</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ background:C.inkDark, padding:"20px 48px",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.25)", fontSize:11 }}>
          © 2025 Rafaell Mendes · CRECI-PE 20711
        </span>
        <span style={{ fontFamily:C.sans, color:"rgba(255,255,255,0.25)", fontSize:11 }}>
          Recife, Pernambuco
        </span>
      </footer>

      {/* ── WhatsApp flutuante ────────────────────────────────────── */}
      <a href="https://wa.me/5581998148930" target="_blank" rel="noopener noreferrer" style={{
        position:"fixed", bottom:28, right:28, zIndex:999,
        width:52, height:52, borderRadius:"50%", background:"#25D366",
        display:"flex", alignItems:"center", justifyContent:"center",
        textDecoration:"none", boxShadow:"0 4px 16px rgba(37,211,102,0.35)",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
