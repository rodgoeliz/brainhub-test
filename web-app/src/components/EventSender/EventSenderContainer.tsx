import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { insertEvent, insertEventVariables } from '../../generated/insertEvent';
import EventSender from './EventSender';

export const INSERT_EVENT = gql`
  mutation insertEvent($name: String!, $lastName: String!, $eventDate: Date!, $email: String!) {
    registerEvent(name: $name, lastName: $lastName, eventDate: $eventDate, email: $email) {
      event {
        name
        lastName
        id
        email
        eventDate
      }
      message
      success
    }
  }
`;

const EventSenderContainer: React.FC = () => {
  const [insertEvent, { loading, data }] = useMutation<insertEvent, insertEventVariables>(INSERT_EVENT);

  const handleSave = (event: insertEventVariables) => insertEvent({ variables: event });
  return <EventSender loading={loading} handleSave={handleSave} data={data?.registerEvent} />;
};

export default EventSenderContainer;
