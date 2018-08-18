const defaultHeaders = {
  Accept: 'application/vnd.github.v3+json'
};

const baseURL = 'https://api.github.com';

export async function request(
  method,
  path,
  { qs = null, headers = defaultHeaders, ...options } = {}
) {
  try {
    if (qs) {
      const urlSP = new URLSearchParams();
      Object.keys(qs).forEach(key => urlSP.append(key, qs[key]));
      path = `${path}?${urlSP.toString()}`;
    }

    const response = await fetch(baseURL + path, {
      method,
      headers: new Headers(headers),
      ...options
    });

    if (!response.ok) {
      return Promise.reject({
        error: response.statusText,
        status: response.status
      });
    }

    return response;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}
