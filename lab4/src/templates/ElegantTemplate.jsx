import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['January','February','March','April','May','June','July','August','September','October','November','December'][+m-1] + ' ' + y
}

export default function ElegantTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data

  return (
    <div className="bg-[#faf9f7] min-h-[1056px] font-sans text-[12.5px]">
      {/* Decorative top stripe */}
      <div className="h-2" style={{ background: 'linear-gradient(90deg, #4a6741 0%, #7fa870 50%, #4a6741 100%)' }} />

      {/* Header */}
      <div className="px-12 pt-9 pb-7 text-center" style={{ borderBottom: '1px solid #d6cfc7' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4" style={{ background: '#4a6741' }}>
          {personal.name?.[0] || '?'}
        </div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-wide mb-1" style={{ fontVariant: 'small-caps', letterSpacing: '0.05em' }}>
          {personal.name || 'Your Name'}
        </h1>
        {personal.title && (
          <p className="text-[13px] font-medium mb-4" style={{ color: '#4a6741', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {personal.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[11px] text-gray-500">
          {personal.email    && <span>{personal.email}</span>}
          {personal.phone    && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website  && <span style={{ color: '#4a6741' }}>{personal.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Main */}
        <div className="flex-1 px-10 py-8">
          {personal.summary && (
            <div className="mb-7">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: '#4a6741' }}>Profile</h2>
              <p className="text-gray-600 leading-[1.8] italic">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-7">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#4a6741' }}>Experience</h2>
              <div className="space-y-5">
                {experience.map(e => (
                  <div key={e.id}>
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <p className="font-bold text-gray-900 text-[13px]">{e.role}</p>
                        <p className="text-[12px] font-medium" style={{ color: '#4a6741' }}>{e.company}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap italic">
                        {fmt(e.startDate)}{(e.startDate && (e.endDate || e.current)) ? ' — ' : ''}{e.current ? 'Present' : fmt(e.endDate)}
                      </span>
                    </div>
                    {e.description && (
                      <p className="text-gray-500 mt-2 leading-[1.8] text-[12px]">{e.description}</p>
                    )}
                    <div className="mt-3 h-px" style={{ background: '#e8e2db' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="mb-7">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#4a6741' }}>Projects</h2>
              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#7fa870' }} />
                    <div>
                      <div className="flex items-baseline gap-3">
                        <p className="font-bold text-gray-900">{p.name}</p>
                        {p.link && <span className="text-[10px] italic" style={{ color: '#4a6741' }}>{p.link}</span>}
                      </div>
                      {p.tech && <p className="text-[11px] text-gray-400 italic mb-1">{p.tech}</p>}
                      {p.description && <p className="text-[12px] text-gray-500 leading-relaxed">{p.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side */}
        <div className="w-[185px] flex-shrink-0 px-6 py-8" style={{ background: '#f0ede8', borderLeft: '1px solid #d6cfc7' }}>
          {education.length > 0 && (
            <div className="mb-7">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#4a6741' }}>Education</h2>
              <div className="space-y-4">
                {education.map(e => (
                  <div key={e.id}>
                    <p className="font-bold text-gray-900 text-[12px] leading-tight">{e.degree}</p>
                    {e.field && <p className="text-[11px] text-gray-500">{e.field}</p>}
                    <p className="font-semibold text-[11.5px]" style={{ color: '#4a6741' }}>{e.school}</p>
                    <p className="text-gray-400 text-[10px]">{e.current ? 'Present' : fmt(e.endDate)}</p>
                    {e.gpa && <p className="text-gray-400 text-[10px]">GPA {e.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#4a6741' }}>Skills</h2>
              <div className="space-y-2">
                {skills.map(s => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span style={{ color: '#7fa870' }} className="text-[10px]">◆</span>
                    <span className="text-[12px] text-gray-700">{s.name}</span>
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
