let request;

if (process.env.REACT_APP_MOCK_API === 'true') {
  request = require('./github.mock').request;
} else {
  request = require('./github.prod').request;
}

export async function getRepos(org, options = {}) {
  const response = await request('GET', `/orgs/${org}/repos`, options)
  return response.map(({ id, name }) => ({ id, name }))
}

export async function getIssues(org, repo, state, options = {}) {
  const response = await request('GET', `/repos/${org}/${repo}/issues`, {
    qs: {
      state
    },
    ...options
  })
  return response.map(({ id, title, html_url }) => ({ id, title, html_url }))
}