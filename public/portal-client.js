(() => {
  const endpoint =
    'https://dbolgmmyssfnuohpnmde.supabase.co/functions/v1/parent-portal';
  const storage = 'cgc-parent-session';

  function read() {
    try {
      return JSON.parse(sessionStorage.getItem(storage) || 'null');
    } catch {
      return null;
    }
  }

  function save(value) {
    if (value) {
      sessionStorage.setItem(storage, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(storage);
    }
  }

  async function call(body, token) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {})
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unable to connect. Please try again.');
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
