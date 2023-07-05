import { useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/material';
import useUser from '../../lib/useUser';

export default function LoginForm() {
  const [login, setLogin] = useState('');

  const { mutateUser } = useUser({
    redirectTo: '/admin',
    redirectIfFound: true,
  });

  async function onSubmit() {
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
      } else {
        console.error('An unexpected error occurred:', response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <Input
          required
          onChange={(event) => {
            setLogin(event.target.value);
          }}
        />
        <Button onClick={onSubmit}>Login</Button>
      </Grid>
    </Grid>
  );
}
