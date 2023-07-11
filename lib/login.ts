export async function onLogin(mutateUser, login, password) {
  const body = {
    login,
    password,
  };

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Login failed, response not ok from api/login');
  }

  const data = await response.json();
  mutateUser(data, false);
  return data;
}

export async function onLogout(mutateUser) {
  try {
    const response = await fetch('/api/logout');

    if (response.ok) {
      const data = await response.json();
      mutateUser(data, false);
      return data;
    } else {
      console.error('An unexpected error occurred:', response.statusText);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

export async function onCreate(username, password) {
  const body = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 409) {
      throw new Error('Username already exists');
    } else {
      throw new Error('An unexpected error occurred: ' + response.statusText);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    throw error;
  }
}
