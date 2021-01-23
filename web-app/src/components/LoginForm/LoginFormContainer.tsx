import { gql, useMutation } from '@apollo/client';
import { loginUserVariables, loginUser } from 'generated/loginUser';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoading } from 'redux/UserSlice';
import LoginForm from './LoginForm';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
      message
    }
  }
`;

const LoginFormContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [loginUserMutation] = useMutation<loginUser, loginUserVariables>(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.loginUser.token) dispatch(login(data.loginUser.token));
      dispatch(setLoading(false));
    },
  });

  const handleSubmit = (email: string, password: string) => {
    dispatch(setLoading(true));
    loginUserMutation({ variables: { email, password } });
  };

  return <LoginForm submit={handleSubmit} />;
};

export default LoginFormContainer;
