import { useState, useEffect } from 'react';
import { Network, Database, ShieldCheck, Cpu, Code, Zap, Check } from 'lucide-react';

// Import the actual local AI pipeline javascript file
import { aiPipeline } from '../api/aiPipeline.js';

export default function ExecutiveArchitecture() {
  const [activeStep, setActiveStep] = useState(0);
  const [pipelineResult, setPipelineResult] = useState<any>(null);
  const [queryCycleIndex, setQueryCycleIndex] = useState(0);

  const autoQueries = [
    "What are Dileep's primary technical skills?",
    "Tell me about the NextTrip booking system.",
    "Detail the Waste Routing Solver patent application.",
    "How can I get in touch with Dileep Galla?",
    "What is his experience in full-stack engineering?"
  ];

  // Fully Automated Pipeline Loop (Cycles automatically in the background)
  useEffect(() => {
    runPipelineTask(autoQueries[0]);

    const taskInterval = setInterval(() => {
      setQueryCycleIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % autoQueries.length;
        const nextQuery = autoQueries[nextIndex];
        runPipelineTask(nextQuery);
        return nextIndex;
      });
    }, 6000); // Transitions to next pipeline step every 6 seconds

    return () => clearInterval(taskInterval);
  }, []);

  const runPipelineTask = async (message: string) => {
    setActiveStep(0);
    try {
      const result = aiPipeline.process(message.trim(), 'auto-sandbox-session');

      // Animate stages step-by-step
      setTimeout(() => setActiveStep(0), 0);
      setTimeout(() => setActiveStep(1), 1200);
      setTimeout(() => setActiveStep(2), 2400);
      setTimeout(() => setActiveStep(3), 3600);
      setTimeout(() => {
        setActiveStep(4);
        setPipelineResult(result);
      }, 4800);

    } catch (error) {
      console.error("Pipeline run error:", error);
    }
  };

  const getStepMetadata = () => {
    switch (activeStep) {
      case 0:
        return {
          title: "Intelligent Ingest",
          sys: "Query NLP Ingestion",
          desc: "Validates string layout schemas, strips potential code injections, and normalizes spacing markers for downstream processing.",
          metric: "0.8KB Payload Verified",
          icon: Network,
          details: [
            "Parses request formats against strict structural rules.",
            "Neutralizes malicious script payloads for security.",
            "Stamps transient trace identifiers to monitor request lifecycles."
          ]
        };
      case 1:
        return {
          title: "Semantic Router",
          sys: "Intent Classifier Engine",
          desc: "Classifies conversational intent using local rules-based lexicons to direct the query down the optimal matching corridor.",
          metric: pipelineResult ? `Intent: ${pipelineResult.metadata.intent.toUpperCase()}` : "Classifying...",
          icon: Code,
          details: [
            `Classified intent category: "${pipelineResult?.metadata?.intent || 'calculating...'}"`,
            `Confidence level score: ${pipelineResult ? (pipelineResult.metadata.confidence * 100).toFixed(1) + '%' : 'evaluating...'}`,
            "Routes query intent dynamically to targeted search indexes."
          ]
        };
      case 2:
        return {
          title: "Keyword Extractor",
          sys: "Lexical Token Isolator",
          desc: "Extracts key system components and matches user terms to standard search keywords.",
          metric: pipelineResult ? `${pipelineResult.metadata.keywords.length} terms extracted` : "Isolating...",
          icon: Cpu,
          details: [
            `Extracted tokens: [${pipelineResult?.metadata?.keywords?.join(', ') || 'isolating...'}]`,
            "Filters conversational noise (e.g. questions, greetings).",
            "Maps aliases to canonical search indicators."
          ]
        };
      case 3:
        return {
          title: "Context Builder",
          sys: "RAG Retrieval Engine",
          desc: "Scans indexed developer records to retrieve matching context paragraphs from the local database.",
          metric: pipelineResult ? `${pipelineResult.metadata.retrievedCount} paragraphs matched` : "Querying Index...",
          icon: Database,
          details: [
            `Database documents fetched: ${pipelineResult?.metadata?.retrievedCount || 0}`,
            "Injects factual background summaries into contextual prompts.",
            "Discards outlier paragraphs matching below confidence margins."
          ]
        };
      case 4:
        return {
          title: "Output Synthesizer",
          sys: "Factual Generation Guard",
          desc: "Generates natural text outputs while checking spatial/temporal safety rules to eliminate hallucinations.",
          metric: "SLA Complete",
          icon: ShieldCheck,
          details: [
            "Enforces sentence-level textual entailment validation checks.",
            "Strips claims that cannot be traced directly to database indices.",
            "Renders verified clean responses to dashboard outputs."
          ]
        };
      default:
        return null;
    }
  };

  const currentStep = getStepMetadata();

  return (
    <section id="exec-architecture" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background visual element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.03),rgba(0,0,0,0))]" />
      
      {/* CSS Flow Animations */}
      <style>{`
        @keyframes flow-packets {
          to {
            stroke-dashoffset: -32;
          }
        }
        .flowing-trace {
          stroke-dasharray: 8, 8;
          animation: flow-packets 0.8s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(245,158,11,0.15); }
          50% { box-shadow: 0 0 25px rgba(245,158,11,0.35); }
        }
        .active-pulse-node {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-left mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-amber-500 text-[10px] font-mono tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>Systems Automation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
            Systems Architecture & Cognitive Pipelines
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed font-light">
            Visual schematic of the multi-agent orchestration layers, transactional state controls, and semantic RAG pipelines. Data flow packets automatically cycle through the layout in real time.
          </p>
          <div className="h-0.5 w-20 bg-amber-500 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Mesh Topology Visualizer (Lg: col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center min-h-[350px] w-full text-left">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
              
              {/* Graphic mesh networks paths overlay */}
              <div className="relative h-48 w-full z-0 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="glowing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Network Mesh lines linking coordinates */}
                  {/* Link 1: Ingest (60, 110) -> Intent Router (190, 60) */}
                  <path d="M 60 110 L 190 60" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M 60 110 L 190 60" stroke="url(#glowing-gradient)" strokeWidth="1.5" className={`flowing-trace opacity-80 ${activeStep === 0 ? 'block' : 'hidden'}`} />

                  {/* Link 2: Intent Router (190, 60) -> Token Extractor (320, 160) */}
                  <path d="M 190 60 L 320 160" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M 190 60 L 320 160" stroke="url(#glowing-gradient)" strokeWidth="1.5" className={`flowing-trace opacity-80 ${activeStep === 1 ? 'block' : 'hidden'}`} />

                  {/* Link 3: Token Extractor (320, 160) -> RAG Index Database (450, 60) */}
                  <path d="M 320 160 L 450 60" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M 320 160 L 450 60" stroke="url(#glowing-gradient)" strokeWidth="1.5" className={`flowing-trace opacity-80 ${activeStep === 2 ? 'block' : 'hidden'}`} />

                  {/* Link 4: RAG Index (450, 60) -> Synthesizer (540, 110) */}
                  <path d="M 450 60 L 540 110" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M 450 60 L 540 110" stroke="url(#glowing-gradient)" strokeWidth="1.5" className={`flowing-trace opacity-80 ${activeStep === 3 ? 'block' : 'hidden'}`} />
                </svg>

                {/* Nodes positioned absolutely over visual canvas */}
                {/* Node 1: Ingestion */}
                <div className={`absolute left-[5%] top-[40%] z-10 transition-all duration-300 flex flex-col items-center ${
                  activeStep === 0 ? 'scale-110 active-pulse-node' : 'opacity-50'
                }`}>
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-default bg-slate-950 ${
                    activeStep === 0 ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-slate-800 text-slate-500'
                  }`}>
                    <Network className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-450 mt-1">1. INGEST</span>
                </div>

                {/* Node 2: Intent Router */}
                <div className={`absolute left-[26%] top-[15%] z-10 transition-all duration-300 flex flex-col items-center ${
                  activeStep === 1 ? 'scale-110 active-pulse-node' : 'opacity-50'
                }`}>
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-default bg-slate-950 ${
                    activeStep === 1 ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-slate-800 text-slate-500'
                  }`}>
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-450 mt-1">2. ROUTER</span>
                </div>

                {/* Node 3: Token Filter */}
                <div className={`absolute left-[47%] top-[60%] z-10 transition-all duration-300 flex flex-col items-center ${
                  activeStep === 2 ? 'scale-110 active-pulse-node' : 'opacity-50'
                }`}>
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-default bg-slate-950 ${
                    activeStep === 2 ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-slate-800 text-slate-500'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-450 mt-1">3. TOKENIZER</span>
                </div>

                {/* Node 4: RAG Database */}
                <div className={`absolute left-[68%] top-[18%] z-10 transition-all duration-300 flex flex-col items-center ${
                  activeStep === 3 ? 'scale-110 active-pulse-node' : 'opacity-50'
                }`}>
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-default bg-slate-950 ${
                    activeStep === 3 ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-slate-800 text-slate-500'
                  }`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-450 mt-1">4. RAG_INDEX</span>
                </div>

                {/* Node 5: Output Guardrail */}
                <div className={`absolute left-[88%] top-[40%] z-10 transition-all duration-300 flex flex-col items-center ${
                  activeStep === 4 ? 'scale-110 active-pulse-node' : 'opacity-50'
                }`}>
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-default bg-slate-950 ${
                    activeStep === 4 ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-slate-800 text-slate-500'
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-450 mt-1">5. OUTPUT</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Active Stage Variables & Details Card (Lg: col-span-5) */}
          <div className="lg:col-span-5 flex flex-col">
            {currentStep && (
              <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-xl text-left flex flex-col justify-between h-full space-y-6">
                
                {/* Header detail */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono leading-none">
                      <span className="w-2 h-2 rounded-full bg-amber-500 select-none inline-block shrink-0 animate-pulse" />
                      Stage {activeStep + 1}: {currentStep.title}
                    </h3>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-wider font-bold">
                      {currentStep.sys}
                    </span>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed font-sans font-light">
                    {currentStep.desc}
                  </p>
                </div>

                {/* Operation Mechanics List */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-500 select-none">
                    <span>Operation Protocols</span>
                    <span className="text-amber-500 font-bold">{currentStep.metric}</span>
                  </div>
                  
                  <ul className="space-y-3 font-sans">
                    {currentStep.details.map((detail, idx) => (
                      <li key={idx} className="p-3.5 rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-slate-850 transition-colors flex gap-2.5 items-start">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400 text-xs leading-relaxed font-light">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
