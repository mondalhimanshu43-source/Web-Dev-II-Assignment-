import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-5 bg-[#b8960c] rounded-full flex-shrink-0" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1a2e]">{title}</h2>
        <div className="flex-1 h-px bg-[#e8d5a3]" />
      </div>
      {children}
    </div>
  )
}

export default function ExecutiveTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data
  return (
    <div className="bg-white font-sans text-[12.5px] min-h-[1056px]">
      {/* Header band */}
      <div className="bg-[#1a1a2e] px-10 py-8">
        <h1 className="text-[26px] font-black text-white tracking-wide uppercase mb-1">
          {personal.name || 'Your Name'}
        </h1>
        {personal.title && (
          <p className="text-[#b8960c] font-semibold text-[13px] tracking-widest uppercase mb-4">{personal.title}</p>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-gray-300">
          {personal.email    && <span>✉ {personal.email}</span>}
          {personal.phone    && <span>☎ {personal.phone}</span>}
          {personal.location && <span>◎ {personal.location}</span>}
          {personal.website  && <span>🔗 {personal.website}</span>}
        </div>
      </div>

      {/* Gold rule */}
      <div className="h-1 bg-gradient-to-r from-[#b8960c] via-[#e8d5a3] to-[#b8960c]" />

      {/* Body */}
      <div className="flex gap-0">
        {/* Main */}
        <div className="flex-1 px-8 py-7">
          {personal.summary && (
            <Section title="Executive Summary">
              <p className="text-gray-600 leading-relaxed italic">{personal.summary}</p>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Professional Experience">
              <div className="space-y-5">
                {experience.map(e => (
                  <div key={e.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-[#1a1a2e] text-[13px]">{e.role}</p>
                        <p className="text-[#b8960c] font-semibold text-[11.5px]">{e.company}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{fmt(e.startDate)} – {e.current ? 'Present' : fmt(e.endDate)}</span>
                    </div>
                    {e.description && <p className="text-gray-500 mt-1.5 leading-relaxed text-[12px]">{e.description}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Key Projects">
              <div className="space-y-3">
                {projects.map(p => (
                  <div key={p.id} className="border-l-2 border-[#e8d5a3] pl-3">
                    <div className="flex justify-between">
                      <p className="font-bold text-[#1a1a2e]">{p.name}</p>
                      {p.link && <a href={p.link} className="text-[10px] text-[#b8960c]">{p.link}</a>}
                    </div>
                    {p.tech && <p className="text-[10.5px] text-gray-400 italic mb-1">{p.tech}</p>}
                    {p.description && <p className="text-gray-500 text-[12px] leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Side */}
        <div className="w-[190px] flex-shrink-0 bg-[#f9f6ef] px-5 py-7 border-l border-[#e8d5a3]">
          {education.length > 0 && (
            <div className="mb-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#b8960c] mb-3">Education</p>
              <div className="space-y-4">
                {education.map(e => (
                  <div key={e.id}>
                    <p className="font-bold text-[#1a1a2e] text-[11.5px] leading-tight">{e.degree}</p>
                    {e.field && <p className="text-gray-500 text-[11px]">{e.field}</p>}
                    <p className="text-[#b8960c] text-[11px] font-semibold">{e.school}</p>
                    <p className="text-gray-400 text-[10px]">{fmt(e.startDate)} – {e.current ? 'Present' : fmt(e.endDate)}</p>
                    {e.gpa && <p className="text-gray-400 text-[10px]">GPA: {e.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#b8960c] mb-3">Core Skills</p>
              <div className="space-y-1.5">
                {skills.map(s => (
                  <div key={s.id} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#b8960c] rounded-full flex-shrink-0" />
                    <span className="text-[11.5px] text-gray-700">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
