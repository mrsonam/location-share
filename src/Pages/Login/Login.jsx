import React, { useState } from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="container">
        <Stack
          className="d_flex justify_content_center align_items_center"
          spacing={2}
        >
          <Typography variant="h3" component="h2">
            Login
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '400px' }}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '400px' }}
          />
          <Button variant="contained" size='large'>Login</Button>
        </Stack>
      </div>
    </>
  );
};

export default Login;
