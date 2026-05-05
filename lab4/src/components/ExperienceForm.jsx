import React, { useState } from 'react'
import { useResume } from '../context/ResumeContext.jsx'

const emptyExp = { role: '', company: '', startDate: '', endDate: '', current: false, description: '' }

function ExperienceCard({ exp, onEdit, onDelete }) {
  return (
    <div className="card p-4 group hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{exp.role}</h4>
            {exp.current && (
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium flex-shrink-0">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mb-1">{exp.company}</p>
          <p className="text-xs text-gray-400">
            {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
          </p>
          {exp.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{exp.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(exp)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 flex items-center justify-center transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(exp.id)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResume()
  const [form, setForm] = useState(emptyExp)
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
    if (!form.role.trim()) errs.role = 'Role is required'
    if (!form.company.trim()) errs.company = 'Company is required'
    if (!form.startDate) errs.startDate = 'Start date is required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    if (editingId) {
      updateExperience(editingId, form)
      setEditingId(null)
    } else {
      addExperience(form)
    }
    setForm(emptyExp)
    setShowForm(false)
    setErrors({})
  }

  const handleEdit = (exp) => {
    setForm({ ...exp })
    setEditingId(exp.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setForm(emptyExp)
    setEditingId(null)
    setShowForm(false)
    setErrors({})
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title mb-1">Work Experience</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {resumeData.experience.length} position{resumeData.experience.length !== 1 ? 's' : ''} added
          </p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        )}
      </div>

      {/* Existing experiences */}
      {resumeData.experience.length > 0 && (
        <div className="space-y-3 mb-5">
          {resumeData.experience.map(exp => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              onEdit={handleEdit}
              onDelete={deleteExperience}
            />
          ))}
        </div>
      )}

      {resumeData.experience.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-2xl mb-3">
            💼
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No experience added yet</p>
          <p className="text-xs text-gray-400 mt-1">Click "Add" to get started</p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="card p-5 animate-slide-up">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
            {editingId ? '✏️ Edit Experience' : '➕ New Experience'}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Job Title *</label>
                <input name="role" value={form.role} onChange={handleChange}
                  placeholder="Software Engineer" className={`form-input ${errors.role ? 'border-red-400' : ''}`} />
                {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
              </div>
              <div>
                <label className="form-label">Company *</label>
                <input name="company" value={form.company} onChange={handleChange}
                  placeholder="Acme Corp" className={`form-input ${errors.company ? 'border-red-400' : ''}`} />
                {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Date *</label>
                <input type="month" name="startDate" value={form.startDate} onChange={handleChange}
                  className={`form-input ${errors.startDate ? 'border-red-400' : ''}`} />
                {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input type="month" name="endDate" value={form.endDate} onChange={handleChange}
                  disabled={form.current} className="form-input disabled:opacity-50" />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="current" checked={form.current} onChange={handleChange}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4" />
              <span className="text-sm text-gray-600 dark:text-gray-400">I currently work here</span>
            </label>

            <div>
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe your responsibilities, achievements, and key contributions..."
                rows={4} className="form-input resize-none" />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={handleSubmit} className="btn-primary">
                {editingId ? 'Update' : 'Save'} Experience
              </button>
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
