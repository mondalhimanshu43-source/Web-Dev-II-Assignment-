import React, { useState } from 'react'
import { useResume } from '../context/ResumeContext.jsx'

const emptyProject = { name: '', role: '', url: '', tech: '', startDate: '', endDate: '', ongoing: false, description: '' }

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="card p-4 group hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{project.name}</h4>
            {project.ongoing && (
              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-medium flex-shrink-0">Ongoing</span>
            )}
          </div>
          {project.role && <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">{project.role}</p>}
          {project.tech && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {project.tech.split(',').map((t, i) => (
                <span key={i} className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded font-mono">{t.trim()}</span>
              ))}
            </div>
          )}
          {project.url && <p className="text-xs text-blue-500 mt-1 truncate">{project.url}</p>}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button onClick={() => onEdit(project)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={() => onDelete(project.id)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, deleteProject } = useResume()
  const [form, setForm] = useState(emptyProject)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Project name is required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    if (editingId) { updateProject(editingId, form); setEditingId(null) }
    else addProject(form)
    setForm(emptyProject); setShowForm(false); setErrors({})
  }

  const handleEdit = (project) => { setForm({ ...project }); setEditingId(project.id); setShowForm(true) }
  const handleCancel = () => { setForm(emptyProject); setEditingId(null); setShowForm(false); setErrors({}) }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title mb-1">Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{resumeData.projects.length} project{resumeData.projects.length !== 1 ? 's' : ''} added</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add
          </button>
        )}
      </div>

      {resumeData.projects.length > 0 && (
        <div className="space-y-3 mb-5">
          {resumeData.projects.map(project => (
            <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={deleteProject} />
          ))}
        </div>
      )}

      {resumeData.projects.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-2xl mb-3">💡</div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No projects added yet</p>
          <p className="text-xs text-gray-400 mt-1">Showcase your best work</p>
        </div>
      )}

      {showForm && (
        <div className="card p-5 animate-slide-up">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">{editingId ? '✏️ Edit Project' : '➕ New Project'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Project Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="My Awesome App" className={`form-input ${errors.name ? 'border-red-400' : ''}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="form-label">Your Role</label>
                <input name="role" value={form.role} onChange={handleChange}
                  placeholder="Lead Developer" className="form-input" />
              </div>
            </div>

            <div>
              <label className="form-label">Technologies Used</label>
              <input name="tech" value={form.tech} onChange={handleChange}
                placeholder="React, Node.js, PostgreSQL, Docker" className="form-input" />
              <p className="text-xs text-gray-400 mt-1">Separate with commas</p>
            </div>

            <div>
              <label className="form-label">Project URL / GitHub</label>
              <input name="url" value={form.url} onChange={handleChange}
                placeholder="https://github.com/user/project" className="form-input" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Date</label>
                <input type="month" name="startDate" value={form.startDate} onChange={handleChange} className="form-input" />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input type="month" name="endDate" value={form.endDate} onChange={handleChange}
                  disabled={form.ongoing} className="form-input disabled:opacity-50" />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="ongoing" checked={form.ongoing} onChange={handleChange}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4" />
              <span className="text-sm text-gray-600 dark:text-gray-400">This is an ongoing project</span>
            </label>

            <div>
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="What does this project do? What problem does it solve? What was your impact?"
                rows={4} className="form-input resize-none" />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={handleSubmit} className="btn-primary">{editingId ? 'Update' : 'Save'} Project</button>
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
