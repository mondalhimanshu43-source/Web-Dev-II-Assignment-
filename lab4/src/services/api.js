const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch sample user profiles to pre-populate resume
 */
export async function fetchSampleProfiles() {
  return apiFetch('/users').catch(err => {
    console.error('Failed to fetch sample profiles:', err)
    throw err
  })
}

/**
 * Fetch a single user profile by ID
 */
export async function fetchUserProfile(id) {
  return apiFetch(`/users/${id}`).catch(err => {
    console.error(`Failed to fetch profile ${id}:`, err)
    throw err
  })
}

/**
 * Simulate saving a resume (POST to /posts)
 */
export async function saveResume(resumeData) {
  return apiFetch('/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: resumeData.personal?.name || 'Untitled Resume',
      body: JSON.stringify(resumeData),
      userId: 1,
    }),
  }).catch(err => {
    console.error('Failed to save resume:', err)
    throw err
  })
}

/**
 * Fetch job title suggestions (simulated via posts)
 */
export async function fetchJobSuggestions() {
  return apiFetch('/posts?_limit=5').catch(err => {
    console.error('Failed to fetch job suggestions:', err)
    throw err
  })
}
