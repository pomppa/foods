import { useEffect } from 'react';
import LoginForm from '../components/forms/loginForm';
import user from './api/user';
import Router from 'next/router';
import { Grid } from '@mui/material';

export default function Login() {
  useEffect(() => {
    if (user) {
      Router.push('/admin');
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <LoginForm />
    </Grid>
  );
}
