import React from 'react'

function fmt(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y
}

function Section({ title, children }) {
  return (
    <section className="mb-7">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-800 whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-gray-900" />
      </div>
      {children}
    </section>
  )
}

export default function MinimalTemplate({ data }) {
  const { personal, experience, education, projects, skills } = data

  return (
    <div className="min-h-[1056px] bg-white p-10 font-sans text-[13px] text-gray-800">
      <header className="mb-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-1.5">{personal.name || 'Your Name'}</h1>
            {personal.title && <p className="text-[14px] font-medium text-gray-500">{personal.title}</p>}
          </div>
          <div className="text-right text-[11px] text-gray-500 space-y-0.5">
            {personal.email    && <p>{personal.email}</p>}
            {personal.phone    && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
            {personal.website  && <p className="text-blue-600">{personal.website}</p>}
          </div>
        </div>
        <div className="mt-4 h-[2px] bg-gray-900" />
      </header>

      <div className="flex gap-8">
        {/* Main */}
        <div className="flex-1 min-w-0">
          {personal.summary && (
            <Section title="Profile">
              <p className="text-gray-600 leading-relaxed text-[12.5px]">{personal.summary}</p>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Experience">
              <div className="space-y-5">
                {experience.map(e => (
                  <div key={e.id}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900 text-[13.5px]">{e.role}</h3>
                        <p className="text-gray-600 font-medium text-[12px]">{e.company}</p>
                      </div>
                      <span className="text-[10.5px] text-gray-400 whitespace-nowrap mt-0.5">
                        {fmt(e.startDate)} – {e.current ? 'Present' : fmt(e.endDate)}
                      </span>
                    </div>
                    {e.description && <p className="text-gray-500 text-[12px] leading-relaxed mt-1.5">{e.description}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects">
              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-gray-900">{p.name}</p>
                      {p.link && <span className="text-[10px] text-blue-600">{p.link}</span>}
                    </div>
                    {p.tech && <p className="text-[11px] text-gray-400 italic mb-1">{p.tech}</p>}
                    {p.description && <p className="text-[12px] text-gray-500 leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education">
              <div className="space-y-4">
                {education.map(e => (
                  <div key={e.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900">{e.degree}</p>
                        {e.field && <p className="text-gray-600 text-[12px]">{e.field}</p>}
                        <p className="text-gray-600 text-[12px]">{e.school}</p>
                      </div>
                      <span className="text-[10.5px] text-gray-400 whitespace-nowrap">{e.current ? 'Present' : fmt(e.endDate)}</span>
                    </div>
                    {e.gpa && <p className="text-gray-400 text-[11px]">GPA: {e.gpa}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Side — Skills */}
        {skills.length > 0 && (
          <div className="w-[160px] flex-shrink-0">
            <Section title="Skills">
              <ul className="space-y-1.5">
                {skills.map(s => (
                  <li key={s.id} className="flex items-center gap-2 text-[12px] text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-800 flex-shrink-0" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}
      </div>
    </div>
  )
}
