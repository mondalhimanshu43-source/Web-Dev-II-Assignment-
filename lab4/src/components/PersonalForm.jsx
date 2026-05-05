import React from 'react'
import { useResume } from '../context/ResumeContext.jsx'

function FormField({ label, name, type = 'text', placeholder, value, onChange, multiline }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className="form-input resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
        />
      )}
    </div>
  )
}

export default function PersonalForm() {
  const { resumeData, updatePersonal } = useResume()
  const { personal } = resumeData

  const handleChange = (e) => {
    updatePersonal(e.target.name, e.target.value)
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="section-title mb-1">Personal Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your basic details and professional summary.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Full Name"
            name="name"
            placeholder="Jane Doe"
            value={personal.name}
            onChange={handleChange}
          />
          <FormField
            label="Job Title"
            name="title"
            placeholder="Software Engineer"
            value={personal.title}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={personal.email}
            onChange={handleChange}
          />
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={personal.phone}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Location"
            name="location"
            placeholder="San Francisco, CA"
            value={personal.location}
            onChange={handleChange}
          />
          <FormField
            label="Website / LinkedIn"
            name="website"
            placeholder="linkedin.com/in/janedoe"
            value={personal.website}
            onChange={handleChange}
          />
        </div>

        <FormField
          label="Professional Summary"
          name="summary"
          placeholder="Write a brief, compelling summary of your professional background and goals..."
          value={personal.summary}
          onChange={handleChange}
          multiline
        />

        {/* Tips */}
        <div className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 rounded-xl">
          <h4 className="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wide mb-2">
            💡 Pro Tips
          </h4>
          <ul className="space-y-1">
            {[
              'Keep your summary under 3–4 sentences',
              'Tailor your title to match the job you\'re applying for',
              'Use a professional email address',
            ].map((tip, i) => (
              <li key={i} className="text-xs text-brand-600 dark:text-brand-400 flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
