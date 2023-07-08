export async function onLogin(mutateUser, login) {
  const body = {
    username: login,
  };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

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
