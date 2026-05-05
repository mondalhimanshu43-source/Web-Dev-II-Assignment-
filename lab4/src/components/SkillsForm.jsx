import React, { useState } from 'react'
import { useResume } from '../context/ResumeContext.jsx'

const SUGGESTED_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'Git',
  'SQL', 'AWS', 'Docker', 'GraphQL', 'CSS', 'Figma', 'Agile', 'REST APIs'
]

export default function SkillsForm() {
  const { resumeData, addSkill, deleteSkill } = useResume()
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    addSkill(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
    if (e.key === ',') { e.preventDefault(); handleAdd() }
  }

  const addSuggested = (skill) => {
    const alreadyAdded = resumeData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    if (!alreadyAdded) addSkill(skill)
  }

  const existingNames = new Set(resumeData.skills.map(s => s.name.toLowerCase()))

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="section-title mb-1">Skills</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add technical skills, tools, and competencies.
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter..."
          className="form-input flex-1"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      {/* Current skills */}
      {resumeData.skills.length > 0 ? (
        <div className="mb-6">
          <label className="form-label mb-3">Your Skills ({resumeData.skills.length})</label>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map(skill => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-700 dark:text-brand-300 rounded-xl text-sm font-medium group"
              >
                {skill.name}
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="text-brand-400 hover:text-red-500 transition-colors ml-0.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <span className="text-3xl mb-2">⚡</span>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No skills yet</p>
          <p className="text-xs text-gray-400 mt-0.5">Type above or pick from suggestions</p>
        </div>
      )}

      {/* Suggestions */}
      <div>
        <label className="form-label mb-3">Suggested Skills</label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map(skill => {
            const added = existingNames.has(skill.toLowerCase())
            return (
              <button
                key={skill}
                onClick={() => addSuggested(skill)}
                disabled={added}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150 ${
                  added
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 cursor-not-allowed opacity-60'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20'
                }`}
              >
                {added ? '✓ ' : '+ '}{skill}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl">
        <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">
          💡 Skills Tips
        </h4>
        <ul className="space-y-1">
          {[
            'List 6–12 skills for the best ATS performance',
            'Include both hard and soft skills',
            'Match skills to the job description keywords',
          ].map((tip, i) => (
            <li key={i} className="text-xs text-amber-700 dark:text-amber-400/80 flex items-start gap-2">
              <span className="mt-0.5">•</span>{tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
