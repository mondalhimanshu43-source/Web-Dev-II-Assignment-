import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y
}

const GREEN = '#00ff88'
const DIM = '#8892a4'

export default function TechTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data

  return (
    <div className="min-h-[1056px] font-mono text-[12px]" style={{ background: '#0d1117', color: '#c9d1d9' }}>
      {/* Top bar */}
      <div className="px-8 py-6" style={{ borderBottom: `1px solid #21262d` }}>
        <div className="flex items-start justify-between">
          <div>
            <div style={{ color: DIM }} className="text-[11px] mb-1">// profile</div>
            <h1 className="text-[24px] font-black mb-0.5" style={{ color: GREEN }}>
              {personal.name || 'your_name'}
            </h1>
            {personal.title && (
              <p className="text-[12px]" style={{ color: '#58a6ff' }}>{personal.title}</p>
            )}
          </div>
          <div className="text-right text-[11px]" style={{ color: DIM }}>
            {personal.email    && <p>$ email <span style={{ color: '#c9d1d9' }}>{personal.email}</span></p>}
            {personal.phone    && <p>$ phone <span style={{ color: '#c9d1d9' }}>{personal.phone}</span></p>}
            {personal.location && <p>$ loc   <span style={{ color: '#c9d1d9' }}>{personal.location}</span></p>}
            {personal.website  && <p>$ web   <span style={{ color: '#58a6ff' }}>{personal.website}</span></p>}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main */}
        <div className="flex-1 px-8 py-6">
          {personal.summary && (
            <div className="mb-6">
              <div style={{ color: GREEN }} className="text-[11px] font-bold mb-2">{'>'} summary</div>
              <p style={{ color: DIM }} className="leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-6">
              <div style={{ color: GREEN }} className="text-[11px] font-bold mb-3">{'>'} experience[]</div>
              <div className="space-y-4">
                {experience.map((e, i) => (
                  <div key={e.id} className="pl-4" style={{ borderLeft: `2px solid #21262d` }}>
                    <div className="flex justify-between items-start mb-0.5">
                      <span style={{ color: '#c9d1d9' }} className="font-bold">{e.role}</span>
                      <span style={{ color: DIM }} className="text-[10px]">{fmt(e.startDate)} → {e.current ? 'now' : fmt(e.endDate)}</span>
                    </div>
                    <p style={{ color: '#58a6ff' }} className="text-[11px] mb-1">@ {e.company}</p>
                    {e.description && <p style={{ color: DIM }} className="text-[11.5px] leading-relaxed">{e.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="mb-6">
              <div style={{ color: GREEN }} className="text-[11px] font-bold mb-3">{'>'} projects[]</div>
              <div className="space-y-3">
                {projects.map(p => (
                  <div key={p.id} className="p-3 rounded" style={{ background: '#161b22', border: '1px solid #21262d' }}>
                    <div className="flex justify-between">
                      <span style={{ color: '#c9d1d9' }} className="font-bold">{p.name}</span>
                      {p.link && <span style={{ color: '#58a6ff' }} className="text-[10px]">{p.link}</span>}
                    </div>
                    {p.tech && <p className="text-[10.5px] mt-0.5 mb-1" style={{ color: GREEN }}>tech: {p.tech}</p>}
                    {p.description && <p style={{ color: DIM }} className="text-[11.5px] leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-[200px] flex-shrink-0 px-5 py-6" style={{ borderLeft: '1px solid #21262d', background: '#0a0d10' }}>
          {skills.length > 0 && (
            <div className="mb-6">
              <div style={{ color: GREEN }} className="text-[11px] font-bold mb-3">{'>'} skills[]</div>
              <div className="space-y-1">
                {skills.map(s => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span style={{ color: GREEN }} className="text-[10px]">›</span>
                    <span style={{ color: '#c9d1d9' }} className="text-[11.5px]">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div style={{ color: GREEN }} className="text-[11px] font-bold mb-3">{'>'} education[]</div>
              <div className="space-y-4">
                {education.map(e => (
                  <div key={e.id}>
                    <p style={{ color: '#c9d1d9' }} className="font-bold text-[11.5px] leading-tight">{e.degree}</p>
                    {e.field && <p style={{ color: DIM }} className="text-[11px]">{e.field}</p>}
                    <p style={{ color: '#58a6ff' }} className="text-[11px]">{e.school}</p>
                    <p style={{ color: DIM }} className="text-[10px]">{fmt(e.startDate)} – {e.current ? 'now' : fmt(e.endDate)}</p>
                    {e.gpa && <p style={{ color: DIM }} className="text-[10px]">gpa: {e.gpa}</p>}
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
