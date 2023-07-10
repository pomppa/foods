import { useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/material';
import useUser from '../../lib/useUser';
import { onLogin } from '../../lib/login';

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });
  const handleLogin = async () => {
    try {
      await onLogin(mutateUser, login, password);
      setLoginError(false);
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <Grid item xs={12}>
          <Input
            required
            placeholder="Username or email"
            sx={{ width: '50%' }}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Input
            required
            type="password"
            placeholder="Password"
            onKeyPress={handleKeyPress}
            sx={{ width: '50%' }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            disabled={!login.trim() || !password.trim()}
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleLogin}
          >
            LOGIN
          </Button>
          {loginError && (
            <Typography variant="body1" color="error">
              Login was not successful
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
