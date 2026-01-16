import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Code, Layers, Zap } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import ProjectCard from '../components/ProjectCard';
import { getProjects, getCategories } from '../services/dataService';
import { SKILLS, SOCIAL_LINKS } from '../constants';
import { Project } from '../types';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const data = getProjects();
    // Sort by order
    const sortedData = data.sort((a, b) => (a.order || 99) - (b.order || 99));
    setProjects(sortedData);
    setFilteredProjects(sortedData);
    
    // Get managed categories
    const storedCats = getCategories();
    setCategories(['All', ...storedCats]);
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  }, [filter, projects]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 overflow-hidden">
        <Hero3D />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-7xl sm:text-8xl md:text-[10vw] lg:text-[12vw] leading-none md:leading-[0.85] font-light tracking-tighter text-white mix-blend-exclusion">
                HADI<br/>
                HANNAWI
              </h1>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 md:mt-24 gap-8 md:gap-12"
            >
                <div className="max-w-xl">
                    <p className="text-lg md:text-2xl text-neutral-300 font-light leading-snug mb-8">
                        Creative Developer crafting digital experiences with minimal design and robust engineering.
                    </p>
                    
                    {/* Hero Stats */}
                    <div className="grid grid-cols-3 gap-8 border-t border-neutral-800 pt-8">
                        <div>
                            <span className="block text-3xl font-bold text-white mb-1">5</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-widest">Production Projects</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-bold text-white mb-1">15+</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-widest">Technologies</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-bold text-white mb-1">100%</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-widest">Code Quality</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-8">
                    <button 
                        onClick={scrollToProjects}
                        className="group flex items-center gap-2 text-white hover:text-neutral-400 transition-colors cursor-pointer"
                    >
                        <span className="uppercase tracking-widest text-sm font-medium">See Work</span>
                        <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 md:mb-24 gap-8 border-b border-neutral-900 pb-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">Selected Work</h2>
            
            {/* Minimal Filters */}
            <div className="flex gap-6 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
                            filter === cat 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 border-b border-purple-400 pb-1 font-bold' 
                            : 'text-neutral-600 hover:text-neutral-400'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
                 <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-8">About Me</h2>
            </div>
            <div className="md:col-span-8">
                <p className="text-3xl md:text-5xl font-light leading-tight mb-12 text-neutral-200 text-balance">
                    I believe in the power of simplicity. My goal is to remove the noise and focus on what truly matters: functionality, performance, and aesthetic clarity.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-16 md:mt-24">
                    {SKILLS.map((skillGroup, idx) => (
                        <div key={skillGroup.category}>
                            <div className="mb-6 text-purple-400">
                                {idx === 0 && <Code size={24} />}
                                {idx === 1 && <Zap size={24} />}
                                {idx === 2 && <Layers size={24} />}
                            </div>
                            <h4 className="text-xs text-white uppercase tracking-widest mb-6 font-bold">{skillGroup.category}</h4>
                            <ul className="space-y-3">
                                {skillGroup.items.map(item => (
                                    <li key={item} className="text-neutral-400 font-light text-sm md:text-base hover:text-white transition-colors cursor-default">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-8xl font-light leading-none text-white mb-8">
                  LET'S<br/>TALK
              </h2>
              <div className="flex flex-col gap-6 mt-12">
                 <a
                  href={SOCIAL_LINKS.find(l => l.platform === 'LinkedIn')?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg md:text-xl hover:text-neutral-400 transition-colors flex items-center gap-3 w-fit"
                  >
                  LinkedIn <ArrowRight size={20} className="-rotate-45" />
                  </a>
                  <a
                  href={SOCIAL_LINKS.find(l => l.platform === 'Email')?.url}
                  className="text-lg md:text-xl hover:text-neutral-400 transition-colors flex items-center gap-3 w-fit"
                  >
                  Email <ArrowRight size={20} className="-rotate-45" />
                  </a>
              </div>
            </div>

            <div className="bg-neutral-900/50 p-6 md:p-12 border border-neutral-900">
              <form 
                action="https://formsubmit.co/hadi.hennawi2005@gmail.com" 
                method="POST"
                className="space-y-8"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />

                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-500">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:border-white outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-500">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:border-white outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-500">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4}
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:border-white outline-none transition-colors resize-none"
                    placeholder="Tell me about your project"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors mt-4"
                >
                  Send Message
                </button>
              </form>
            </div>
        </div>
      </section>
      
      <footer className="py-8 px-6 md:px-12 border-t border-neutral-900 bg-black">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center max-w-7xl mx-auto">
            <span className="text-xs text-neutral-600 uppercase tracking-widest">Hadi Hannawi © {new Date().getFullYear()}</span>
            <span className="text-xs text-neutral-600 uppercase tracking-widest">Montreal, QC</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;