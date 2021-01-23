import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/Store';
import { logout } from 'redux/UserSlice';

export interface PageProps {
  children: React.ReactNode;
  title?: string;
}

const RootPage: React.FC<PageProps> = ({ title, children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  return (
    <Container component="main" maxWidth="sm">
      {user && (
        <Button type="button" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      )}
      {title && (
        <Typography align="center" component="h1" variant="h5" style={{ margin: '2rem auto' }}>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
};

export default RootPage;
