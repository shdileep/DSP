import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { ResumeData } from '../types';

interface ExecutiveEducationProps {
  resumeData: ResumeData;
}

export default function ExecutiveEducation({ resumeData }: ExecutiveEducationProps) {
  const education = resumeData.education || [];

  return (
    <section id="exec-education" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <div className="text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Academic Credentials
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/35 border border-slate-800/80 backdrop-blur-2xl text-left hover:border-amber-500/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <GraduationCap className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
                      {edu.institution}
                    </h4>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {edu.degree}
                </h3>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-400 font-mono uppercase font-semibold border-t border-slate-800/60 pt-4 mt-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {edu.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-555" />
                  {edu.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
