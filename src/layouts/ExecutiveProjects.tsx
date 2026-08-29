import { motion } from 'motion/react';
import PreviewShell from '../components/previews/PreviewShell';
import HireZenoPreview from '../components/previews/HireZenoPreview';
import NextTripPreview from '../components/previews/NextTripPreview';
import UjjwalHubPreview from '../components/previews/UjjwalHubPreview';
import { ResumeData } from '../types';

interface ExecutiveProjectsProps {
  resumeData: ResumeData;
}

export default function ExecutiveProjects({ resumeData }: ExecutiveProjectsProps) {
  const projectsConsole = [
    {
      title: "NextTrip",
      subtitle: "Full-Stack AI Bus Ticket Booking Engine",
      challenge: "Ticketing reservation systems suffer from rigid pricing structures, empty seat distributions, and massive database contention under high peak-checkout queues.",
      solution: "Engineered an Express.js and PostgreSQL booking core incorporating dynamic pricing estimation based on seat inventory velocity and optimistic row-level locking.",
      architecture: "Query Input ➔ Multi-Agent Search Router ➔ Fare Estimator Heuristic ➔ Optimistic Checkouts Lock ➔ DB Ledger Write ➔ JWT Ticket Output",
      stack: ["Express.js", "Node.js", "React", "PostgreSQL", "Tailwind CSS", "Dynamic Pricing AI", "JWT"],
      impact: "Zero seat allocation collisions for 100+ concurrent checkout checkouts. Lifted seat-occupancy yield margins by 15%.",
      results: "Slashing user perceived loading lag by 40% using optimistic client state caching.",
      consoleLogs: [
        "> POST /api/v1/booking/checkout HTTP/1.1",
        "Host: api.nexttrip-ai.dev",
        "Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...",
        "",
        "[SYS] Acquiring optimistic lock for Seat_A12...",
        "[DB] LOCK TABLE bookings IN ROW SHARE MODE; - SUCCESS",
        "[AI] Calculating fare yield: demand_velocity = 4.2",
        "[AI] Pricing adjusted: Base $12.50 -> Optimized $14.35",
        "[DB] INSERT INTO bookings (id, seat, price) VALUES (924, 'A12', 14.35);",
        "Status: 200 OK | Response: { ticketId: 924, locked: true, latency: '42ms' }"
      ]
    },
    {
      title: "Ujjwal-Hub",
      subtitle: "Waste Collection & Route Optimization",
      challenge: "Static municipal route plans cause premature collections and overflowing containers, elevating fuel mileage overhead and city carbon footprints.",
      solution: "Developed an IoT telemetry dashboard tracking fill-levels with Mapbox UI overlays, optimizing multi-stop vehicles via K-Means and A* search path calculations.",
      architecture: "Sensors Fill-Levels ➔ IoT Telemetry Broker ➔ K-Means Location Clusterizer ➔ A* Pathfinding Engine ➔ Mapbox Live Driving Dashboard",
      stack: ["Node.js", "Express", "React", "Mapbox GL", "PostgreSQL", "K-Means Clustering", "Dijkstra"],
      impact: "Reduced fuel mileage overhead consumption by 35% across fleet vehicles. Telemetry data syncs under sub-200ms constraints.",
      results: "Calculates real-time multi-stop driving routes in under 2 seconds, reducing vehicle delay rates by 40%.",
      consoleLogs: [
        "> node bin/optimize_routes.js --fleet-id=alpha",
        "[IoT] Polling 48 bin telemetry sensor modules...",
        "[DATA] Bins filtered by fill_level >= 75%: 12 nodes identified",
        "[ALGO] Initializing K-Means clustering (K=3)...",
        "[ALGO] Centroids localized: C1[13.0827, 80.2707], C2[...], C3[...]",
        "[PATH] Running A* pathfinding search route solver...",
        "[PATH] Route solution computed: [C1 -> N4 -> N9 -> C2]",
        "[SYS] Routing payload dispatched to driver terminal (ID: 402)",
        "Optimization cycle completed in 1.48 seconds."
      ]
    },
    {
      title: "HireZeno 2.O",
      subtitle: "AI Recruitment & Resume Intelligence Platform",
      challenge: "Recruiters and hiring managers spend hours manually reviewing resumes, missing qualified candidates due to rigid keyword matching and inconsistent grading.",
      solution: "Architected an end-to-end Streamlit platform with PDF/DOCX OCR parsing, semantic JD-resume embeddings, and deep learning hiring probability prediction.",
      architecture: "Resume Ingest (PDF/DOCX) ➔ OCR Fallback ➔ NLP Schema Extraction ➔ Dense Embeddings Matcher ➔ Multi-ML Hiring Classifier ➔ Recruiter Analytics Dashboard",
      stack: ["Python", "Streamlit", "PyTorch", "Transformers", "NLP / OCR", "Scikit-Learn", "FastAPI", "PDF Engine"],
      impact: "Automates resume evaluation, achieving 94% ATS scoring accuracy and cutting candidate screening time by 70%.",
      results: "Ensemble ML models predict hiring suitability with 92.8% confidence and generate exportable PDF reports instantly.",
      consoleLogs: [
        "> streamlit run app.py --server.port=8501",
        "[OCR] Ingesting candidate resume: Dileep_Sai_Resume.pdf",
        "[NLP] Extracted schema: 18 skills, 4 experiences, 1 patent",
        "[ATS] Calculating ATS score benchmark: 94/100 (Grade: A+)",
        "[AI] Running semantic embedding match with JD...",
        "[AI] Match confidence: 96.4% for 'Senior AI Engineer'",
        "[ML] Ensemble classifier prediction: Hiring Probability = 92.8%",
        "[SYS] Generated executive evaluation PDF report in 240ms."
      ]
    }
  ];

  return (
    <section id="exec-projects" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div>
        <div className="text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Featured Engineering Systems
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
        </div>

        <div className="space-y-12">
          {projectsConsole.map((project, idx) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-950 border border-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-8 hover:border-amber-500/20 transition-all text-left relative overflow-hidden"
              >
                {/* Visual Glass Spotlight Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

                {/* Left Side: System Blueprint Console (7 Cols) */}
                <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                          SYSTEM #{idx + 1} • PRODUCTION DEPLOYMENT
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono font-medium">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">System Architecture Problem</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">{project.challenge}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-bold">Engineering Implementation</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">{project.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-900">
                    {project.stack.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live project apps simulation just like website A */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <PreviewShell
                    accentColor={idx === 0 ? '#38bdf8' : idx === 1 ? '#10b981' : '#06b6d4'}
                    label={idx === 0 ? 'NextTrip AI · Live' : idx === 1 ? 'Ujjwal-Hub · Live' : 'HireZeno 2.O · Live'}
                  >
                    {idx === 0 && <NextTripPreview />}
                    {idx === 1 && <UjjwalHubPreview />}
                    {idx === 2 && <HireZenoPreview />}
                  </PreviewShell>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
