const defaultHeaders = {
  'Accept': 'application/json'
}

const baseURL = 'https://api.github.com'

export async function request(method, path, { qs = null, headers = defaultHeaders, ...options } = {}) {
  try {
    if (qs) {
      const urlSP = new URLSearchParams()
      Object.keys(qs).forEach(key => urlSP.append(key, qs[key]))
      path = `${path}?${urlSP.toString()}`
    }

    const result = await fetch(baseURL+path, {
      method,
      headers: new Headers(headers),
      ...options
    });

    if (!result.ok) {
      return Promise.reject({ error: result.statusText, status: result.status })
    }

    for (const entry of result.headers) {
      console.log(entry)
    }

    if (headers.Accept === 'application/json') {
      return result.json();
    }
    return result;
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}