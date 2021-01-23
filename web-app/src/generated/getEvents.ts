/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEvents
// ====================================================

export interface getEvents_events {
  __typename: "Event";
  name: string;
  lastName: string;
  id: string;
  email: string;
  eventDate: any;
}

export interface getEvents {
  events: getEvents_events[];
}
