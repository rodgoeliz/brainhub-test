/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginUser
// ====================================================

export interface loginUser_loginUser {
  __typename: "AuthPayLoad";
  token: string | null;
  message: string | null;
}

export interface loginUser {
  loginUser: loginUser_loginUser;
}

export interface loginUserVariables {
  email: string;
  password: string;
}
