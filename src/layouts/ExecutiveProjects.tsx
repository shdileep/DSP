import { motion } from 'motion/react';
import PreviewShell from '../components/previews/PreviewShell';
import FitMitraPreview from '../components/previews/FitMitraPreview';
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
      title: "FitMitra",
      subtitle: "ML-Based Android Fitness Application",
      challenge: "Generic fitness applications lack personalized biometric calculations, resulting in misaligned meal allocations and high user churn rates.",
      solution: "Built a Kotlin Android client utilizing local on-device TensorFlow Lite classifiers and a PyTorch microservice to compute biometric calories and BMR.",
      architecture: "Kotlin Mobile App ➔ PyTorch BMR Allocator ➔ On-Device TF Lite Classifier ➔ YouTube API Video Recommender ➔ SQLite Database syncs",
      stack: ["Android SDK", "Kotlin", "Flask", "PyTorch", "TensorFlow Lite", "K-Means", "MySQL", "JWT"],
      impact: "Returns personalized meal and caloric guidelines under 150ms. Secured client endpoints via OAuth2 and rotating dual-token JWT keys.",
      results: "Hit an 82% target planning accuracy benchmark on exercise classifiers and body mass predictions.",
      consoleLogs: [
        "> python app/predict_biometrics.py --user-id=9021 --bmr-calc",
        "[TFLITE] Loading classifier model: pose_landmark_v2.tflite",
        "[DATA] Inputs: height=180cm, weight=75kg, body_type=athletic",
        "[AI] PyTorch BMR estimator triggered...",
        "[AI] BMR calculation: 1845.20 kcal/day | Target macro splits: P:150g, C:200g, F:65g",
        "[TFLITE] Prediction: pushup_form_alignment = 94.2% - CORRECT",
        "[SQL] Syncing session variables to SQLite local store...",
        "Calculations processed in 118ms."
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
                {/* Meta details */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:pr-6">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-[9px] font-bold uppercase tracking-wider">
                      CASE_STUDY 0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight mt-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-amber-500 font-mono mt-0.5">{project.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-350">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">The Challenge</span>
                      <p className="font-sans font-light">{project.challenge}</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500/80 font-bold block">The Solution</span>
                      <p className="font-sans font-light">{project.solution}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/35 border border-slate-900 font-mono text-[10px] text-slate-450 leading-relaxed">
                    <span className="font-bold text-slate-400 block mb-1">System Data Architecture</span>
                    <span className="text-slate-300 font-bold block">{project.architecture}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
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
                    accentColor={idx === 0 ? '#38bdf8' : idx === 1 ? '#10b981' : '#34d399'}
                    label={idx === 0 ? 'NextTrip AI · Live' : idx === 1 ? 'Ujjwal-Hub · Live' : 'FitMitra AI · Live'}
                  >
                    {idx === 0 && <NextTripPreview />}
                    {idx === 1 && <UjjwalHubPreview />}
                    {idx === 2 && <FitMitraPreview />}
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
