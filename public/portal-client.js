(() => {
  const endpoint =
    'https://dbolgmmyssfnuohpnmde.supabase.co/functions/v1/parent-portal';
  const storage = 'cgc-parent-session';
  const preference = 'cgc-parent-remember';

  function read() {
    try {
      return JSON.parse((localStorage.getItem(preference) === 'yes' ? localStorage : sessionStorage).getItem(storage) || 'null');
    } catch {
      return null;
    }
  }

  function save(value, remember) {
    if (value) {
      const persistent = remember === undefined ? localStorage.getItem(preference) === 'yes' : !!remember;
      sessionStorage.removeItem(storage);
      localStorage.removeItem(storage);
      if (persistent) {
        localStorage.setItem(preference, 'yes');
        localStorage.setItem(storage, JSON.stringify(value));
      } else {
        localStorage.removeItem(preference);
        sessionStorage.setItem(storage, JSON.stringify(value));
      }
    } else {
      sessionStorage.removeItem(storage);
      localStorage.removeItem(storage);
      localStorage.removeItem(preference);
    }
  }

  async function call(body, token) {
    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: 'Bearer ' + token } : {})
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000)
      });
    } catch (error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        throw new Error('The parent portal is taking too long to respond. Please try again.');
      }
      throw new Error('Unable to contact the parent portal. Check your connection and try again.');
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('The parent portal returned an unexpected response. Please try again later.');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Parent portal request failed (' + response.status + '). Please try again.');
    }

    return data;
  }

  async function session() {
    let value = read();
    if (!value) return null;

    if (value.expires_at < Date.now() / 1000 + 60) {
      try {
        value = await call({
          action: 'refresh',
          refresh_token: value.refresh_token
        });
        save(value);
      } catch {
        save(null);
        return null;
      }
    }

    return value;
  }

  async function api(action, data = {}, required = true) {
    const value = required ? await session() : null;

    if (required && !value) {
      throw new Error('Please sign in to your parent portal.');
    }

    return call({ action, ...data }, value?.access_token);
  }

  window.CgcPortal = {
    api,
    session,
    save,
    clear: () => save(null)
  };
})();
