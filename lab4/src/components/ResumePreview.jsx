import React, { useState } from 'react'
import { useResume } from '../context/ResumeContext.jsx'
import PremiumTemplate from '../templates/PremiumTemplate.jsx'
import MinimalTemplate from '../templates/MinimalTemplate.jsx'
import ExecutiveTemplate from '../templates/ExecutiveTemplate.jsx'
import CreativeTemplate from '../templates/CreativeTemplate.jsx'
import TechTemplate from '../templates/TechTemplate.jsx'
import ElegantTemplate from '../templates/ElegantTemplate.jsx'
import BoldTemplate from '../templates/BoldTemplate.jsx'
import { saveResume } from '../services/api.js'

const TEMPLATE_MAP = {
  premium:   PremiumTemplate,
  minimal:   MinimalTemplate,
  executive: ExecutiveTemplate,
  creative:  CreativeTemplate,
  tech:      TechTemplate,
  elegant:   ElegantTemplate,
  bold:      BoldTemplate,
}

const TEMPLATE_LABELS = {
  premium:   '✨ Premium',
  minimal:   '◻ Minimal',
  executive: '🏛 Executive',
  creative:  '🎨 Creative',
  tech:      '💻 Tech',
  elegant:   '🌿 Elegant',
  bold:      '⚡ Bold',
}

export default function ResumePreview() {
  const { resumeData, activeTemplate } = useResume()
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [exporting, setExporting] = useState(false)

  const TemplateComponent = TEMPLATE_MAP[activeTemplate] || PremiumTemplate

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const element = document.getElementById('resume-preview')
      if (!element) { setExporting(false); return }
      const html2pdf = (await import('html2pdf.js')).default
      const opt = {
        margin: 0,
        filename: `${resumeData.personal.name || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }
      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('PDF export failed:', err)
    }
    setExporting(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMsg('')
    try {
      await saveResume(resumeData)
      setSaveMsg('✓ Saved!')
    } catch {
      setSaveMsg('⚠ Save failed')
    }
    setSaving(false)
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const isEmpty = !resumeData.personal.name && !resumeData.personal.email

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Live Preview</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full font-medium">
            {TEMPLATE_LABELS[activeTemplate] || activeTemplate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {saveMsg && (
            <span className={`text-xs font-medium ${saveMsg.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>{saveMsg}</span>
          )}
          <button onClick={handleSave} disabled={saving} className="btn-secondary text-xs px-3 py-1.5">
            {saving ? '...' : '💾 Save'}
          </button>
          <button onClick={handleExportPDF} disabled={exporting || isEmpty} className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50">
            {exporting ? 'Exporting...' : '📄 Export PDF'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 flex justify-center">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-4xl mb-4">📋</div>
            <h3 className="font-display text-lg font-bold text-gray-400 dark:text-gray-500 mb-2">Your resume will appear here</h3>
            <p className="text-sm text-gray-400 max-w-xs">Start filling out the form on the left to see a live preview.</p>
          </div>
        ) : (
          <div id="resume-preview" className="w-full max-w-2xl shadow-2xl overflow-hidden">
            <TemplateComponent data={resumeData} />
          </div>
        )}
      </div>
    </div>
  )
}

