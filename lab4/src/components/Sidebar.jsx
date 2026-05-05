import React from 'react'
import { useResume } from '../context/ResumeContext.jsx'

const sections = [
  {
    id: 'personal', label: 'Personal Info', desc: 'Contact & summary',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  },
  {
    id: 'experience', label: 'Experience', desc: 'Work history',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  {
    id: 'education', label: 'Education', desc: 'Degrees & courses',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
  },
  {
    id: 'projects', label: 'Projects', desc: 'Portfolio & work',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  },
  {
    id: 'skills', label: 'Skills', desc: 'Technical & soft skills',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
]

const templates = [
  { id: 'premium',    label: 'Premium',    icon: '✨' },
  { id: 'minimal',    label: 'Minimal',    icon: '◻' },
  { id: 'executive',  label: 'Executive',  icon: '🏛' },
  { id: 'creative',   label: 'Creative',   icon: '🎨' },
  { id: 'tech',       label: 'Tech',       icon: '💻' },
  { id: 'elegant',    label: 'Elegant',    icon: '🌿' },
  { id: 'bold',       label: 'Bold',       icon: '⚡' },
]

export default function Sidebar() {
  const { activeSection, setActiveSection, resumeData, activeTemplate, setActiveTemplate } = useResume()

  const getSectionStatus = (id) => {
    switch (id) {
      case 'personal':   return resumeData.personal.name ? 'complete' : 'empty'
      case 'experience': return resumeData.experience.length > 0 ? 'complete' : 'empty'
      case 'education':  return resumeData.education.length > 0 ? 'complete' : 'empty'
      case 'projects':   return resumeData.projects.length > 0 ? 'complete' : 'empty'
      case 'skills':     return resumeData.skills.length > 0 ? 'complete' : 'empty'
      default: return 'empty'
    }
  }

  return (
    <aside className="w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-y-auto flex-shrink-0">
      <div className="p-3 flex-1">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">Sections</p>
        <nav className="space-y-1">
          {sections.map(section => {
            const isActive = activeSection === section.id
            const status = getSectionStatus(section.id)
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? 'text-brand-600 dark:text-brand-400' : ''}`}>{section.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{section.label}</p>
                  <p className={`text-xs truncate ${isActive ? 'text-brand-500/70 dark:text-brand-400/70' : 'text-gray-400'}`}>{section.desc}</p>
                </div>
                {status === 'complete' && <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">Template</p>
        <div className="space-y-1">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-sm transition-all ${
                activeTemplate === t.id
                  ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
              {activeTemplate === t.id && (
                <span className="ml-auto">
                  <svg className="w-3.5 h-3.5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
