import { Paper, Box, Typography, TextField, Button } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/Store';

interface LoginFormProps {
  submit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ submit }) => {
  const { loading } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('ssseeeecrreeet');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(email, password);
  };

  return (
    <Paper style={{ padding: '1rem' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          onSubmit={handleSubmit}
          component="form"
          noValidate
          sx={{
            width: '100%', // Fix IE11 issue.
            mt: 1,
          }}
        >
          <TextField
            disabled={loading}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            disabled={loading}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;
