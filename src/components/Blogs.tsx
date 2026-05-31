import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { ThemeStyle, Blog } from '../types';

interface BlogsProps {
  blogs?: Blog[];
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Blogs({ blogs = [], theme, customOverlayColor }: BlogsProps) {
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const list = blogs && blogs.length > 0 ? blogs : [];

  const textHeaderColor = isTerminal
    ? 'text-green-300 font-mono'
    : isSynth
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold'
    : 'text-white font-extrabold';

  const cardStyles = isTerminal
    ? 'border border-green-500/10 bg-black/80 hover:border-green-500 rounded-lg p-5 flex flex-col justify-between text-left h-full transition-all'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between text-left h-full shadow-[0_0_15px_rgba(236,72,153,0.03)] hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:border-pink-500/40 hover:-translate-y-1.5 transition-all duration-300 group'
    : isMinimal
    ? 'border border-slate-800 bg-[#0a0f1d] hover:border-slate-600 rounded-xl p-6 flex flex-col justify-between text-left h-full transition-all'
    : 'border border-slate-805/85 bg-slate-905/45 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between text-left h-full hover:-translate-y-1.5 hover:border-sky-500/35 transition-all duration-300 group';

  return (
    <section id="blogs" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-left mb-12">
        <span className={`text-[11px] font-bold uppercase tracking-widest block ${isTerminal ? 'text-green-500' : isSynth ? 'text-pink-400' : 'text-slate-500'}`}>
          {isTerminal ? '> COMPILE ARTICLES: EXPORT' : 'KNOWLEDGE BASE & ARTICLES'}
        </span>
        <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${textHeaderColor}`}>
          {isTerminal ? '_ls blogs/technical/' : 'Engineering Blogs'}
        </h2>
        <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((blog, idx) => (
          <motion.article
            key={blog.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="h-full"
          >
            <div className={cardStyles}>
              <div>
                {/* Meta details header */}
                <div className="flex items-center justify-between gap-3 text-[10px] font-bold font-mono text-slate-500 mb-3 border-b border-white/5 pb-2.5">
                  <span className={`text-[11px] ${isTerminal ? 'text-green-400' : isSynth ? 'text-pink-400' : 'text-sky-400'}`}
                    style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                  >
                    {blog.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-base font-extrabold text-slate-100 leading-snug group-hover:text-white ${isTerminal ? 'font-mono text-green-300' : ''}`}>
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className={`text-xs text-slate-400 leading-relaxed mt-3.5 ${isTerminal ? 'text-green-400/80' : ''}`}>
                  {blog.excerpt}
                </p>
              </div>

              {/* Tags and read line */}
              <div className="mt-6 pt-4.5 border-t border-white/5 space-y-3.5">
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map(t => (
                    <span 
                      key={t}
                      className={`text-[9.5px] p-0.5 px-2 rounded font-semibold font-mono ${
                        isTerminal 
                          ? 'bg-green-500/5 text-green-400/80 border border-green-500/10' 
                          : isSynth 
                          ? 'bg-purple-950/70 text-cyan-400/90' 
                          : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      #{t.toLowerCase()}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => alert(`Redirecting simulation... You can read "${blog.title}" on Dileep's Medium or Dev.to page.`)}
                  className={`text-xs font-bold font-mono tracking-wider flex items-center gap-1 transition-all p-1 cursor-pointer hover:underline ${
                    isTerminal ? 'text-yellow-400' : isSynth ? 'text-pink-400 text-glow' : 'text-sky-400'
                  }`}
                  style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                >
                  <span>READ_FULL_ARTICLE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
