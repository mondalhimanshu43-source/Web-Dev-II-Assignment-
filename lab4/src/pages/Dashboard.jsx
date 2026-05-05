import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext.jsx'
import { fetchSampleProfiles } from '../services/api.js'

function StatCard({ label, value, icon, color }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, logout, theme, toggleTheme, resumeData } = useResume()
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([])
  const [profilesLoading, setProfilesLoading] = useState(true)
  const [profilesError, setProfilesError] = useState(null)

  useEffect(() => {
    setProfilesLoading(true)
    fetchSampleProfiles()
      .then(data => {
        setProfiles(data.slice(0, 3))
        setProfilesLoading(false)
      })
      .catch(err => {
        setProfilesError('Failed to load sample profiles.')
        setProfilesLoading(false)
      })
  }, [])

  const completionScore = () => {
    let score = 0
    if (resumeData.personal.name) score += 15
    if (resumeData.personal.email) score += 10
    if (resumeData.personal.summary) score += 15
    if (resumeData.experience.length > 0) score += 20
    if (resumeData.education.length > 0) score += 20
    if (resumeData.projects.length > 0) score += 10
    if (resumeData.skills.length > 0) score += 10
    return score
  }

  const score = completionScore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Nav */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">ResumeForge</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center">
                <span className="text-sm font-bold text-brand-700 dark:text-brand-300">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                {user?.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user?.name} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Your career story starts here. Let's build something great.
            </p>
          </div>
          <button onClick={() => navigate('/builder')} className="btn-primary text-base px-6 py-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Resume
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Completion Score" value={`${score}%`} icon="📊" color="bg-brand-50 dark:bg-brand-900/20" />
          <StatCard label="Experiences" value={resumeData.experience.length} icon="💼" color="bg-amber-50 dark:bg-amber-900/20" />
          <StatCard label="Education" value={resumeData.education.length} icon="🎓" color="bg-blue-50 dark:bg-blue-900/20" />
          <StatCard label="Projects" value={resumeData.projects.length} icon="🚀" color="bg-green-50 dark:bg-green-900/20" />
        </div>

        {/* Resume Progress */}
        <div className="card p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Resume Completion</h2>
            <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{score}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-5">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'Name', done: !!resumeData.personal.name },
              { label: 'Email', done: !!resumeData.personal.email },
              { label: 'Summary', done: !!resumeData.personal.summary },
              { label: 'Experience', done: resumeData.experience.length > 0 },
              { label: 'Education', done: resumeData.education.length > 0 },
              { label: 'Projects', done: resumeData.projects.length > 0 },
              { label: 'Skills', done: resumeData.skills.length > 0 },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.done
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}>
                <span>{item.done ? '✓' : '○'}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="section-title mb-5">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Edit Personal Info', icon: '👤', section: 'personal', desc: 'Name, email, location & summary' },
                { label: 'Add Experience', icon: '💼', section: 'experience', desc: 'Work history & achievements' },
                { label: 'Add Education', icon: '🎓', section: 'education', desc: 'Degrees, courses & certifications' },
                { label: 'Add Projects', icon: '🚀', section: 'projects', desc: 'Portfolio & side projects' },
                { label: 'Manage Skills', icon: '⚡', section: 'skills', desc: 'Technical & soft skills' },
              ].map((action) => (
                <button
                  key={action.section}
                  onClick={() => navigate('/builder')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 transition-all group"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-400">{action.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Sample Profiles from API */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">Sample Profiles</h2>
              <span className="text-xs text-gray-400 font-mono">via JSONPlaceholder API</span>
            </div>

            {profilesLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : profilesError ? (
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <span className="text-red-500">⚠️</span>
                <p className="text-sm text-red-600 dark:text-red-400">{profilesError}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {profiles.map(profile => (
                  <div key={profile.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {profile.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{profile.name}</p>
                      <p className="text-xs text-gray-400 truncate">{profile.email}</p>
                    </div>
                    <span className="text-xs text-gray-400 font-medium hidden sm:block">{profile.company?.name?.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
