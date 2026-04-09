import { useState, useEffect } from 'react';
import { Send, Shield, Brain, FileSearch, Workflow, Users, Zap, Lock, Eye, Server, ChevronDown, ChevronUp, ArrowRight, Bot, User, Terminal, Radio, ShieldCheck, Fingerprint, ScanLine } from 'lucide-react';

// ─── NAVBAR ─────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-cyber-yellow/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyber-yellow" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-white uppercase">NEXUS AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Use Cases', 'Security', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xs font-mono tracking-widest text-neutral-500 hover:text-cyber-yellow transition-colors uppercase">{item}</a>
          ))}
        </div>
        <button className="px-5 py-2 bg-cyber-yellow text-black text-xs font-bold tracking-widest uppercase hover:bg-cyber-yellow/90 transition-colors">
          LAUNCH APP
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyber-yellow/5 blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 bg-cyber-yellow animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyber-yellow/70 uppercase">SYSTEM ONLINE — v4.2.1</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-white mb-8">
            YOUR AI.<br />
            <span className="text-cyber-yellow">UNLIMITED</span><br />
            POWER.
          </h1>
          <p className="text-neutral-500 text-sm md:text-base max-w-md leading-relaxed mb-10 font-mono">
            Next-generation conversational AI with enterprise-grade security, persistent memory, and multi-modal intelligence.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="group px-8 py-4 bg-cyber-yellow text-black text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all">
              START FREE <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-neutral-800 text-neutral-400 text-xs font-bold tracking-widest uppercase hover:border-cyber-yellow/50 hover:text-cyber-yellow transition-all">
              VIEW DEMO
            </button>
          </div>
          <div className="flex items-center gap-6 mt-10">
            {[['10M+', 'MESSAGES'], ['99.9%', 'UPTIME'], ['<50ms', 'LATENCY']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-lg font-black text-white font-mono">{val}</div>
                <div className="text-[9px] tracking-[0.2em] text-neutral-600 font-mono">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Preview Panel */}
        <div className="relative">
          <div className="border border-neutral-800 bg-[#0a0a0a]">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-cyber-yellow" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">NEXUS TERMINAL</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-green-500/70">SECURE</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Radio size={9} className="text-cyber-yellow" />
                  <span className="text-[9px] font-mono text-cyber-yellow/70">AI ACTIVE</span>
                </span>
              </div>
            </div>
            {/* Messages */}
            <div className="p-4 space-y-4 min-h-[320px]">
              <ChatMessage role="user" text="Analyze the Q4 security report and summarize key findings." />
              <ChatMessage role="ai" text="Analysis complete. 3 critical vulnerabilities identified in the perimeter network. Patch recommendations generated. Overall security posture improved 23% from Q3." />
              <ChatMessage role="user" text="Generate remediation plan for critical items." />
              <ChatMessage role="ai" text="Remediation plan drafted with 12 action items across 3 priority tiers. Estimated completion: 14 days. Shall I assign tasks to your team?" typing />
            </div>
            {/* Input bar */}
            <div className="border-t border-neutral-800 p-3 flex items-center gap-2">
              <span className="text-cyber-yellow font-mono text-xs">▸</span>
              <div className="flex-1 text-xs font-mono text-neutral-600">Enter command...</div>
              <button className="p-2 bg-cyber-yellow text-black hover:bg-cyber-yellow/90 transition-colors">
                <Send size={12} />
              </button>
            </div>
          </div>
          {/* Decorative corner markers */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-cyber-yellow/30" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-cyber-yellow/30" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-cyber-yellow/30" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-cyber-yellow/30" />
        </div>
      </div>
    </section>
  );
}

function ChatMessage({ role, text, typing }: { role: 'user' | 'ai'; text: string; typing?: boolean }) {
  return (
    <div className={`flex gap-3 ${role === 'user' ? 'justify-end' : ''}`}>
      {role === 'ai' && (
        <div className="w-7 h-7 border border-cyber-yellow/30 flex items-center justify-center flex-shrink-0">
          <Bot size={13} className="text-cyber-yellow" />
        </div>
      )}
      <div className={`max-w-[80%] ${role === 'user' ? 'bg-neutral-900 border border-neutral-800' : 'bg-[#111] border border-cyber-yellow/10'} px-4 py-3`}>
        <p className="text-xs font-mono text-neutral-300 leading-relaxed">{text}</p>
        {typing && (
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1 h-1 bg-cyber-yellow/60 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        )}
      </div>
      {role === 'user' && (
        <div className="w-7 h-7 bg-neutral-800 flex items-center justify-center flex-shrink-0">
          <User size={13} className="text-neutral-400" />
        </div>
      )}
    </div>
  );
}

// ─── FEATURES ───────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: Zap, title: 'INSTANT ANSWERS', desc: 'Sub-50ms response times with streaming output. No waiting, no lag — just raw intelligence.' },
    { icon: Brain, title: 'PERSISTENT MEMORY', desc: 'Remembers context across sessions. Your AI evolves with every conversation.' },
    { icon: FileSearch, title: 'FILE ANALYSIS', desc: 'Upload documents, code, data. Get instant analysis, summaries, and actionable insights.' },
    { icon: Workflow, title: 'WORKFLOW ENGINE', desc: 'Automate complex multi-step tasks with chained prompts and conditional logic.' },
    { icon: Users, title: 'TEAM COLLAB', desc: 'Shared workspaces, role-based access, and collaborative AI sessions.' },
    { icon: Shield, title: 'ZERO-TRUST SECURITY', desc: 'End-to-end encryption, SOC 2 compliant, with full audit logging.' },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="CAPABILITIES" />
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-tight">
          BUILT FOR <span className="text-cyber-yellow">POWER USERS</span>
        </h2>
        <p className="text-neutral-500 font-mono text-sm max-w-lg mb-16">Enterprise-grade AI infrastructure designed for teams that demand performance, security, and control.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-neutral-800">
          {features.map(f => (
            <div key={f.title} className="bg-[#0a0a0a] p-8 group hover:bg-[#0f0f0f] transition-colors">
              <f.icon size={20} className="text-cyber-yellow mb-6" />
              <h3 className="text-sm font-bold tracking-[0.15em] text-white mb-3 uppercase">{f.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-mono">{f.desc}</p>
              <div className="h-[1px] w-0 group-hover:w-full bg-cyber-yellow/30 mt-6 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── USE CASES ──────────────────────────────────────────
function UseCasesSection() {
  const cases = [
    { label: 'BUSINESS', title: 'Strategic Intelligence', desc: 'Market analysis, competitive intelligence, financial modeling, and executive briefings — powered by AI that understands your business context.' },
    { label: 'SUPPORT', title: 'Autonomous Resolution', desc: 'Handle 80% of support tickets automatically with context-aware responses, escalation logic, and sentiment analysis.' },
    { label: 'RESEARCH', title: 'Deep Analysis', desc: 'Process thousands of papers, extract insights, identify patterns, and generate comprehensive literature reviews in minutes.' },
    { label: 'PRODUCTIVITY', title: 'Workflow Acceleration', desc: 'Draft documents, analyze data, generate code, manage projects — your AI co-pilot for every workflow.' },
  ];

  return (
    <section id="use-cases" className="py-32 relative border-t border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="USE CASES" />
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-16 tracking-tight">
          DEPLOY <span className="text-cyber-yellow">ANYWHERE</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map(c => (
            <div key={c.label} className="border border-neutral-800 p-8 hover:border-cyber-yellow/20 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyber-yellow/0 via-cyber-yellow/50 to-cyber-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyber-yellow/60 mb-4 block">/ {c.label}</span>
              <h3 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">{c.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-mono">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECURITY ───────────────────────────────────────────
function SecuritySection() {
  const items = [
    { icon: Lock, label: 'END-TO-END ENCRYPTION', desc: 'AES-256 encryption at rest and in transit' },
    { icon: Fingerprint, label: 'ZERO KNOWLEDGE', desc: 'We never see or store your conversations' },
    { icon: ShieldCheck, label: 'SOC 2 TYPE II', desc: 'Independently audited security controls' },
    { icon: ScanLine, label: 'THREAT DETECTION', desc: 'Real-time monitoring and anomaly detection' },
    { icon: Eye, label: 'AUDIT LOGGING', desc: 'Complete activity trail for compliance' },
    { icon: Server, label: 'DATA RESIDENCY', desc: 'Choose where your data is stored globally' },
  ];

  return (
    <section id="security" className="py-32 relative border-t border-neutral-800/50">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, rgba(234,179,8,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionLabel text="SECURITY" />
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-tight">
          CYBER-GRADE <span className="text-cyber-yellow">DEFENSE</span>
        </h2>
        <p className="text-neutral-500 font-mono text-sm max-w-lg mb-16">Military-grade encryption and zero-trust architecture protect every interaction.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.label} className="border border-neutral-800/60 bg-[#080808] p-6 flex items-start gap-4 hover:border-cyber-yellow/20 transition-colors">
              <div className="w-10 h-10 border border-cyber-yellow/20 flex items-center justify-center flex-shrink-0">
                <item.icon size={16} className="text-cyber-yellow" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.15em] text-white mb-1 uppercase">{item.label}</h4>
                <p className="text-[11px] text-neutral-600 font-mono">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ────────────────────────────────────────────
function PricingSection() {
  const plans = [
    { name: 'STARTER', price: '0', period: '/forever', desc: 'For individuals exploring AI', features: ['1,000 messages/mo', 'Basic memory', '5MB file uploads', 'Community support'], highlight: false },
    { name: 'PRO', price: '29', period: '/month', desc: 'For professionals and power users', features: ['Unlimited messages', 'Persistent memory', '100MB file uploads', 'Priority support', 'API access', 'Custom instructions'], highlight: true },
    { name: 'ENTERPRISE', price: 'CUSTOM', period: '', desc: 'For organizations at scale', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated instance', 'SLA guarantee', 'Custom integrations', 'Audit logging'], highlight: false },
  ];

  return (
    <section id="pricing" className="py-32 relative border-t border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="PRICING" />
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-16 tracking-tight">
          CHOOSE YOUR <span className="text-cyber-yellow">TIER</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-[1px] bg-neutral-800">
          {plans.map(plan => (
            <div key={plan.name} className={`p-8 flex flex-col ${plan.highlight ? 'bg-[#0f0f0f] relative' : 'bg-[#0a0a0a]'}`}>
              {plan.highlight && <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyber-yellow" />}
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyber-yellow/60 mb-4">/ {plan.name}</span>
              <div className="mb-6">
                <span className="text-4xl font-black text-white font-mono">{plan.price === 'CUSTOM' ? '' : '$'}{plan.price}</span>
                <span className="text-neutral-600 font-mono text-xs">{plan.period}</span>
              </div>
              <p className="text-xs text-neutral-500 font-mono mb-8">{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <div className="w-1 h-1 bg-cyber-yellow" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 text-xs font-bold tracking-widest uppercase transition-all ${plan.highlight ? 'bg-cyber-yellow text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'border border-neutral-700 text-neutral-400 hover:border-cyber-yellow/40 hover:text-cyber-yellow'}`}>
                {plan.price === 'CUSTOM' ? 'CONTACT SALES' : 'GET STARTED'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'How does Nexus AI differ from other chatbots?', a: 'Nexus AI is built for professionals who demand enterprise-grade security, persistent memory across sessions, and the ability to process complex multi-step workflows — not just simple Q&A.' },
    { q: 'Is my data secure?', a: 'Absolutely. We use AES-256 encryption, operate on a zero-knowledge architecture, and are SOC 2 Type II certified. Your data never leaves your chosen region.' },
    { q: 'Can I integrate Nexus AI with my existing tools?', a: 'Yes. Our API supports integration with Slack, Teams, Notion, Jira, and custom webhooks. Enterprise plans include dedicated integration support.' },
    { q: 'What AI models power Nexus?', a: 'We use a proprietary ensemble of frontier models, optimized for different task types. You can also bring your own API keys for specific providers.' },
    { q: 'Is there a free trial?', a: 'Our Starter plan is free forever with 1,000 messages per month. No credit card required.' },
  ];

  return (
    <section className="py-32 relative border-t border-neutral-800/50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionLabel text="FAQ" />
        <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-16 tracking-tight">
          QUESTIONS<span className="text-cyber-yellow">.</span>
        </h2>
        <div className="space-y-[1px] bg-neutral-800">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#0a0a0a]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#0f0f0f] transition-colors"
              >
                <span className="text-sm font-bold text-white uppercase tracking-wide pr-4">{faq.q}</span>
                {openIndex === i ? <ChevronUp size={16} className="text-cyber-yellow flex-shrink-0" /> : <ChevronDown size={16} className="text-neutral-600 flex-shrink-0" />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-xs text-neutral-500 font-mono leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ──────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-32 relative border-t border-neutral-800/50">
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-yellow/[0.02] to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 border border-cyber-yellow/30 flex items-center justify-center">
            <Bot size={24} className="text-cyber-yellow" />
          </div>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white mb-6 tracking-tight leading-[0.95]">
          THE FUTURE IS<br /><span className="text-cyber-yellow">ALREADY HERE</span>
        </h2>
        <p className="text-neutral-500 font-mono text-sm max-w-md mx-auto mb-10">Stop using yesterday's tools. Deploy Nexus AI and experience intelligence without limits.</p>
        <button className="group px-12 py-5 bg-cyber-yellow text-black text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all">
          DEPLOY NEXUS AI <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="mt-16 flex items-center justify-center gap-8 text-[9px] font-mono tracking-[0.2em] text-neutral-700 uppercase">
          <span>■ ENCRYPTED</span>
          <span>■ SOC 2</span>
          <span>■ GDPR</span>
          <span>■ HIPAA</span>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-neutral-800/50 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-cyber-yellow" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">NEXUS AI © 2026</span>
        </div>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Security', 'Status'].map(link => (
            <a key={link} href="#" className="text-[10px] font-mono tracking-widest text-neutral-600 hover:text-cyber-yellow transition-colors uppercase">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── HELPERS ────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-1.5 h-1.5 bg-cyber-yellow" />
      <span className="text-[10px] font-mono tracking-[0.3em] text-cyber-yellow/60 uppercase">/ {text}</span>
    </div>
  );
}

// ─── MAIN LANDING PAGE ──────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-cyber-yellow/20 selection:text-cyber-yellow">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
