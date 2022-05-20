import React, { useState } from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';
import { firebaseAuth, firebaseDb } from '../../firebase/firebaseInit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDoc , doc } from 'firebase/firestore';
import { setIsLoggedIn, setUser } from '../../features/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleValidation = () => {
    email.trim() === ''
      ? setEmailError('Email is required')
      : setEmailError('');
    password.trim() === ''
      ? setPasswordError('Password is required')
      : password.length < 6
      ? setPasswordError('Password must be at least 6 characters')
      : setPasswordError('');
  };

  const getUserInfo = async (id) => {
    const user = await getDoc(doc(firebaseDb, 'users', `${id}`));
    const userInfo = {
      id: user.id,
      name: user._document.data.value.mapValue.fields.name.stringValue,
      email: user._document.data.value.mapValue.fields.email.stringValue,
    };
    dispatch(setUser(userInfo));
    dispatch(setIsLoggedIn(true))
  };

  const handleSubmit = () => {
    handleValidation();
    if (
      emailError === '' &&
      passwordError === ''
    ) {
      signInWithEmailAndPassword(firebaseAuth, email, password).then(
        async (user) => {
          try {
            await getUserInfo(user.user.uid);
            navigate('/');
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        },
      );
    }
  };

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
            error={emailError !== ''}
            helperText={emailError}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '400px' }}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            value={password}
            error={passwordError !== ''}
            helperText={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '400px' }}
          />
          <Button variant="contained" size='large' onClick={handleSubmit}>Login</Button>
        </Stack>
      </div>
    </>
  );
};

export default Login;
