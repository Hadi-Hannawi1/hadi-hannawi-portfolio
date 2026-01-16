import { Project } from '../types';
import { INITIAL_PROJECTS } from '../constants';

// Simply return the projects defined in code
export const getProjects = (): Project[] => {
  return INITIAL_PROJECTS;
};

// Automatically derive unique categories from the existing projects
export const getCategories = (): string[] => {
  const categories = new Set(INITIAL_PROJECTS.map(p => p.category));
  return Array.from(categories);
};