import { useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/material';
import useUser from '../../lib/useUser';
import { onLogin } from '../../lib/login';

export default function LoginForm() {
  const [login, setLogin] = useState('');

  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const handleLogin = async () => {
    await onLogin(mutateUser, login);
  };

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
        <Button onClick={handleLogin}>Login</Button>
      </Grid>
    </Grid>
  );
}
