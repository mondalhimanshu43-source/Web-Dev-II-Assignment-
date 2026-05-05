import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y
}

export default function BoldTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data

  return (
    <div className="bg-white min-h-[1056px] font-sans">
      {/* Big header block */}
      <div className="bg-[#111111] px-10 pt-10 pb-8 relative overflow-hidden">
        {/* Decorative orange blob */}
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-30" style={{ background: '#ff6b00' }} />
        <div className="absolute right-20 bottom-0 w-24 h-24 rounded-full opacity-20" style={{ background: '#ff6b00' }} />

        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ background: '#ff6b00', color: 'white' }}>
            {personal.title || 'Professional'}
          </div>
          <h1 className="text-[34px] font-black text-white leading-none mb-5 uppercase tracking-tight">
            {personal.name || 'YOUR NAME'}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[11px]" style={{ color: '#aaa' }}>
            {personal.email    && <span style={{ color: '#ff6b00' }}>✉</span>}
            {personal.email    && <span className="mr-4">{personal.email}</span>}
            {personal.phone    && <><span style={{ color: '#ff6b00' }}>☎</span><span className="mr-4">{personal.phone}</span></>}
            {personal.location && <><span style={{ color: '#ff6b00' }}>◎</span><span className="mr-4">{personal.location}</span></>}
            {personal.website  && <><span style={{ color: '#ff6b00' }}>🔗</span><span>{personal.website}</span></>}
          </div>
        </div>
      </div>

      {/* Orange accent bar */}
      <div className="h-[5px]" style={{ background: '#ff6b00' }} />

      {/* Content */}
      <div className="flex">
        {/* Main */}
        <div className="flex-1 px-8 py-8">
          {personal.summary && (
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[3px] rounded-full" style={{ background: '#ff6b00' }} />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Summary</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-[12.5px]">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[3px] rounded-full" style={{ background: '#ff6b00' }} />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Experience</h2>
              </div>
              <div className="space-y-5">
                {experience.map(e => (
                  <div key={e.id} className="flex gap-4">
                    <div className="w-[3px] rounded-full flex-shrink-0 mt-1" style={{ background: '#ff6b00', minHeight: '40px' }} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-black text-gray-900 text-[13.5px] uppercase tracking-wide">{e.role}</p>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{fmt(e.startDate)} – {e.current ? 'Now' : fmt(e.endDate)}</span>
                      </div>
                      <p className="font-bold text-[11.5px] mb-1.5" style={{ color: '#ff6b00' }}>{e.company}</p>
                      {e.description && <p className="text-[12px] text-gray-500 leading-relaxed">{e.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[3px] rounded-full" style={{ background: '#ff6b00' }} />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Projects</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {projects.map(p => (
                  <div key={p.id} className="border-2 border-gray-100 rounded-lg p-3 hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="font-black text-gray-900 text-[12.5px]">{p.name}</p>
                    </div>
                    {p.tech && <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#ff6b00' }}>{p.tech}</p>}
                    {p.link && <p className="text-[10px] text-gray-400 mb-1">{p.link}</p>}
                    {p.description && <p className="text-[11.5px] text-gray-500 leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side */}
        <div className="w-[190px] flex-shrink-0 px-5 py-8 bg-[#f9f9f9] border-l-2 border-gray-100">
          {education.length > 0 && (
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-[3px] rounded-full" style={{ background: '#ff6b00' }} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map(e => (
                  <div key={e.id} className="border-l-2 pl-3" style={{ borderColor: '#ff6b00' }}>
                    <p className="font-black text-gray-900 text-[11.5px] leading-tight">{e.degree}</p>
                    {e.field && <p className="text-[11px] text-gray-500">{e.field}</p>}
                    <p className="font-bold text-[11px]" style={{ color: '#ff6b00' }}>{e.school}</p>
                    <p className="text-gray-400 text-[10px]">{e.current ? 'Present' : fmt(e.endDate)}</p>
                    {e.gpa && <p className="text-gray-400 text-[10px]">GPA {e.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-[3px] rounded-full" style={{ background: '#ff6b00' }} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Skills</h2>
              </div>
              <div className="space-y-1.5">
                {skills.map(s => (
                  <div key={s.id} className="flex items-center gap-2 py-1 px-2 rounded" style={{ background: '#111111' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#ff6b00' }} />
                    <span className="text-[11.5px] font-semibold text-white">{s.name}</span>
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
