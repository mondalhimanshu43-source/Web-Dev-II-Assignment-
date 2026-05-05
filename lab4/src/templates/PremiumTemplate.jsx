import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y
}

export default function PremiumTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data

  return (
    <div className="flex min-h-[1056px] bg-white font-sans text-[13px]">
      {/* Left Sidebar */}
      <div className="w-[220px] flex-shrink-0 bg-[#1e293b] text-white flex flex-col">
        <div className="bg-[#4f46e5] px-6 py-8">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto">
            <span className="text-3xl font-bold text-white">{personal.name ? personal.name[0].toUpperCase() : '?'}</span>
          </div>
          <h1 className="text-center font-bold text-[16px] leading-tight text-white mb-1">{personal.name || 'Your Name'}</h1>
          <p className="text-center text-indigo-200 text-[11px] font-medium">{personal.title || 'Professional Title'}</p>
        </div>

        <div className="px-5 py-5 border-b border-white/10">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 mb-3">Contact</h3>
          <div className="space-y-2">
            {personal.email    && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5 text-[10px]">✉</span><span className="text-gray-300 text-[11px] break-all leading-tight">{personal.email}</span></div>}
            {personal.phone    && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5 text-[10px]">☎</span><span className="text-gray-300 text-[11px]">{personal.phone}</span></div>}
            {personal.location && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5 text-[10px]">◎</span><span className="text-gray-300 text-[11px]">{personal.location}</span></div>}
            {personal.website  && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5 text-[10px]">🔗</span><span className="text-gray-300 text-[11px] break-all leading-tight">{personal.website}</span></div>}
          </div>
        </div>

        {education.length > 0 && (
          <div className="px-5 py-5 border-b border-white/10">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 mb-3">Education</h3>
            <div className="space-y-4">
              {education.map(e => (
                <div key={e.id}>
                  <p className="text-white text-[11.5px] font-semibold leading-tight">{e.degree}</p>
                  {e.field && <p className="text-indigo-200 text-[10.5px]">{e.field}</p>}
                  <p className="text-indigo-300 text-[11px]">{e.school}</p>
                  <p className="text-gray-400 text-[10px]">{fmt(e.startDate)} – {e.current ? 'Present' : fmt(e.endDate)}</p>
                  {e.gpa && <p className="text-gray-400 text-[10px]">GPA: {e.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="px-5 py-5">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 mb-3">Skills</h3>
            <div className="space-y-2">
              {skills.map(skill => (
                <div key={skill.id}>
                  <span className="text-gray-300 text-[11px]">{skill.name}</span>
                  <div className="h-1 bg-white/10 rounded-full mt-1">
                    <div className="h-1 bg-indigo-400 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 px-8 py-8">
        {personal.summary && (
          <section className="mb-7">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#4f46e5] mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-indigo-100" />Profile Summary<span className="flex-1 h-px bg-indigo-100" />
            </h2>
            <p className="text-gray-600 leading-relaxed text-[12.5px]">{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#4f46e5] mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-indigo-100" />Work Experience<span className="flex-1 h-px bg-indigo-100" />
            </h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-100">
                  <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-[13px]">{exp.role}</h3>
                      <p className="text-[#4f46e5] font-semibold text-[11.5px]">{exp.company}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5 font-medium">
                      {fmt(exp.startDate)} — {exp.current ? 'Present' : fmt(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-500 text-[12px] leading-relaxed mt-1.5">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#4f46e5] mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-indigo-100" />Projects<span className="flex-1 h-px bg-indigo-100" />
            </h2>
            <div className="space-y-4">
              {projects.map(p => (
                <div key={p.id} className="pl-4 border-l-2 border-indigo-100 relative">
                  <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-indigo-300" />
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-900">{p.name}</p>
                    {p.link && <span className="text-[10px] text-[#4f46e5]">{p.link}</span>}
                  </div>
                  {p.tech && <p className="text-[10.5px] text-indigo-500 italic mb-1">{p.tech}</p>}
                  {p.description && <p className="text-gray-500 text-[12px] leading-relaxed">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
