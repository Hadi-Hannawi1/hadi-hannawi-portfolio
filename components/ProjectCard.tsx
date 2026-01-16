import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, Lock, RefreshCw } from 'lucide-react';
import { Project } from '../types';

interface Props {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // --- ROBUST IMAGE LOADING STATE ---
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    setCurrentSrc(null);

    const loadImage = async () => {
        const candidates = [project.imageUrl];

        // Add extension variations
        const basePathMatch = project.imageUrl.match(/(.*)\.[^.]+$/);
        if (basePathMatch) {
            const base = basePathMatch[1];
            const exts = ['.jpg', '.png', '.jpeg', '.webp', '.JPG', '.PNG'];
            exts.forEach(ext => {
                const candidate = `${base}${ext}`;
                if (candidate !== project.imageUrl) candidates.push(candidate);
            });
        }

        for (const src of candidates) {
            if (!isMounted) return;
            try {
                await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = reject;
                });
                
                if (isMounted) {
                    setCurrentSrc(src);
                    setStatus('loaded');
                }
                return; 
            } catch (err) {
                // Continue to next candidate
            }
        }

        if (isMounted) {
            setStatus('error');
        }
    };

    loadImage();

    return () => { isMounted = false; };
  }, [project.imageUrl]);

  const handleImageClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group w-full bg-[#0a0a0a] border border-neutral-900 rounded-sm overflow-hidden hover:border-neutral-700 transition-colors flex flex-col"
    >
      {/* --- IMAGE / MEDIA SECTION --- */}
      <div 
        className="relative w-full aspect-video overflow-hidden bg-neutral-900 cursor-pointer" 
        onClick={handleImageClick}
        title={project.liveUrl ? "Visit Live Site" : "View Details"}
      >
        
        {/* 1. SUCCESS STATE */}
        {status === 'loaded' && currentSrc && (
            <img
            src={currentSrc}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
            />
        )}

        {/* 2. LOADING STATE */}
        {status === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                <RefreshCw className="animate-spin text-neutral-600" size={20} />
            </div>
        )}

        {/* 3. FALLBACK DESIGN (If image is missing) */}
        {status === 'error' && (
            <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {/* Dynamic Gradient Background based on index to give variety */}
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-purple-900 via-neutral-900 to-blue-900' :
                    index % 3 === 1 ? 'from-emerald-900 via-neutral-900 to-cyan-900' :
                    'from-rose-900 via-neutral-900 to-orange-900'
                }`} />
                
                {/* Technical Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ 
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}></div>

                {/* Fallback Content */}
                <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-105">
                    <span className="inline-block mb-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/10 rounded-full">
                        {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-white tracking-tight leading-tight max-w-[80%] mx-auto">
                        {project.title}
                    </h3>
                </div>
            </div>
        )}

        {/* Common Overlay for Loaded State */}
        {status === 'loaded' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        )}
        
        {/* Floating Category Badge (Only show if loaded, otherwise it's in the fallback center) */}
        {status === 'loaded' && (
            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                    {project.category}
                </span>
            </div>
        )}
      </div>

      {/* --- DETAILS SECTION --- */}
      <div className="p-6 flex flex-col gap-4 flex-grow relative bg-[#0a0a0a]">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
            {project.title}
            </h3>
        </div>
        
        <p className="text-neutral-400 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
             <span className="px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-900">
             <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors w-full"
             >
                {isExpanded ? 'Hide Details' : 'View Project Details'}
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
             </button>

             <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 space-y-4 text-sm">
                            {project.problem && (
                                <div>
                                    <h4 className="text-white font-medium mb-1 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-1 bg-red-500 rounded-full"></span> Problem</h4>
                                    <p className="text-neutral-400 leading-relaxed pl-3 border-l border-neutral-800">{project.problem}</p>
                                </div>
                            )}
                            {project.solution && (
                                <div>
                                    <h4 className="text-white font-medium mb-1 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Solution</h4>
                                    <p className="text-neutral-400 leading-relaxed pl-3 border-l border-neutral-800">{project.solution}</p>
                                </div>
                            )}
                            {project.results && project.results.length > 0 && (
                                <div>
                                    <h4 className="text-white font-medium mb-1 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-1 bg-green-500 rounded-full"></span> Results</h4>
                                    <ul className="text-neutral-400 pl-3 border-l border-neutral-800 space-y-1">
                                        {project.results.map((r, i) => (
                                            <li key={i}>• {r}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </div>

        <div className="flex gap-3 mt-4">
            {project.liveUrl ? (
                <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                    <ExternalLink size={14} /> Live Demo
                </a>
            ) : (
                <button disabled className="w-full py-3 bg-neutral-900 text-neutral-500 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 cursor-not-allowed">
                    <Lock size={14} /> Private
                </button>
            )}
            
            {/* Removed GitHub Button */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;