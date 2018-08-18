let request;

if (process.env.REACT_APP_MOCK_API === 'true') {
  request = require('./github.mock').request;
} else {
  request = require('./github.prod').request;
}

export async function getRepos(org, options = {}) {
  const response = await request('GET', `/orgs/${org}/repos`, options)
  const repos = await response.json()

  return {
    repos: repos.map(({ id, name }) => ({ id, name }))
  }
}

export async function getIssues(org, repo, state, options = {}) {
  const response = await request('GET', `/repos/${org}/${repo}/issues`, {
    qs: {
      state
    },
    ...options
  })
  const issues = await response.json()

  return {
    issues: issues.map(({ id, title, html_url }) => ({ id, title, html_url }))
  }
}