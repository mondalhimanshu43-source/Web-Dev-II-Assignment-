import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext.jsx'
import Sidebar from '../components/Sidebar.jsx'
import PersonalForm from '../components/PersonalForm.jsx'
import ExperienceForm from '../components/ExperienceForm.jsx'
import EducationForm from '../components/EducationForm.jsx'
import ProjectsForm from '../components/ProjectsForm.jsx'
import SkillsForm from '../components/SkillsForm.jsx'
import ResumePreview from '../components/ResumePreview.jsx'

export default function Builder() {
  const { activeSection, theme, toggleTheme, user } = useResume()
  const navigate = useNavigate()
  const [previewMode, setPreviewMode] = useState(false)

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':   return <PersonalForm />
      case 'experience': return <ExperienceForm />
      case 'education':  return <EducationForm />
      case 'projects':   return <ProjectsForm />
      case 'skills':     return <SkillsForm />
      default:           return <PersonalForm />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-display font-bold text-gray-900 dark:text-white text-sm">Resume Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPreviewMode(!previewMode)} className="lg:hidden btn-secondary text-xs px-3 py-1.5">
              {previewMode ? '✏️ Edit' : '👁 Preview'}
            </button>
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-600">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center">
              <span className="text-xs font-bold text-brand-700 dark:text-brand-300">{user?.name?.[0]?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className={`${previewMode ? 'hidden' : 'flex'} lg:flex flex-col w-full lg:w-auto`}>
          <Sidebar />
        </div>
        <div className={`${previewMode ? 'hidden' : 'flex'} lg:flex flex-col flex-1 min-w-0 max-w-xl border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}>
          <div className="p-6 flex-1">{renderForm()}</div>
        </div>
        <div className={`${previewMode ? 'flex' : 'hidden'} lg:flex flex-col flex-1 min-w-0 overflow-y-auto bg-gray-100 dark:bg-gray-900`}>
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
