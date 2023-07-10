import { useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/material';
import { onLogin, onCreate } from '../../lib/login';
import useUser from '../../lib/useUser';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState(false);
  const [signupErrorMsg, setSignupErrorMsg] = useState('');

  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const handleSignup = async () => {
    try {
      await onCreate(username, email, password);
      setSignupError(false);
      await onLogin(mutateUser, username, password);
    } catch (error) {
      setSignupError(true);
      setSignupErrorMsg(error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mb={2}>
          Create an account
        </Typography>
        <Grid item xs={12}>
          <Input
            required
            placeholder="Username"
            sx={{ width: '30%' }}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Input
            required
            placeholder="Email"
            sx={{ width: '30%' }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Input
            required
            type="password"
            placeholder="Password"
            onKeyPress={handleKeyPress}
            sx={{ width: '30%' }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            disabled={!username.trim() || !email.trim() || !password.trim()}
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleSignup}
          >
            SIGN UP
          </Button>
          {signupError && (
            <>
              <Typography variant="body1" color="error">
                Failed to creata an account
              </Typography>
              <Typography variant="body2" color="error">
                {signupErrorMsg}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
