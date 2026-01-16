import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface Props {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group w-full cursor-pointer"
      onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank')}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 mb-6">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
            <h3 className="text-xl md:text-2xl font-medium text-white group-hover:underline decoration-1 underline-offset-4 decoration-neutral-500 transition-all">
            {project.title}
            </h3>
            <span className="text-xs text-neutral-500 uppercase tracking-widest">{project.category}</span>
        </div>
        
        <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs text-neutral-500">
              {tech} •
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;