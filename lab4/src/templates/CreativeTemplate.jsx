import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y
}

const ACCENT = '#e11d74'
const ACCENT_LIGHT = '#fce7f3'

export default function CreativeTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data

  return (
    <div className="bg-white font-sans text-[12.5px] min-h-[1056px] flex">
      {/* Left rail */}
      <div className="w-[56px] flex-shrink-0 flex flex-col items-center pt-8 gap-1" style={{ background: ACCENT }}>
        {['A','B','O','U','T'].map((l,i) => (
          <span key={i} className="text-white text-[9px] font-black tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            {l}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Name header */}
        <div className="px-8 pt-8 pb-5" style={{ borderBottom: `3px solid ${ACCENT}` }}>
          <h1 className="font-black text-[28px] leading-none text-gray-900 mb-1">
            {personal.name || 'Your Name'}
          </h1>
          {personal.title && (
            <p className="text-[13px] font-bold mb-3" style={{ color: ACCENT }}>{personal.title}</p>
          )}
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {personal.email    && <span className="text-[10.5px] text-gray-500">✉ {personal.email}</span>}
            {personal.phone    && <span className="text-[10.5px] text-gray-500">☎ {personal.phone}</span>}
            {personal.location && <span className="text-[10.5px] text-gray-500">◎ {personal.location}</span>}
            {personal.website  && <span className="text-[10.5px] text-gray-500">🔗 {personal.website}</span>}
          </div>
        </div>

        {/* Two columns */}
        <div className="flex flex-1">
          {/* Main */}
          <div className="flex-1 px-8 py-6">
            {personal.summary && (
              <div className="mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: ACCENT }}>About Me</h2>
                <p className="text-gray-600 leading-relaxed">{personal.summary}</p>
              </div>
            )}

            {experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Experience</h2>
                <div className="space-y-4">
                  {experience.map(e => (
                    <div key={e.id} className="relative pl-4" style={{ borderLeft: `2px solid ${ACCENT_LIGHT}` }}>
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="font-bold text-gray-900">{e.role}</p>
                        <span className="text-[10px] text-gray-400">{fmt(e.startDate)} – {e.current ? 'Now' : fmt(e.endDate)}</span>
                      </div>
                      <p className="font-semibold text-[11.5px] mb-1" style={{ color: ACCENT }}>{e.company}</p>
                      {e.description && <p className="text-gray-500 text-[12px] leading-relaxed">{e.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Projects</h2>
                <div className="space-y-3">
                  {projects.map(p => (
                    <div key={p.id} className="p-3 rounded-lg" style={{ background: ACCENT_LIGHT }}>
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-900">{p.name}</p>
                        {p.link && <span className="text-[10px]" style={{ color: ACCENT }}>{p.link}</span>}
                      </div>
                      {p.tech && <p className="text-[10.5px] text-gray-500 italic mb-1">{p.tech}</p>}
                      {p.description && <p className="text-[12px] text-gray-600 leading-relaxed">{p.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side */}
          <div className="w-[170px] flex-shrink-0 px-5 py-6" style={{ background: '#fafafa', borderLeft: `2px solid ${ACCENT_LIGHT}` }}>
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <span key={s.id} className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-white" style={{ background: ACCENT }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Education</h2>
                <div className="space-y-4">
                  {education.map(e => (
                    <div key={e.id}>
                      <p className="font-bold text-gray-900 text-[11.5px] leading-tight">{e.degree}</p>
                      {e.field && <p className="text-[11px] text-gray-500">{e.field}</p>}
                      <p className="font-semibold text-[11px]" style={{ color: ACCENT }}>{e.school}</p>
                      <p className="text-gray-400 text-[10px]">{fmt(e.startDate)} – {e.current ? 'Present' : fmt(e.endDate)}</p>
                      {e.gpa && <p className="text-gray-400 text-[10px]">GPA {e.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
