import React, { useState, useEffect } from 'react';
import { getProjects, saveProject, saveAllProjects, deleteProject, getCategories, saveCategories } from '../services/dataService';
import { Project } from '../types';
import { ADMIN_PIN } from '../constants';
import { Plus, Trash2, Edit2, Save, X, LogOut, Upload, Settings, ChevronLeft, ChevronRight, Download, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  
  const [activeTab, setActiveTab] = useState<'projects' | 'categories' | 'export'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getProjects());
      setCategories(getCategories());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect PIN');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const reader = new FileReader();
      reader.onloadend = () => {
         setEditingProject({...editingProject, imageUrl: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    const newProject: Project = {
      id: editingProject.id || Date.now().toString(),
      title: editingProject.title || '',
      description: editingProject.description || '',
      category: editingProject.category || categories[0] || 'Web',
      imageUrl: editingProject.imageUrl || 'https://picsum.photos/800/600',
      technologies: typeof editingProject.technologies === 'string' 
        ? (editingProject.technologies as string).split(',').map((t: string) => t.trim()) 
        : editingProject.technologies || [],
      liveUrl: editingProject.liveUrl || '',
      repoUrl: editingProject.repoUrl || '',
      featured: editingProject.featured || false,
    };

    saveProject(newProject);
    setProjects(getProjects());
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Delete this project?')) {
      deleteProject(id);
      setProjects(getProjects());
    }
  };

  const handleMoveProject = (index: number, direction: 'left' | 'right') => {
    const newProjects = [...projects];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newProjects.length) return;

    [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
    
    setProjects(newProjects);
    saveAllProjects(newProjects);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
        const updated = [...categories, newCategory];
        setCategories(updated);
        saveCategories(updated);
        setNewCategory('');
    }
  };

  const handleDeleteCategory = (cat: string) => {
      if (window.confirm(`Delete filter category "${cat}"?`)) {
        const updated = categories.filter(c => c !== cat);
        setCategories(updated);
        saveCategories(updated);
      }
  };

  const handleExportData = () => {
    const dataString = JSON.stringify(projects, null, 2);
    navigator.clipboard.writeText(dataString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-light text-white mb-8 text-center uppercase tracking-widest">Admin</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-transparent border-b border-neutral-800 py-3 text-center text-white focus:border-white outline-none transition-colors text-2xl tracking-widest"
              placeholder="PIN"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-4 hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm"
            >
              Enter
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-neutral-500 hover:text-white mt-4 text-xs uppercase tracking-widest"
            >
              Back to Portfolio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 md:p-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-neutral-900 pb-8 gap-6">
          <div className="flex gap-4 md:gap-8 overflow-x-auto w-full md:w-auto">
            <button 
                onClick={() => setActiveTab('projects')}
                className={`text-lg md:text-2xl font-light uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'projects' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
            >
                Projects
            </button>
            <button 
                onClick={() => setActiveTab('categories')}
                className={`text-lg md:text-2xl font-light uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'categories' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
            >
                Filters
            </button>
             <button 
                onClick={() => setActiveTab('export')}
                className={`text-lg md:text-2xl font-light uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'export' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
            >
                Deployment
            </button>
          </div>

          <div className="flex gap-6 w-full md:w-auto justify-end">
             <button
              onClick={() => navigate('/')}
              className="text-xs md:text-sm text-neutral-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              View Site
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs md:text-sm text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
            >
              Logout
            </button>
          </div>
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <>
            {editingProject ? (
              <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-light text-white">
                    {editingProject.id ? 'Edit Project' : 'New Project'}
                  </h2>
                  <button onClick={() => setEditingProject(null)} className="text-neutral-500 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-neutral-500 mb-2 text-xs uppercase tracking-widest">Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                      className="w-full bg-neutral-900 border-none rounded-none p-4 text-white placeholder-neutral-700 focus:ring-1 focus:ring-white outline-none"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-neutral-500 mb-2 text-xs uppercase tracking-widest">Category</label>
                    <select
                      required
                      value={editingProject.category || ''}
                      onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                      className="w-full bg-neutral-900 border-none rounded-none p-4 text-white focus:ring-1 focus:ring-white outline-none appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Select a filter</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-neutral-500 mb-2 text-xs uppercase tracking-widest">Description</label>
                    <textarea
                      required
                      rows={4}
                      value={editingProject.description || ''}
                      onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                      className="w-full bg-neutral-900 border-none rounded-none p-4 text-white placeholder-neutral-700 focus:ring-1 focus:ring-white outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-neutral-500 mb-2 text-xs uppercase tracking-widest">Image</label>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                             <div className="relative overflow-hidden group">
                                <button type="button" className="px-4 py-3 bg-neutral-800 text-white text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-700">
                                    <Upload size={16} /> Upload Image
                                </button>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                             </div>
                             <span className="text-neutral-500 text-xs">OR enter URL below</span>
                        </div>
                        
                        <input
                        type="text"
                        value={editingProject.imageUrl || ''}
                        onChange={(e) => setEditingProject({...editingProject, imageUrl: e.target.value})}
                        className="w-full bg-neutral-900 border-none rounded-none p-4 text-white placeholder-neutral-700 focus:ring-1 focus:ring-white outline-none"
                        placeholder="https://..."
                        />
                        {editingProject.imageUrl && (
                            <div className="mt-2 relative h-32 w-full bg-neutral-900">
                                <img src={editingProject.imageUrl} alt="Preview" className="h-full object-contain mx-auto" />
                            </div>
                        )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-500 mb-2 text-xs uppercase tracking-widest">Technologies</label>
                    <input
                      type="text"
                      value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''}
                      onChange={(e) => setEditingProject({...editingProject, technologies: e.target.value as any})}
                      className="w-full bg-neutral-900 border-none rounded-none p-4 text-white placeholder-neutral-700 focus:ring-1 focus:ring-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-500 mb-2 text-xs uppercase tracking-widest">Live URL</label>
                    <input
                      type="text"
                      value={editingProject.liveUrl || ''}
                      onChange={(e) => setEditingProject({...editingProject, liveUrl: e.target.value})}
                      className="w-full bg-neutral-900 border-none rounded-none p-4 text-white placeholder-neutral-700 focus:ring-1 focus:ring-white outline-none"
                    />
                  </div>

                  <div className="col-span-2 flex justify-end gap-6 mt-8">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-neutral-500 hover:text-white uppercase tracking-widest text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <button
                    onClick={() => setEditingProject({})}
                    className="h-64 border border-dashed border-neutral-800 flex flex-col items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-600 transition-colors group"
                  >
                    <Plus size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="uppercase tracking-widest text-sm">Add New Project</span>
                  </button>

                  {projects.map((project, index) => (
                    <div key={project.id} className="bg-neutral-900 group relative aspect-[4/3]">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Move Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleMoveProject(index, 'left'); }}
                            disabled={index === 0}
                            className="p-2 bg-neutral-950/80 text-white hover:bg-white hover:text-black rounded-full transition-colors disabled:opacity-0"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleMoveProject(index, 'right'); }}
                            disabled={index === projects.length - 1}
                            className="p-2 bg-neutral-950/80 text-white hover:bg-white hover:text-black rounded-full transition-colors disabled:opacity-0"
                        >
                            <ChevronRight size={16} />
                        </button>
                      </div>

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <h3 className="text-xl text-white font-medium mb-1">{project.title}</h3>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest mb-6">{project.category}</p>
                        
                        <div className="flex gap-4">
                            <button
                            onClick={() => setEditingProject(project)}
                            className="text-white hover:underline uppercase text-xs tracking-widest"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-500 hover:underline uppercase text-xs tracking-widest"
                            >
                            Delete
                            </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
             <div className="max-w-2xl mx-auto">
                 <form onSubmit={handleAddCategory} className="flex gap-4 mb-12">
                     <input 
                        type="text" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Filter Name"
                        className="flex-grow bg-neutral-900 border-none p-4 text-white placeholder-neutral-600 focus:ring-1 focus:ring-white outline-none"
                     />
                     <button type="submit" className="px-8 bg-white text-black uppercase tracking-widest text-sm font-bold hover:bg-neutral-200">
                         Add
                     </button>
                 </form>

                 <div className="space-y-2">
                     {categories.map(cat => (
                         <div key={cat} className="flex justify-between items-center p-4 bg-neutral-900 border border-neutral-800">
                             <span className="text-white font-light">{cat}</span>
                             <button 
                                onClick={() => handleDeleteCategory(cat)}
                                className="text-neutral-500 hover:text-red-500 transition-colors"
                             >
                                 <Trash2 size={18} />
                             </button>
                         </div>
                     ))}
                     {categories.length === 0 && (
                         <p className="text-neutral-600 text-center py-8">No filters defined.</p>
                     )}
                 </div>
             </div>
        )}

        {/* EXPORT TAB */}
        {activeTab === 'export' && (
             <div className="max-w-2xl mx-auto">
                 <div className="bg-neutral-900 p-8 border border-neutral-800">
                    <h3 className="text-white text-lg font-medium mb-4">Deployment Data</h3>
                    <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                        Since this is a static site without a backend database, changes made here are saved only to your browser's local storage. 
                        To persist these changes for all users on your deployed site, follow these steps:
                    </p>
                    
                    <ol className="list-decimal list-inside text-neutral-300 space-y-3 mb-8 text-sm">
                        <li>Make your changes in the <strong>Projects</strong> tab.</li>
                        <li>Click the button below to copy the JSON data.</li>
                        <li>Open your <code>constants.ts</code> file in your code editor.</li>
                        <li>Replace the value of <code>INITIAL_PROJECTS</code> with the copied data.</li>
                        <li>Redeploy your website.</li>
                    </ol>

                    <button 
                        onClick={handleExportData}
                        className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3"
                    >
                        {copied ? <Check size={20} /> : <Download size={20} />}
                        {copied ? 'Copied to Clipboard' : 'Copy Data to Clipboard'}
                    </button>
                 </div>
             </div>
        )}

      </div>
    </div>
  );
};

export default Admin;