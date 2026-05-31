import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { ResumeData } from '../types';

interface ExecutiveExperienceProps {
  resumeData: ResumeData;
}

export default function ExecutiveExperience({ resumeData }: ExecutiveExperienceProps) {
  return (
    <section id="exec-experience" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div>
        <div className="text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Professional Experience
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
        </div>

        <div className="space-y-8">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/35 border border-slate-800/80 backdrop-blur-2xl text-left hover:border-amber-500/20 transition-all"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-500" />
                    <span>{exp.company}</span>
                  </h3>
                  <p className="text-xs text-amber-500 font-mono font-medium uppercase tracking-wider">{exp.role}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-mono uppercase font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-550" />
                    {exp.duration}
                  </span>
                  <span className="hidden sm:inline text-slate-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-555" />
                    {exp.location}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
