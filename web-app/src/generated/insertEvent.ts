/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterEventInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insertEvent
// ====================================================

export interface insertEvent_registerEvent_event {
  __typename: "Event";
  name: string;
  lastName: string;
  id: string;
  email: string;
  eventDate: any;
}

export interface insertEvent_registerEvent {
  __typename: "EventUpdateResponse";
  event: insertEvent_registerEvent_event | null;
  message: string | null;
  success: boolean;
}

export interface insertEvent {
  registerEvent: insertEvent_registerEvent;
}

export interface insertEventVariables {
  event: RegisterEventInput;
}
