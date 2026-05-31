import { motion } from 'motion/react';
import { BookOpen, Award, Calendar, Trophy } from 'lucide-react';
import { ResumeData } from '../types';

interface ExecutiveResearchProps {
  resumeData: ResumeData;
}

export default function ExecutiveResearch({ resumeData }: ExecutiveResearchProps) {
  return (
    <section id="exec-research" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        
        {/* Left Side: Publications & Achievements Cards */}
        <div className="lg:col-span-7 space-y-10">
          
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Achievements
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
          </div>

          <div className="space-y-6">
            
            {/* Achievements list from resumeData */}
            {resumeData.achievements.map((ach, idx) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-slate-905 border border-slate-900 backdrop-blur-2xl text-left hover:border-amber-500/25 transition-all space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    System Achievement
                  </span>
                  <span>Verified Record</span>
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-350 leading-relaxed font-sans font-light">
                  {ach.description}
                </p>
              </motion.div>
            ))}

          </div>

        </div>

        {/* Right Side: Professional Credentials & Academic Certifications */}
        <div className="lg:col-span-5 space-y-10">
          
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Professional Certifications
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {resumeData.certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 text-left transition-all flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                    {cert.name}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 font-semibold uppercase">
                    <span>ISSUER: {cert.issuer}</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
