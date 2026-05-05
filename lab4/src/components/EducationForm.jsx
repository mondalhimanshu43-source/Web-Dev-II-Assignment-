import React, { useState } from 'react'
import { useResume } from '../context/ResumeContext.jsx'

const emptyEdu = { degree: '', institution: '', field: '', startYear: '', endYear: '', current: false, gpa: '', description: '' }

function EduCard({ edu, onEdit, onDelete }) {
  return (
    <div className="card p-4 group hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{edu.degree}</h4>
            {edu.current && (
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium flex-shrink-0">Current</span>
            )}
          </div>
          <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">{edu.institution}</p>
          {edu.field && <p className="text-xs text-gray-400 mt-0.5">{edu.field}</p>}
          <div className="flex items-center gap-3 mt-1">
            <p className="text-xs text-gray-400">{edu.startYear} — {edu.current ? 'Present' : edu.endYear}</p>
            {edu.gpa && <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button onClick={() => onEdit(edu)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={() => onDelete(edu.id)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResume()
  const [form, setForm] = useState(emptyEdu)
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
    if (!form.degree.trim()) errs.degree = 'Degree is required'
    if (!form.institution.trim()) errs.institution = 'Institution is required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    if (editingId) { updateEducation(editingId, form); setEditingId(null) }
    else addEducation(form)
    setForm(emptyEdu); setShowForm(false); setErrors({})
  }

  const handleEdit = (edu) => { setForm({ ...edu }); setEditingId(edu.id); setShowForm(true) }
  const handleCancel = () => { setForm(emptyEdu); setEditingId(null); setShowForm(false); setErrors({}) }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title mb-1">Education</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{resumeData.education.length} qualification{resumeData.education.length !== 1 ? 's' : ''} added</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add
          </button>
        )}
      </div>

      {resumeData.education.length > 0 && (
        <div className="space-y-3 mb-5">
          {resumeData.education.map(edu => (
            <EduCard key={edu.id} edu={edu} onEdit={handleEdit} onDelete={deleteEducation} />
          ))}
        </div>
      )}

      {resumeData.education.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-2xl mb-3">🎓</div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No education added yet</p>
          <p className="text-xs text-gray-400 mt-1">Click "Add" to get started</p>
        </div>
      )}

      {showForm && (
        <div className="card p-5 animate-slide-up">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">{editingId ? '✏️ Edit Education' : '➕ New Education'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Degree / Qualification *</label>
                <input name="degree" value={form.degree} onChange={handleChange}
                  placeholder="Bachelor of Science" className={`form-input ${errors.degree ? 'border-red-400' : ''}`} />
                {errors.degree && <p className="text-xs text-red-500 mt-1">{errors.degree}</p>}
              </div>
              <div>
                <label className="form-label">Institution *</label>
                <input name="institution" value={form.institution} onChange={handleChange}
                  placeholder="MIT" className={`form-input ${errors.institution ? 'border-red-400' : ''}`} />
                {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Field of Study</label>
                <input name="field" value={form.field} onChange={handleChange}
                  placeholder="Computer Science" className="form-input" />
              </div>
              <div>
                <label className="form-label">GPA (optional)</label>
                <input name="gpa" value={form.gpa} onChange={handleChange}
                  placeholder="3.8 / 4.0" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Year</label>
                <input type="number" name="startYear" value={form.startYear} onChange={handleChange}
                  placeholder="2018" min="1950" max="2030" className="form-input" />
              </div>
              <div>
                <label className="form-label">End Year</label>
                <input type="number" name="endYear" value={form.endYear} onChange={handleChange}
                  placeholder="2022" min="1950" max="2030" disabled={form.current} className="form-input disabled:opacity-50" />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="current" checked={form.current} onChange={handleChange}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Currently studying here</span>
            </label>

            <div>
              <label className="form-label">Additional Details</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Honors, thesis, relevant coursework, achievements..."
                rows={3} className="form-input resize-none" />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={handleSubmit} className="btn-primary">{editingId ? 'Update' : 'Save'} Education</button>
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
