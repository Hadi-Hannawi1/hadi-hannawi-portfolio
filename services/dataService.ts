import { Project } from '../types';
import { INITIAL_PROJECTS } from '../constants';

const STORAGE_KEY = 'hadi_portfolio_projects';
const STORAGE_KEY_CATS = 'hadi_portfolio_categories';

// Initialize data if empty or invalid
export const initializeData = () => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    } else {
        // Verify valid JSON
        JSON.parse(existing);
    }
  } catch (e) {
    console.error("Data corruption detected, resetting to defaults", e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  }

  try {
    const existingCats = localStorage.getItem(STORAGE_KEY_CATS);
    if (!existingCats) {
      localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(['Web App', 'AI / ML', 'Creative']));
    } else {
        JSON.parse(existingCats);
    }
  } catch (e) {
      localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(['Web App', 'AI / ML', 'Creative']));
  }
};

export const getProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  } catch (e) {
    return INITIAL_PROJECTS;
  }
};

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const saveAllProjects = (projects: Project[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const deleteProject = (id: string): void => {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const getCategories = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CATS);
    return data ? JSON.parse(data) : ['Web App', 'AI / ML', 'Creative'];
  } catch (e) {
      return ['Web App', 'AI / ML', 'Creative'];
  }
};

export const saveCategories = (categories: string[]): void => {
  localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
};

// Ensure initialization happens
initializeData();