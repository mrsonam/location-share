import React, { useState } from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';
import { firebaseAuth, firebaseDb } from '../../firebase/firebaseInit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleValidation = () => {
    name.trim() === '' ? setNameError('Name is required') : setNameError('');
    email.trim() === ''
      ? setEmailError('Email is required')
      : setEmailError('');
    password.trim() === ''
      ? setPasswordError('Password is required')
      : password.length < 6
      ? setPasswordError('Password must be at least 6 characters')
      : setPasswordError('');
    confirmPassword.trim() === ''
      ? setConfirmPasswordError('Confirm Password is required')
      : password !== confirmPassword
      ? setConfirmPasswordError('Password and Confirm Password must match')
      : setConfirmPasswordError('');
  };

  const handleSubmit = () => {
    handleValidation();
    if (
      emailError === '' &&
      passwordError === '' &&
      nameError === '' &&
      confirmPasswordError === ''
    ) {
      createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        async (user) => {
          try {
            await setDoc(doc(firebaseDb, 'users', `${user.user.uid}`), {
              name: name,
              email: email,
              id: user.user.uid,
            });
            localStorage.setItem('isLoggedIn', true);
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
            Create an Account
          </Typography>
          <TextField
            id="name"
            label="Name"
            value={name}
            error={nameError !== ''}
            helperText={nameError}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '400px' }}
          />
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
          <TextField
            id="confirm-password"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            error={confirmPasswordError !== ''}
            helperText={confirmPasswordError}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ width: '400px' }}
          />
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Create
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default Signup;
