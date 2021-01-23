/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginUser
// ====================================================

export interface loginUser_login {
  __typename: "AuthPayLoad";
  token: string | null;
  message: string | null;
}

export interface loginUser {
  login: loginUser_login;
}

export interface loginUserVariables {
  email: string;
  password: string;
}
