import React, { createContext, useContext, useState, useCallback } from 'react'

const ResumeContext = createContext(null)

const initialResumeData = {
  personal: { name: '', email: '', phone: '', location: '', summary: '', title: '', website: '' },
  experience: [],
  education: [],
  projects: [],
  skills: [],
}

export function ResumeProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [activeTemplate, setActiveTemplate] = useState('premium')
  const [activeSection, setActiveSection] = useState('personal')

  const login = useCallback((userData) => setUser(userData), [])
  const logout = useCallback(() => { setUser(null); setResumeData(initialResumeData) }, [])
  const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), [])

  const updatePersonal = useCallback((field, value) => {
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }))
  }, [])

  // Experience CRUD
  const addExperience = useCallback((exp) => {
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, { ...exp, id: Date.now() }] }))
  }, [])
  const updateExperience = useCallback((id, updated) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...updated, id } : e) }))
  }, [])
  const deleteExperience = useCallback((id) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }))
  }, [])

  // Education CRUD
  const addEducation = useCallback((edu) => {
    setResumeData(prev => ({ ...prev, education: [...prev.education, { ...edu, id: Date.now() }] }))
  }, [])
  const updateEducation = useCallback((id, updated) => {
    setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...updated, id } : e) }))
  }, [])
  const deleteEducation = useCallback((id) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }))
  }, [])

  // Projects CRUD
  const addProject = useCallback((project) => {
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, { ...project, id: Date.now() }] }))
  }, [])
  const updateProject = useCallback((id, updated) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...updated, id } : p) }))
  }, [])
  const deleteProject = useCallback((id) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }))
  }, [])

  // Skills
  const addSkill = useCallback((skill) => {
    if (!skill.trim()) return
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, { id: Date.now(), name: skill.trim() }] }))
  }, [])
  const deleteSkill = useCallback((id) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }))
  }, [])

  const value = {
    user, login, logout, theme, toggleTheme,
    resumeData, updatePersonal,
    addExperience, updateExperience, deleteExperience,
    addEducation, updateEducation, deleteEducation,
    addProject, updateProject, deleteProject,
    addSkill, deleteSkill,
    activeTemplate, setActiveTemplate,
    activeSection, setActiveSection,
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
