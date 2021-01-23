import React from 'react';
import { LoginForm } from '../components/LoginForm';
import RootPage from '../components/RootPage';

const LoginPage: React.FC = () => {
  return (
    <RootPage title={'LoginForm.tsx'}>
      <LoginForm />
    </RootPage>
  );
};

export default LoginPage;
