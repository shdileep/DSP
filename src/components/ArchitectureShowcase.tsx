import { useState, SVGProps } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Cpu, 
  Send, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Share2, 
  Workflow, 
  Flame, 
  FileCode2,
  RefreshCw,
  SlidersHorizontal,
  Play,
  Gauge,
  Terminal,
  Sparkles,
  BookOpen,
  LineChart,
  Info,
  CheckCircle,
  AlertTriangle,
  FileText,
  Activity
} from 'lucide-react';
import { ThemeStyle } from '../types';

interface ArchitectureShowcaseProps {
  theme: ThemeStyle;
  customOverlayColor: string;
}

type PipelineType = 'nexttrip' | 'ujjwal' | 'resume';

export default function ArchitectureShowcase({ theme, customOverlayColor }: ArchitectureShowcaseProps) {
  const [activePipeline, setActivePipeline] = useState<PipelineType>('nexttrip');
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'topology' | 'sandbox' | 'whitepaper'>('topology');

  // Sandbox simulations dynamic states
  const [concurrency, setConcurrency] = useState<number>(1200);
  const [surgeMultiplier, setSurgeMultiplier] = useState<number>(1.25);
  const [hardwarePool, setHardwarePool] = useState<'edge' | 'cluster' | 'global'>('cluster');
  const [simStatus, setSimStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState<number>(0);

  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const pipelines = {
    nexttrip: {
      title: 'NextTrip AI Direct Booking',
      description: 'A full-stack, concurrent ticketing solver optimized by dynamic pricing heuristics and real-time ledger transactional guarantees.',
      telemetry: { latency: 340, cost: 0.001, accuracy: 99.9, algorithm: 'Dynamic Demand-Velocity AI' },
      nodes: [
        {
          title: 'Direct Query Ingest',
          icon: MapPin,
          desc: 'Passenger specifies departure city, destination terminal, and traveler count in concurrent queue.',
          telemetry: 'Queued payload: 0.8KB | Active session initialized',
          code: `# Step 1: User routes query parameters\ntrip_meta = {\n  "origin": "Chennai Central",\n  "destination": "Bengaluru Electronic City",\n  "seats": 2\n}`,
          details: [
            "Validates real-time incoming JSON payloads via strict Pydantic parsing, asserting parameters match valid regional terminal registers.",
            "Enforces high-availability rate limiting (60 requests/min per IP) via Redis sliding-window clusters to intercept high-volume scraper vectors.",
            "Normalizes multi-dialect spatial tags into standardized DB indices to minimize downstream analytical mismatch.",
            "Generates transient UUID session context trackers bound to trace logs for complete lifecycle request tracking."
          ]
        },
        {
          title: 'Dynamic Pricing AI',
          icon: RefreshCw,
          desc: 'ML models calculate optimal fares on the fly based on scheduling velocity, seats remaining, and demand surges.',
          telemetry: 'Calculated tariff multiplier: x1.25 | Inference: 15ms',
          code: `# Step 2: Compute AI Dynamic Fare\ndemand_score = pricing_engine.assess_density(trip_meta["destination"])\nbase_fare = pricing_engine.get_base_fare(trip_meta["origin"], trip_meta["destination"])\nfinal_fare = base_fare * (1.0 + (demand_score * 0.15))`,
          details: [
            "Queries low-latency memory tables containing aggregate regional query velocity indicators.",
            "Fits raw traffic data, residual seats, and meteorological variables into a light MLP classifier to yield exact billing surge multipliers.",
            "Coordinates dynamic cost limits, securing high profit boundaries without exceeding regulatory price caps.",
            "Saves CPU inference schedules using static mathematical estimation caches, reducing pipeline latency down to sub-15ms values."
          ]
        },
        {
          title: 'Seat Allocation Solver',
          icon: Layers,
          desc: 'Employs atomic transactions to prevent double-booking collisions under heavy concurrent user sessions.',
          telemetry: 'Locked rows: Seat 12A, 12B | Isolation level: SERIALIZABLE',
          code: `# Step 3: Run lock-guarded slot allocation\nwith database.transaction() as txn:\n  available_seats = txn.query("SELECT seat_no FROM seats WHERE bus_id = %s FOR UPDATE", bus_id)\n  if check_layout_availability(available_seats, trip_meta["seats"]):\n    txn.execute("INSERT INTO tickets (user_id, seats) VALUES (%s, %s)", user_id, trip_meta["seats"])`,
          details: [
            "Establishes database transactions strictly configured to double-isolated SERIALIZABLE conditions.",
            "Acquires instant SELECT FOR UPDATE locks on underlying seat rows, protecting bookings from concurrent collision anomalies.",
            "Re-verifies inventory allocations on physical tables before finalizing transactional commits.",
            "Applies automated exponential back-off algorithms to manage transient deadlocks during massive booking queues."
          ]
        },
        {
          title: 'Adaptive Route Scheduler',
          icon: Workflow,
          desc: 'Aligns live fleet availability against reservation profiles to maximize seat occupancy dynamically.',
          telemetry: 'Occupancy forecast: 94.8% | Dispatched: 1.1s',
          code: `# Step 4: Dispatch live schedule adjustments\nfleet_scheduler.rebalance_dispatch_frequencies(\n  destination=trip_meta["destination"],\n  current_density=demand_score\n)`,
          details: [
            "Analyzes aggregated commuter densities to forecast route capacity utilization indexes over 60-second sliding windows.",
            "Dispatches parallelized gRPC webhook nodes connecting directly to local operators and dynamic system schedules.",
            "Combats seat shortfalls dynamically by scaling up coach frequencies inside high-demand transport corridors in real-time.",
            "Stores historical route performance records to feed predictive scheduling indices on subsequent booking days."
          ]
        },
        {
          title: 'Ticket Ledger Generation',
          icon: Send,
          desc: 'Authenticates state records, generates encrypted ticket hashes, logs transactional telemetry, and updates UI.',
          telemetry: 'Transaction Hash: sha256_verified_0x8f2d',
          code: `# Step 5: Seal transaction ledgers\nticket_id = crypto_engine.generate_verification_hash(user_id, final_fare)\nledger_log.record_transaction_entry(ticket_id, amount=final_fare)\nfrontend_notif.dispatch_push(user_id, "Ticket ready!")`,
          details: [
            "Packs ticket state payloads and seals them using cryptographic SHA-256 validation signatures under local verification keys.",
            "Ensures strict double-entry correctness to protect auditing trace requirements on regional finances.",
            "Triggers background workers executing non-blocking SMTP email dispatches and reactive SMS pushes.",
            "Propagates synchronized seat layouts directly to the customer dashboard using real-time WebSockets."
          ]
        }
      ]
    },
    ujjwal: {
      title: 'Ujjwal-Hub Routing Engine',
      description: 'An asynchronous IoT heuristic router solving the capacitated Vehicle Routing Problem for regional fleets under real-time conditions.',
      telemetry: { latency: 1400, cost: 0.000, accuracy: 96.8, algorithm: 'K-Means + Dijkstra + A*' },
      nodes: [
        {
          title: 'IoT Sensor Feeds',
          icon: Database,
          desc: 'Collects fill-level state percentages from distributed waste units across 20+ municipal zones.',
          telemetry: 'Sub-200ms real-time sinked',
          code: `# Ingest grid telemetries\nbin_payload = {\n  "bin_id": "zone_12_bin_9",\n  "fill_percent": 87.5,\n  "coords": [12.98, 80.23]\n}`,
          details: [
            "Establishes persistent, high-frequency MQTT sensor sockets receiving telemetry packets from 1,200+ hardware bins.",
            "Suppresses transient data jitter and outlier volume swings with advanced local Kalman filters before DB commits.",
            "Maintains high system boundaries by securing communication links under industry-standard TLS 1.3 protocol architectures.",
            "Sends physical diagnostic alerts triggers when node voltage drops or anti-tampering triggers are tripped."
          ]
        },
        {
          title: 'K-Means Clusterizer',
          icon: Layers,
          desc: 'Clusters overflow locations to determine optimized collection centers and discard low-priority bins.',
          telemetry: 'Clusters k=4 calculated',
          code: `# Group bins statically using centroids\ncentroids, clusters = kmeans.fit_predict(\n  data=[bin_coords for bin in bins if bin.fill >= 75.0],\n  n_clusters=4\n)`,
          details: [
            "Filters dynamic location coordinates based strictly on high overflow parameters (fill index >= 75%).",
            "Executes K-Means Euclidean routines to establish optimal sub-regional centroids for group garbage collections.",
            "Saves diesel consumption overhead by ignoring low-priority containers located far away from heavy cluster hubs.",
            "Calculates load weight ceilings dynamically, warning dispatchers if regional weight limits exceed truck capacities."
          ]
        },
        {
          title: 'A* Pathfinding Router',
          icon: Share2,
          desc: 'Traces road net matrices from Mapbox nodes to solve multi-stop path weights.',
          telemetry: 'Distance reduced by 35%',
          code: `# Trace graph distance using heuristic weights\nfor cluster in clusters:\n  route = pathfinder.calculate_a_star(\n    origin=driver.coords, \n    waypoints=cluster.points\n  )`,
          details: [
            "Compiles precise city topologies into weighted graph matrices using real-time open street database layers.",
            "Leverages A* heuristic formulations combined with Google/Mapbox indices to resolve complex multi-waypoint tours.",
            "Integrates vehicle profile dimensions, routing transport vehicles exclusively through compatible heavy-freight pathways.",
            "Slices total transit miles, reducing fleet carbon footprints and driver scheduling requirements by 35%."
          ]
        },
        {
          title: 'Heuristics Rerouting',
          icon: Cpu,
          desc: 'Recalculates active routes dynamically under 2s if sensor percentages swing while drivers are active.',
          telemetry: 'Dynamic compute time: <1.8s',
          code: `# Trigger async telemetry reroute interrupt\nif updated_bin.fill_percent >= 90.0:\n  driver.active_itinerary = pathfinder.patch_itinerary(\n    driver.active_itinerary, \n    updated_bin.coords\n  )`,
          details: [
            "Installs asynchronous polling engines checking for rapid sensor capacity shifts during vehicle shift programs.",
            "Solves dynamic detour paths using route patch solvers without having to restart complete matrix recalculations.",
            "Transmits immediate rerouting instructions straight to the active dashboard of closest regional drivers.",
            "Eliminates duplicate trips to clean locations, saving massive, repetitive collection journeys across the city network."
          ]
        }
      ]
    },
    resume: {
      title: 'ResumeAI Cognitive Pipeline',
      description: 'An intelligent retrieval matcher that fuses T5 transformer encoders with discrete context indices to eliminate model hallucination by 25%.',
      telemetry: { latency: 280, cost: 0.0005, accuracy: 91.4, algorithm: 'T5 Transformer + TF-IDF' },
      nodes: [
        {
          title: 'Query Ingest',
          icon: Share2,
          desc: 'User queries specific job requirements inside the core search index.',
          telemetry: 'Tokens: 14 keys ingested',
          code: `# Step 1: Parse targeting search query\nuser_query = "Looking for Kubernetes DevOps skill with Golang."`,
          details: [
            "Implements natural entity classifiers parsing core competencies, programming languages, and years-of-experience tokens.",
            "Strips common lexical filler and stop-words to isolate high-value systems technologies.",
            "Performs robust security validation, neutralizing SQL injection vectors and automated scanner payloads.",
            "Stamps trace instrumentation tags to monitor real-time database search latencies throughout active requests."
          ]
        },
        {
          title: 'T5 Text Encoder',
          icon: Cpu,
          desc: 'Maps search parameters onto contextual tokens to detect intent alignment.',
          telemetry: 'Embedding dimensions: 512-dim',
          code: `# Step 2: Tokenize using HuggingFace T5\ninputs = tokenizer(user_query, return_tensors="pt")\nquery_representation = t5_encoder(**inputs).last_hidden_state`,
          details: [
            "Transforms preprocessed text tokens into a highly standardized 512-dimensional vector space using localized PyTorch weights.",
            "Identifies exact semantics mapping across developer jargon aliases (e.g. associating 'K8s' with 'Kubernetes' vectors).",
            "Leverages model parallel execution schedules on specialized accelerator layers to secure rapid output calculations.",
            "Quantizes neural network parameters into highly optimized integer layouts, lowering host memory usage."
          ]
        },
        {
          title: 'Lucene Retrieval Index',
          icon: Database,
          desc: 'Pulls factual curriculum-vitae paragraphs related to query intent.',
          telemetry: 'Doc count: d_k=5 blocks',
          code: `# Step 3: Match candidate paragraphs\nfactual_blocks = document_retriever.fetch_matched_paragraphs(\n  query_representation, \n  limit=5\n)`,
          details: [
            "Runs combined sparse-dense indexing algorithms utilizing BM25 matches alongside cosine vector margins.",
            "Fetches verified biographical data segments directly from certified corporate index pools.",
            "Filters matched paragraphs using custom experience-level filters to maintain precise query alignments.",
            "Extracts top-k paragraphs to minimize background token costs during subsequent response synthesis steps."
          ]
        },
        {
          title: 'Anti-Hallucination Guard',
          icon: Flame,
          desc: 'Synthesizes concise responses, pruning unrelated statements to scale answer efficiency by 25%.',
          telemetry: 'Inference latency: 110ms',
          code: `# Step 4: Clean context boundaries\nvalidated_claims = fact_verifier.verify_sentences(\n  context=factual_blocks, \n  generation=t5_decoded_output\n)\nfinal_response = "".join(sentence for sentence in validated_claims)`,
          details: [
            "Performs sentence-by-sentence textual entailment check to verify AI statements align strictly with underlying documentation.",
            "Strips clean any generic summaries or unqualified credentials that can't be traced to the retrieved DB records.",
            "Generates detailed accuracy percentage trackers indicating the exact fidelity scores of synthesized answers.",
            "Delivers structured, trustworthy screening reports directly which match enterprise auditing architectures."
          ]
        }
      ]
    }
  };

  const activeData = pipelines[activePipeline];
  const activeNode = activeData.nodes[activeNodeIdx] || activeData.nodes[0];

  // Different theme backgrounds
  const showcaseStyles = isTerminal
    ? 'border border-green-500/20 bg-black/60 p-6 rounded-lg font-mono'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.05)]'
    : isMinimal
    ? 'border border-slate-800 bg-[#0a0f1d] p-8 rounded-xl'
    : 'border border-[#1e293b] bg-slate-900/35 backdrop-blur-xl p-8 rounded-2xl';

  const nodeColor = (idx: number) => {
    if (idx === activeNodeIdx) {
      return isTerminal 
        ? 'bg-green-500 text-black border-green-400 font-bold scale-110 shadow-lg shadow-green-500/20' 
        : isSynth
        ? 'bg-pink-500 text-white border-pink-400 scale-115 shadow-xl shadow-pink-500/20'
        : 'bg-sky-500 text-white border-sky-400 scale-115 shadow-xl shadow-sky-500/20';
    }
    return isTerminal
      ? 'border-green-500/30 text-green-400/80 hover:bg-green-500/5 bg-transparent'
      : isSynth
      ? 'border-pink-500/20 text-pink-300 hover:bg-pink-500/5 bg-purple-950/50'
      : 'border-slate-800 text-slate-400 hover:bg-slate-900 bg-slate-950';
  };

  // Execution algorithm calculations for live sandbox
  const getDynamicMetrics = () => {
    const defaultData = activeData.telemetry;
    let hardwareMultiplier = 1.0;
    let hardwareCostFactor = 1.0;
    
    if (hardwarePool === 'edge') {
      hardwareMultiplier = 1.85;
      hardwareCostFactor = 0.5;
    } else if (hardwarePool === 'global') {
      hardwareMultiplier = 0.6;
      hardwareCostFactor = 2.4;
    }

    const calculatedLatency = Math.round((defaultData.latency * hardwareMultiplier) + (concurrency * 0.045 * Math.sqrt(surgeMultiplier)));
    const calculatedCost = (defaultData.cost * hardwareCostFactor * surgeMultiplier).toFixed(5);
    
    // SLA calculated with bottleneck variables for fidelity
    let calculatedSLA = defaultData.accuracy;
    if (hardwarePool === 'edge' && concurrency > 800) {
      calculatedSLA = Math.max(81.5, defaultData.accuracy - (concurrency - 800) * 0.0045);
    } else if (hardwarePool === 'cluster' && concurrency > 3000) {
      calculatedSLA = Math.max(92.0, defaultData.accuracy - (concurrency - 3000) * 0.001);
    }
    const finalSLA = Number(calculatedSLA.toFixed(2));

    return {
      latency: calculatedLatency,
      cost: calculatedCost,
      sla: finalSLA,
      memory: Math.min(98.4, Math.round(15.2 + (concurrency * 0.012) + (hardwarePool === 'edge' ? 35 : 0)))
    };
  };

  const dynamicMetrics = getDynamicMetrics();

  // Dry run engine script
  const triggerDryRun = () => {
    setSimStatus('running');
    setSimProgress(0);
    setSimLogs([`[INFO] [${new Date().toLocaleTimeString()}] Initializing live sandbox simulation core...`]);

    const routeLogs = {
      nexttrip: [
        `[19:25:01] [RESOLV] Ingesting terminal transaction parameter: seats=${Math.max(1, Math.round(concurrency / 300))}, surge_factor=${surgeMultiplier.toFixed(2)}x`,
        `[19:25:02] [ML_PRICING] Evaluating demand dynamic calculus. Computed regional tariff: $${(0.12 * surgeMultiplier).toFixed(3)}/km`,
        `[19:25:03] [DB_ISOLATION] Invoking SERIALIZABLE lock sequence checks (PostgreSQL SELECT FOR UPDATE cursor acquired)`,
        `[19:25:04] [SCHEDULER] Aligning vehicle index weights. Dispatched fleet route optimization triggers`,
        `[19:25:05] [LEDGER] Ledger sealed. Generated cryptographic node transaction authentication hash`
      ],
      ujjwal: [
        `[19:25:01] [IoT_INGEST] Indexing sensor signal frequencies across 24 monitored sanitation sectors`,
        `[19:25:02] [K_CLUSTERS] Computed K-Means Euclidean coordinate centroids iteratively (K=4 converged in 8 iterations)`,
        `[19:25:03] [ASTAR_ROUTE] Running A* Dijkstra pathfinding heuristics. Evaluating dynamic road weights models`,
        `[19:25:04] [REROUTE] Optimization callback resolved. Path weights reduced by 35% against initial iteration`,
        `[19:25:05] [DISPATCH] Transmitted route schedule instructions directly to active fleet dashboard systems`
      ],
      resume: [
        `[19:25:01] [NLP_INGEST] parsing target context string queries: "${concurrency} Kubernetes developer matches"`,
        `[19:25:02] [T5_ENCODE] Generating 512-dimension semantic sentence vectors on PyTorch transformer runtime`,
        `[19:25:03] [INDEX_RETRIEVE] Matched top-5 Lucene dense candidate chunks -- Relevance score verified`,
        `[19:25:04] [ANTI_HALLUC] Verifying chronological sequence constraints. Stripping hallucination boundaries`,
        `[19:25:05] [SYNTHESIS] Validated exact match compliance check. Context output successfully generated!`
      ]
    };

    const targetLogsList = routeLogs[activePipeline];
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      setSimProgress((step / 5) * 100);
      setSimLogs(prev => [...prev, targetLogsList[step - 1]]);

      if (step >= 5) {
        clearInterval(timer);
        setSimStatus('completed');
        setSimLogs(prev => [...prev, `[INFO] [${new Date().toLocaleTimeString()}] Pipeline dry-run completed. All locks context-released. SLA SLA_TARGET reached.`]);
      }
    }, 700);
  };

  return (
    <section id="architecture" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section title */}
      <div className="text-left mb-8">
        {isTerminal && (
          <span className="text-xs font-bold uppercase tracking-widest block text-green-500 font-mono">
            {">"} SYSTEM DEEP_DIVE: PROTOCOLS
          </span>
        )}
        <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
          isTerminal ? 'text-green-300 font-mono' : isSynth ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold' : 'text-white'
        }`}>
          {isTerminal ? '_cat intelligence_systems/' : 'AI Systems Architecture'}
        </h2>
        <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
      </div>

      {/* Tabs navigation selection bar for 3X Better features */}
      <div className="flex border-b border-slate-800 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('topology')}
          className={`flex items-center gap-2 py-3 px-6 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'topology'
              ? isTerminal ? 'border-green-500 text-green-400' : isSynth ? 'border-pink-500 text-pink-400' : 'border-sky-400 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          style={{ borderColor: activeTab === 'topology' && !isTerminal && !isSynth ? customOverlayColor : undefined, color: activeTab === 'topology' && !isTerminal && !isSynth ? customOverlayColor : undefined }}
        >
          <NetworkIcon className="w-4 h-4" />
          <span>Cognitive Topology Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`flex items-center gap-2 py-3 px-6 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sandbox'
              ? isTerminal ? 'border-green-500 text-green-400' : isSynth ? 'border-pink-500 text-pink-400' : 'border-sky-400 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          style={{ borderColor: activeTab === 'sandbox' && !isTerminal && !isSynth ? customOverlayColor : undefined, color: activeTab === 'sandbox' && !isTerminal && !isSynth ? customOverlayColor : undefined }}
        >
          <SlidersHorizontal className="w-4 h-4 text-purple-400" />
          <span>Interactive Core Simulator (SLA Lab)</span>
          <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wide">Dynamic</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('whitepaper');
          }}
          className={`flex items-center gap-2 py-3 px-6 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'whitepaper'
              ? isTerminal ? 'border-green-500 text-green-400' : isSynth ? 'border-pink-500 text-pink-400' : 'border-sky-400 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          style={{ borderColor: activeTab === 'whitepaper' && !isTerminal && !isSynth ? customOverlayColor : undefined, color: activeTab === 'whitepaper' && !isTerminal && !isSynth ? customOverlayColor : undefined }}
        >
          <BookOpen className="w-4 h-4 text-sky-400" />
          <span>Mathematics & System Whitepaper</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Toggle selectors buttons for different pipelines, available globally across tabs */}
        <div className="flex flex-wrap gap-2.5">
          {(Object.keys(pipelines) as PipelineType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActivePipeline(tab);
                setActiveNodeIdx(0);
                setSimStatus('idle');
                setSimLogs([]);
                setSimProgress(0);
              }}
              className={`cursor-pointer px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activePipeline === tab
                  ? isTerminal
                    ? 'bg-green-600 text-black border border-green-400'
                    : isSynth
                    ? 'bg-pink-600 text-white border border-pink-400 shadow-lg shadow-pink-500/25'
                    : 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                  : isTerminal
                  ? 'border border-green-500/30 text-green-400 bg-[#020502]/60 hover:bg-green-500/5'
                  : isSynth
                  ? 'border border-pink-500/20 text-pink-300 bg-purple-950/20 hover:bg-purple-950/40'
                  : 'border border-slate-800 text-slate-355 bg-slate-900/40 hover:bg-slate-900/80 hover:text-white'
              }`}
              style={{
                backgroundColor: !isTerminal && !isSynth && activePipeline === tab ? customOverlayColor : undefined,
                borderColor: !isTerminal && !isSynth && activePipeline === tab ? customOverlayColor : undefined
              }}
            >
              <Workflow className="w-4 h-4" />
              <span>{pipelines[tab].title}</span>
            </button>
          ))}
        </div>

        {/* Tab content containers */}
        <AnimatePresence mode="wait">
          {activeTab === 'topology' && (
            <motion.div
              key="topology-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={showcaseStyles}
            >
              
              {/* Executive info & metrics bar */}
              <div className="border-b border-slate-800/80 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5 text-left">
                <div className="space-y-1.5 md:max-w-xl">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                     <Layers className={`w-4 h-4 ${isTerminal ? 'text-green-500' : 'text-sky-450'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                     {activeData.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isTerminal ? 'text-green-400/80' : 'text-slate-400'}`}>
                    {activeData.description}
                  </p>
                </div>

                {/* Metrics cards */}
                <div className={`grid grid-cols-2 sm:flex sm:items-center gap-3.5 pt-1.5 md:pt-0 shrink-0 font-mono text-[10px] uppercase font-bold text-slate-400 leading-snug p-3.5 bg-black/45 rounded-xl border border-slate-800/80`}>
                  <div>
                    <span className="text-slate-500 block text-[9px]">Base Latency:</span>
                    <span className={`text-[11.5px] font-black leading-none ${isTerminal ? 'text-yellow-400' : 'text-sky-400'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}>{activeData.telemetry.latency}ms</span>
                  </div>
                  <div className="h-5.5 w-px bg-slate-800 hidden sm:block" />
                  <div>
                    <span className="text-slate-500 block text-[9px]">Compute Cost:</span>
                    <span className="text-[11.5px] font-black text-emerald-400 leading-none">${activeData.telemetry.cost}</span>
                  </div>
                  <div className="h-5.5 w-px bg-slate-800 hidden sm:block" />
                  <div>
                    <span className="text-slate-500 block text-[9px]">Core Algorithm:</span>
                    <span className="text-[11.5px] font-black text-yellow-400 leading-none block max-w-[130px] truncate">{activeData.telemetry.algorithm}</span>
                  </div>
                </div>
              </div>

              {/* ADVANCED PIPELINE TOPOLOGY MAP PANEL (Interactive Horizontal Flow Diagram with glowing vectors) */}
              <div className="mb-8 p-5 bg-gradient-to-b from-slate-950 to-slate-900/40 rounded-2xl border border-slate-800/80 relative overflow-hidden text-left select-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-5 relative z-10 font-mono text-[10px] text-slate-400">
                  <span className="font-bold flex items-center gap-1.5 uppercase">
                    <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                    SYSTEM COGNITIVE TOPOLOGY SCHEMATIC
                  </span>
                  <span className="text-slate-500 uppercase">Interactive Node Inspector Map</span>
                </div>

                {/* Horizontal flow line of nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
                  {activeData.nodes.map((node, nidx) => {
                    const NodeIcon = node.icon;
                    const isActive = nidx === activeNodeIdx;
                    return (
                      <div key={node.title} className="relative flex flex-col justify-between">
                        
                        {/* Step Card block */}
                        <button
                          onClick={() => setActiveNodeIdx(nidx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                            isActive
                              ? isTerminal
                                ? 'bg-green-950/20 border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.15)]'
                                : isSynth
                                ? 'bg-pink-950/20 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                                : 'bg-slate-900 border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                              : 'bg-black/30 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900/20'
                          }`}
                          style={{
                            borderColor: isActive && !isTerminal && !isSynth ? customOverlayColor : undefined
                          }}
                        >
                          <div className="flex items-center justify-between gap-2.5 pb-1">
                            <span className={`text-[9px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded ${
                              isActive
                                ? isTerminal ? 'bg-green-500/20 text-green-300' : isSynth ? 'bg-pink-500/20 text-pink-300' : 'bg-sky-500/20 text-sky-400'
                                : 'bg-slate-900/80 text-slate-500'
                            }`}
                            style={{
                              color: isActive && !isTerminal && !isSynth ? customOverlayColor : undefined,
                              backgroundColor: isActive && !isTerminal && !isSynth ? customOverlayColor + '1a' : undefined
                            }}
                            >
                              ROUTE_0{nidx + 1}
                            </span>
                            
                            <div className={`p-1.5 rounded-md border ${
                              isActive
                                ? isTerminal ? 'border-green-500/30 text-green-400' : isSynth ? 'border-pink-500/30 text-pink-400' : 'border-sky-500/30 text-sky-400'
                                : 'border-slate-800 text-slate-500'
                            }`}
                            style={{ color: isActive && !isTerminal && !isSynth ? customOverlayColor : undefined }}
                            >
                              <NodeIcon className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div className="pt-2">
                            <h4 className={`text-[11.5px] font-bold leading-tight line-clamp-1 ${
                              isActive ? 'text-slate-100 font-extrabold' : 'text-slate-400'
                            }`}>
                              {node.title}
                            </h4>
                            <p className="text-[9px] text-slate-500 line-clamp-1 mt-1 font-mono tracking-tight">{node.telemetry}</p>
                          </div>

                          {/* Active indicator dot and ambient lighting */}
                          {isActive && (
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1.5 w-10.5 rounded-t-full transition-all ${
                              isTerminal ? 'bg-green-400' : isSynth ? 'bg-pink-500' : 'bg-sky-400'
                            }`}
                            style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                            />
                          )}
                        </button>

                        {/* Horizontal connector arrows inside visual map */}
                        {nidx < activeData.nodes.length - 1 && (
                          <div className="hidden lg:block absolute top-[24px] -right-[15px] translate-x-1/2 z-20 pointer-events-none">
                            <svg width="20" height="12" viewBox="0 0 20 12" className="overflow-visible">
                              <line x1="0" y1="6" x2="20" y2="6" stroke="#1e293b" strokeWidth="1.5" />
                              <motion.circle 
                                cx="0" 
                                cy="6" 
                                r="2.5" 
                                fill={isTerminal ? '#22c55e' : isSynth ? '#ec4899' : customOverlayColor || '#0ea5e9'} 
                                animate={{ cx: [0, 20] }} 
                                transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                              />
                            </svg>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                
                {/* Left Box: Flow Nodes visualization diagram */}
                <div className="lg:col-span-5 flex flex-col justify-center items-center py-2 lg:py-0">
                  <div className="w-full max-w-[260px] sm:max-w-xs relative flex flex-col gap-2.5">
                    {/* Background vertical connector lines aligned with node bubbles */}
                    <div className={`absolute w-0.5 top-5 bottom-5 z-0 cursor-default left-[22px] ${
                      isTerminal ? 'bg-green-500/10' : 'bg-slate-800'
                    }`} />

                    {/* Loop and render nodes */}
                    {activeData.nodes.map((node, nidx) => {
                      const NodeIcon = node.icon;
                      return (
                        <div key={node.title} className="z-10 w-full flex items-center gap-4 justify-start">
                          
                          {/* Node bubble */}
                          <button
                            onClick={() => setActiveNodeIdx(nidx)}
                            className={`w-11 h-11 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all shrink-0 ${nodeColor(nidx)}`}
                          >
                            <NodeIcon className="w-4.5 h-4.5" />
                          </button>

                          {/* Node label */}
                          <button
                            onClick={() => setActiveNodeIdx(nidx)}
                            className="text-left cursor-pointer flex-1 group"
                          >
                            <h4 className={`text-xs font-bold transition-colors ${
                              nidx === activeNodeIdx 
                                ? isTerminal ? 'text-green-300' : isSynth ? 'text-pink-400' : 'text-sky-400' 
                                : 'text-slate-200 group-hover:text-white'
                            }`}
                            style={{ color: nidx === activeNodeIdx && !isTerminal && !isSynth ? customOverlayColor : undefined }}
                            >
                              {isTerminal ? `[Node 0${nidx + 1}] ` : ''}{node.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 tracking-tight">{node.telemetry}</p>
                          </button>
                          
                          {nidx === activeNodeIdx && (
                            <motion.div layoutId="arrow-active" className="shrink-0 text-slate-500">
                              <ArrowRight className={`w-4 h-4 ${isTerminal ? 'text-green-400' : isSynth ? 'text-pink-400' : 'text-sky-400'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Box: Inspected Node descriptions */}
                <div className="lg:col-span-7 flex flex-col justify-start gap-3 text-left p-4.5 rounded-xl border border-slate-800 bg-slate-950/80">
                  
                  {/* Header details */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 leading-snug">
                        <span className="w-2 rounded-full bg-emerald-500 select-none inline-block shrink-0 animate-pulse h-2" />
                        {activeNode.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Node Details_v1.8</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-3.5 rounded-lg border border-slate-900/40">
                      {activeNode.desc}
                    </p>

                    {/* Highly Professional Detailed Logic list */}
                    {(activeNode as any).details && (
                      <div className="space-y-2 pt-0.5">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Operational Mechanics & Protocols</span>
                        <ul className="space-y-2">
                          {(activeNode as any).details.map((detail: string, dIdx: number) => (
                            <li key={dIdx} className="flex gap-2.5 text-[11px] text-slate-400 leading-relaxed items-start">
                              <span className="text-emerald-400 select-none font-mono mt-0.5 shrink-0">✓</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Integrated Micro-code collapse or quick-look container */}
                    <div className="pt-2">
                      <details className="group border border-slate-900 rounded-lg bg-black/30 overflow-hidden">
                        <summary className="flex items-center justify-between p-2.5 text-[10.5px] text-slate-400 font-mono font-semibold cursor-pointer hover:bg-slate-900/40 select-none list-none">
                          <span className="flex items-center gap-1.5">
                            <FileCode2 className="w-3.5 h-3.5 text-sky-400" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                            VIEW PYTHON PIPELINE BLOCK
                          </span>
                          <span className="text-slate-500 transition-transform group-open:rotate-180">↓</span>
                        </summary>
                        <div className="p-3 bg-black border-t border-slate-900">
                          <pre className="text-[10.5px] text-indigo-300 font-mono overflow-auto leading-normal whitespace-pre">
                            <code>{activeNode.code}</code>
                          </pre>
                        </div>
                      </details>
                    </div>

                  </div>

                  {/* Live telemetry block */}
                  <div className="p-2.5 rounded-lg bg-black/45 border border-slate-900/60 flex items-center justify-between font-mono text-[10.5px] mt-3.5 gap-2">
                    <span className="text-slate-550 font-semibold tracking-wide">METRICS INGEST STATUS</span>
                    <span className="text-green-400 font-bold tracking-wide bg-green-500/10 px-2.5 py-0.5 rounded uppercase text-right truncate max-w-[280px]">{activeNode.telemetry}</span>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {activeTab === 'sandbox' && (
            <motion.div
              key="sandbox-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >
              {/* Sliders and variables controllers card - Left side */}
              <div className="lg:col-span-5 space-y-6">
                <div className={`${showcaseStyles} flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <SlidersHorizontal className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-slate-100 font-sans">
                        SLA Stress Laboratory
                      </h3>
                    </div>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Scale the query parameters to stress-test how various hardware topologies handle the pipeline under concurrent and surge loads.
                    </p>

                    {/* Slider 1: Concurrency load */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-[11px] font-mono select-none">
                        <span className="text-slate-400 font-bold">CONCURRENT COGNITIONS</span>
                        <span className={`font-black ${isTerminal ? 'text-green-400' : 'text-sky-450'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}>
                          {concurrency} req/sec
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="5000"
                        step="50"
                        value={concurrency}
                        onChange={(e) => {
                          setConcurrency(Number(e.target.value));
                          setSimStatus('idle');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
                      />
                    </div>

                    {/* Slider 2: Surge Multiplier */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-[11px] font-mono select-none">
                        <span className="text-slate-400 font-bold">DATA SURGE VOLATILITY</span>
                        <span className="font-black text-rose-400">{surgeMultiplier.toFixed(2)}x peak multiplier</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="3.0"
                        step="0.05"
                        value={surgeMultiplier}
                        onChange={(e) => {
                          setSurgeMultiplier(Number(e.target.value));
                          setSimStatus('idle');
                        }}
                        className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
                      />
                    </div>

                    {/* Toggle: Core Hardware Topology Pool */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">CORE INFRASTRUCTURE ALLOCATION</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'edge', title: 'Single Edge Node' },
                          { id: 'cluster', title: 'Reg Cluster' },
                          { id: 'global', title: 'Global Grid' }
                        ].map((hw) => (
                          <button
                            key={hw.id}
                            onClick={() => {
                              setHardwarePool(hw.id as any);
                              setSimStatus('idle');
                            }}
                            className={`p-2.5 rounded-lg border text-[10px] font-bold font-mono text-center transition-all cursor-pointer ${
                              hardwarePool === hw.id
                                ? isTerminal
                                  ? 'bg-green-700/20 text-green-300 border-green-500'
                                  : 'bg-indigo-600/20 text-indigo-300 border-indigo-500'
                                : 'border-slate-800 bg-black/40 text-slate-500 hover:border-slate-705'
                            }`}
                          >
                            {hw.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Warning banner for simulated high-load bottleneck */}
                  {hardwarePool === 'edge' && concurrency > 1000 && (
                    <div className="mt-5 p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-400 text-xs flex gap-2.5 flex-row items-center font-sans">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
                      <span>
                        <strong>Resource Bottleneck warning!</strong> Single Node topology is overwhelmed. Latency climbs and process rate degradation occurs. Upgrade to Cluster or Global.
                      </span>
                    </div>
                  )}

                  {/* Trigger Simulator Action Button */}
                  <div className="pt-6">
                    <button
                      onClick={triggerDryRun}
                      disabled={simStatus === 'running'}
                      className={`w-full py-3 px-4 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-2 transition-all select-none cursor-pointer ${
                        simStatus === 'running' 
                          ? 'bg-slate-800 border border-slate-700 text-slate-500 pointer-events-none' 
                          : isTerminal 
                          ? 'bg-green-600 hover:bg-green-500 text-black border border-green-400' 
                          : isSynth 
                          ? 'bg-pink-600 hover:bg-pink-500 text-white border border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.3)]' 
                          : 'bg-indigo-600 hover:bg-indigo-500 text-indigo-50'
                      }`}
                      style={{ backgroundColor: simStatus !== 'running' && !isTerminal && !isSynth ? customOverlayColor : undefined }}
                    >
                      {simStatus === 'running' ? (
                        <>
                          <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                          <span>SIMULATING RUNTIME ACTIONS...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4.5 h-4.5 text-emerald-400 fill-emerald-400" />
                          <span>EXECUTE SANDBOX DRY RUN</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Telemetries Visualization and Terminal console output - Right Side */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* Simulated Telemetry Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Calculated Latency',
                      value: `${dynamicMetrics.latency}ms`,
                      icon: Gauge,
                      colorClass: dynamicMetrics.latency > 900 ? 'text-red-400' : dynamicMetrics.latency > 450 ? 'text-amber-400' : 'text-teal-400',
                      desc: `${hardwarePool === 'edge' ? 'Poor' : 'Optimal'} edge cycle time`
                    },
                    {
                      label: 'Operational cost',
                      value: `$${dynamicMetrics.cost}`,
                      icon: Activity,
                      colorClass: 'text-indigo-400',
                      desc: 'Estimated core math bill'
                    },
                    {
                      label: 'SLA Success rate',
                      value: `${dynamicMetrics.sla}%`,
                      icon: CheckCircle,
                      colorClass: dynamicMetrics.sla < 90 ? 'text-red-400' : 'text-emerald-400',
                      desc: `${dynamicMetrics.sla >= 99.5 ? 'Exceeding' : 'Degraded'} SLA guidelines`
                    },
                    {
                      label: 'Shared memory load',
                      value: `${dynamicMetrics.memory}%`,
                      icon: Cpu,
                      colorClass: dynamicMetrics.memory > 85 ? 'text-red-400 animate-pulse' : 'text-sky-400',
                      desc: `${dynamicMetrics.memory > 85 ? 'Congested memory' : 'Reserved ceiling OK'}`
                    }
                  ].map((metric) => {
                    const MIcon = metric.icon;
                    return (
                      <div key={metric.label} className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-1.5 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-slate-500 font-mono text-[9px] uppercase font-bold tracking-tight leading-snug">{metric.label}</span>
                          <MIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                        <div>
                          <div className={`text-base font-black font-mono leading-none ${metric.colorClass}`}>{metric.value}</div>
                          <span className="text-[8px] text-slate-500 block leading-tight mt-1 truncate">{metric.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Logs Terminal view window */}
                <div className="flex-1 p-5 rounded-xl border border-slate-800 bg-[#02050f] font-mono text-xs flex flex-col justify-between min-h-[260px]">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Terminal className="w-3.5 h-3.5 text-green-400" />
                      LIVE COMPILER LOGGER CONSOLE
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <div className="space-y-2 flex-1 overflow-y-auto max-h-[170px] scrollbar-none pr-1">
                    {simLogs.length === 0 ? (
                      <div className="text-slate-600 text-center py-10 select-none">
                        [WAITING] Laboratory is idle. Tweak parameters and press 'EXECUTE' above.
                      </div>
                    ) : (
                      simLogs.map((log, lidx) => (
                        <div
                          key={lidx}
                          className={`text-[11px] leading-relaxed transition-all tracking-tight ${
                            log.includes('[SUCCESS]') || log.includes('finalized')
                              ? 'text-green-400 font-bold'
                              : log.includes('warning') || log.includes('[WARNING]')
                              ? 'text-amber-400 font-bold font-mono'
                              : 'text-slate-350'
                          }`}
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Simulator cascading bar */}
                  {simStatus === 'running' && (
                    <div className="mt-3.5 pt-3 border-t border-white/5 space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                        <span>TRANSMITTING CODES_</span>
                        <span>{Math.round(simProgress)}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
                        <motion.div
                          className="bg-purple-500 h-full rounded"
                          initial={{ width: 0 }}
                          animate={{ width: `${simProgress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          )}

          {activeTab === 'whitepaper' && (
            <motion.div
              key="whitepaper-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`${showcaseStyles} text-left leading-normal space-y-8 max-w-4xl mx-auto`}
            >
              <div className="border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 mb-2 select-none">
                  <FileText className="w-5 h-5 text-sky-400" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#a855f7] uppercase">PROD SPECIFICATION PAPER</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-100 font-sans tracking-tight">
                  Calculus and Mathematical Rigor across Galla Engines
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mt-1.5">
                  Detailed architectural explanation of dynamic heuristics, atomic thread schedules, and anti-hallucination sequence transformers built into Dileep Galla&apos;s codebase.
                </p>
              </div>

              {/* Subsection 1: NextTrip database serializability */}
              <div className="space-y-3.5">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-505/10 border border-sky-500/20 text-sky-400 font-bold uppercase tracking-wider select-none leading-none">nexttrip algorithm</span>
                <h4 className="text-base font-bold text-slate-200">
                  Atomic Row Locks & Concurrency Isolations
                </h4>
                <p className="text-xs leading-relaxed text-slate-355 text-justify">
                  Traditional relational reservation engines degrade when multi-threaded reservation sessions trigger race conditions on identical inventories. Overbooking and race conditions arise when parallel requests read available seating capacities prior to locking them.
                </p>
                
                {/* Educational equation visual box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[10.5px] text-slate-450 leading-relaxed relative overflow-hidden select-all">
                  <div className="absolute top-2 right-3 text-slate-600 text-[8px] font-bold">SQL SCHEMA PROTOCOL</div>
                  <span className="text-[#a855f7] font-bold block mb-1">-- SERIALIZABLE LOCK DEMONSTRATION</span>
                  <span className="text-emerald-400">BEGIN TRANSACTION;</span><br />
                  <span className="text-slate-300">SELECT seat_no FROM seats WHERE bus_id = &apos;bus_104&apos; AND available = TRUE </span><span className="text-[#a855f7] font-bold">FOR UPDATE;</span><br />
                  <span className="text-slate-500">-- Prevents parallel clients from reading or modifying these lines until COMMIT.</span><br />
                  <span className="text-emerald-400">UPDATE seats SET available = FALSE WHERE seat_no = &apos;12A&apos;;</span><br />
                  <span className="text-emerald-400">COMMIT;</span>
                </div>

                <p className="text-xs leading-relaxed text-slate-355 text-justify">
                  By executing database isolations inside an explicit SERIALIZABLE scope, the transaction queue guarantees safe concurrent reservation state allocations. Fares are calculated dynamically based on reservations velocity to compute pricing matrices relative to the remaining capacity.
                </p>
              </div>

              {/* Subsection 2: Ujjwal Routing heuristic */}
              <div className="border-t border-slate-800/80 pt-6 space-y-3.5">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-950/10 border border-purple-500/20 text-purple-400 font-bold uppercase tracking-wider select-none leading-none">ujjwal-hub algorithm</span>
                <h4 className="text-base font-bold text-slate-200">
                  solving CVRP with K-Means Centroids & A* Dijkstra Graphs
                </h4>
                <p className="text-xs leading-relaxed text-slate-355 text-justify">
                  Ujjwal-Hub routes urban regional waste collection using real-time IoT sensors. If formulated statically, vehicle routing becomes a NP-Hard Capacitated Vehicle Routing Problem (CVRP). Standard algorithms fail because vehicle capacity limits, municipal road networks, and dynamic sensor fill-level swinging introduce real-time state variance.
                </p>

                {/* Mathematical Equation presentation */}
                <div className="p-4.5 bg-slate-950 border border-slate-800 rounded-xl text-center select-all">
                  <div className="text-[10px] font-mono text-slate-500 font-semibold mb-3">EUCLIDEAN DISTANCE POLYNOMIAL</div>
                  <div className="text-xs text-slate-200 font-serif leading-relaxed font-semibold italic text-slate-100 flex items-center justify-center gap-1.5 select-all">
                    <span>d(p, q) = </span>
                    <span className="border-t border-slate-200 pt-0.5 font-sans not-italic font-black text-sm select-all">
                      √ ∑ (q<sub>i</sub> - p<sub>i</sub>)<sup>2</sup>
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 italic mt-3">Used in grouping active overflow locations into geographic centroids (K-Means)</div>
                </div>

                <p className="text-xs leading-relaxed text-slate-355 text-justify">
                  The routing engine clusters overflow items first to optimize route efficiency:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-355 space-y-1.5 leading-relaxed">
                  <li><strong>K-Means Clustering</strong>: Translates thousands of scattered coordinates into K targeted regional collector centroids, eliminating computational search paths on low-volume locations.</li>
                  <li><strong>A* Dijkstra Search Routing</strong>: Evaluates road waypoint node weights retrieved from live Mapbox routing graphs, recalculating optimal paths within 2 seconds under sensor traffic changes.</li>
                </ul>
              </div>

              {/* Subsection 3: ResumeAI NLP pipeline constraints */}
              <div className="border-t border-slate-800/80 pt-6 space-y-3.5">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-pink-950/10 border border-pink-500/20 text-pink-450 font-bold uppercase tracking-wider select-none leading-none">resumeai cognitive algorithm</span>
                <h4 className="text-base font-bold text-slate-200">
                  T5 Text Sequence Encoders & Custom Vector Recalls
                </h4>
                <p className="text-xs leading-relaxed text-slate-355 text-justify">
                  In NLP indexing, text embeddings represent semantic intentions inside high-dimension vector spaces. Traditional LLMs are prone to text boundaries decay, leading to hallucinated claims (e.g. associating skills to unrelated temporal records).
                </p>

                <p className="text-xs leading-relaxed text-slate-355 text-justify">
                  To prevent token expansion and keep computational performance at sub-300ms cycle times, we enforce strict anti-hallucination verification parameters:
                </p>
                <ul className="list-decimal pl-5 text-xs text-slate-355 space-y-1.5 leading-relaxed">
                  <li><strong>Semantic Embedding</strong>: Generates 512-dimension vector mappings of structural query strings using localized HuggingFace T5 encoders.</li>
                  <li><strong>Discrete Retrieval Matcher</strong>: Extracts factual paragraphs based on Lucene indices, scoring candidate paragraphs using TF-IDF matching to isolate unrelated text blocks.</li>
                  <li><strong>Anti-Hallucination Sequence verification</strong>: Analyzes exact temporal structures of documents to prune irrelevant chunks, ensuring the generated claims match verifiable records.</li>
                </ul>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// Minimal helper wrapper icons to avoid missing definitions
function NetworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M12 8v8" />
      <path d="M12 11H5v5" />
      <path d="M12 11h7v5" />
    </svg>
  );
}

