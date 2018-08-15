function determineFixture(method, path, qs) {
  if (path.endsWith('/issues')) {
    return import('./__fixtures__/issues.json')
  }
  return import('./__fixtures__/repos.json')
}

export async function request(method, path, { qs } = {}) {
  try {
    return determineFixture(method, path, qs);
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}